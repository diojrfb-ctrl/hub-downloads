import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { autoUpdater } from 'electron-updater'
import { scraperManager } from './scrapers'
import { ScraperResult } from './scrapers/types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Estrutura de diretórios para produção e dev
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL 
  ? path.join(process.env.APP_ROOT, 'public') 
  : RENDERER_DIST

let win: BrowserWindow | null

function createWindow(): void {
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // Gerenciamento de Scrapers via IPC (Tipagem Estrita)
  ipcMain.handle('scrape-media', async (_event: unknown, url: string): Promise<ScraperResult> => {
    console.log('Iniciando busca para:', url)
    return await scraperManager.run(url)
  })

  // Mensagem para o Renderer ao carregar
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // Verificação de updates
  autoUpdater.checkForUpdatesAndNotify().catch((err: unknown) => {
    console.error('Erro ao verificar atualizações:', err)
  })
}

// Eventos do AutoUpdater
autoUpdater.on('update-available', () => {
  win?.webContents.send('update-message', 'Atualização disponível...')
})

autoUpdater.on('update-downloaded', () => {
  win?.webContents.send('update-message', 'Atualização baixada. Reinicie para aplicar.')
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)