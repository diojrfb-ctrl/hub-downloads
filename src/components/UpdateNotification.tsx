import { useState, useEffect } from 'react'

export function UpdateNotification() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Escuta o status vindo do preload/main
    window.api.onUpdateStatus((status: string) => {
      setMessage(status)
      // Se a mensagem indicar que o download terminou, mostramos o alerta
      if (status.toLowerCase().includes('baixada') || status.toLowerCase().includes('ready')) {
        setUpdateAvailable(true)
      }
    })
  }, [])

  if (!updateAvailable) return null

  return (
    <div className="fixed bottom-20 right-6 z-50 animate-in slide-in-from-right-10 duration-500">
      <div className="bg-zinc-900 border-2 border-red-600 p-6 rounded-2xl shadow-2xl max-w-xs">
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <h4 className="font-black text-white uppercase tracking-tighter">Nova Versão</h4>
        </div>
        <p className="text-zinc-400 text-sm mb-4">
          {message}. Reinicie o aplicativo para aplicar as mudanças.
        </p>
        <button 
          onClick={() => window.ipcRenderer.send('restart-app')}
          className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-900/40"
        >
          Reiniciar Agora
        </button>
      </div>
    </div>
  )
}