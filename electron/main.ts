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

let win: BrowserWindow | null = null

function createWindow(): void {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 700,
    backgroundColor: '#09090b',
    titleBarStyle: 'hidden', // Opcional: deixa o app com visual mais moderno
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // Gerenciamento de Scrapers via IPC
  ipcMain.handle('scrape-media', async (_event: unknown, url: string): Promise<ScraperResult> => {
    console.log('Iniciando busca para:', url)
    return await scraperManager.run(url)
  })

  // IPC para reiniciar o app após o download da atualização
  ipcMain.on('restart-app', () => {
    autoUpdater.quitAndInstall()
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

  // Verificação de updates automática (somente em produção)
  win.once('ready-to-show', () => {
    win?.show()
    if (!VITE_DEV_SERVER_URL) {
      autoUpdater.checkForUpdatesAndNotify().catch((err) => {
        console.error('Erro ao iniciar auto-updater:', err)
      })
    }
  })
}

// --- Eventos do AutoUpdater ---

autoUpdater.on('checking-for-update', () => {
  win?.webContents.send('update-message', 'Verificando atualizações...')
})

autoUpdater.on('update-available', (info) => {
  win?.webContents.send('update-message', `Nova versão v${info.version} disponível. Baixando...`)
})

autoUpdater.on('update-not-available', () => {
  win?.webContents.send('update-message', '') // Limpa a mensagem se não houver update
})

autoUpdater.on('download-progress', (progress) => {
  win?.webContents.send('update-message', `Download: ${Math.round(progress.percent)}%`)
})

autoUpdater.on('update-downloaded', () => {
  win?.webContents.send('update-message', 'Atualização pronta para instalar.')
})

autoUpdater.on('error', (err) => {
  win?.webContents.send('update-message', 'Erro ao atualizar.')
  console.error('Update Error:', err)
})

// --- Ciclo de Vida do App ---

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