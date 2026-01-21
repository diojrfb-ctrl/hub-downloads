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
  scrapeUrl: (url: string): Promise<ScraperResult> => 
    ipcRenderer.invoke('scrape-media', url),

  onUpdateStatus: (callback: (status: string) => void): void => {
    // Usamos unknown e checagem de tipo em vez de any
    ipcRenderer.on('update-message', (_event: IpcRendererEvent, status: unknown) => {
      if (typeof status === 'string') callback(status)
    })
  },

  onDownloadProgress: (callback: (progress: number) => void): void => {
    ipcRenderer.on('download-progress', (_event: IpcRendererEvent, progress: unknown) => {
      if (typeof progress === 'number') callback(progress)
    })
  }
})