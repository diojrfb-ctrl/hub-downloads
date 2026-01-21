import { ipcRenderer, contextBridge, IpcRendererEvent } from 'electron'
import { ScraperResult } from './scrapers/types'

// Definimos o tipo de listener para bater com a definição do frontend
type IpcListener = (event: IpcRendererEvent, ...args: unknown[]) => void

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(channel: string, listener: IpcListener) {
    ipcRenderer.on(channel, listener)
  },
  off(channel: string, listener: IpcListener) {
    ipcRenderer.off(channel, listener)
  },
  send(channel: string, ...args: unknown[]) {
    ipcRenderer.send(channel, ...args)
  },
  invoke<T>(channel: string, ...args: unknown[]): Promise<T> {
    return ipcRenderer.invoke(channel, ...args)
  }
})

contextBridge.exposeInMainWorld('api', {
  // Chamada para o scraper
  scrapeUrl: (url: string): Promise<ScraperResult> => 
    ipcRenderer.invoke('scrape-media', url),

  // Listener para mensagens de status de atualização
  onUpdateStatus: (callback: (status: string) => void): void => {
    ipcRenderer.on('update-message', (_event: IpcRendererEvent, status: unknown) => {
      if (typeof status === 'string') callback(status)
    })
  },

  // Listener para progresso de download da atualização
  onDownloadProgress: (callback: (progress: number) => void): void => {
    ipcRenderer.on('download-progress', (_event: IpcRendererEvent, progress: unknown) => {
      if (typeof progress === 'number') callback(progress)
    })
  },

  // Comando para reiniciar e instalar a atualização baixada
  restartApp: (): void => {
    ipcRenderer.send('restart-app')
  }
})