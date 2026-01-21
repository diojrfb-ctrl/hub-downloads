/// <reference types="vite/client" />
import { ScraperResult } from '../electron/scrapers/types'

interface IpcRendererEvent {
  sender: object;
  ports: MessagePort[];
}

type IpcListener = (event: IpcRendererEvent, ...args: unknown[]) => void;

declare global {
  interface Window {
    ipcRenderer: {
      on: (channel: string, listener: IpcListener) => void;
      off: (channel: string, listener: IpcListener) => void;
      send: (channel: string, ...args: unknown[]) => void;
      invoke: <T>(channel: string, ...args: unknown[]) => Promise<T>;
    };
    api: {
      scrapeUrl: (url: string) => Promise<ScraperResult>;
      onUpdateStatus: (callback: (status: string) => void) => void;
      onDownloadProgress: (callback: (progress: number) => void) => void;
    };
  }
}

export {};