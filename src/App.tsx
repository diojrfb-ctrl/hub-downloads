import { useState } from 'react'
import { SUPPORTED_SITES, SiteConfig } from './config/sites'
import { SiteCard } from './components/SiteCard'
import { SiteView } from './components/SiteView'
import { UpdateNotification } from './components/UpdateNotification'

export default function App() {
  const [selectedSite, setSelectedSite] = useState<SiteConfig | null>(null)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        
        {!selectedSite ? (
          /* TELA 1: HUB DE SELEÇÃO */
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <header className="mb-20 text-center">
              <h1 className="text-7xl font-black tracking-tighter italic bg-linear-to-b from-white via-zinc-200 to-zinc-700 bg-clip-text text-transparent">
                ADULT<span className="text-red-600">HUB</span>
              </h1>
              <p className="text-zinc-500 mt-4 text-lg font-medium">Selecione uma plataforma para explorar o conteúdo</p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SUPPORTED_SITES.map((site) => (
                <SiteCard
                  key={site.id}
                  name={site.name}
                  icon={site.icon}
                  url={site.url}
                  status={site.status}
                  isSelected={false} // No Hub principal nada está "selecionado" ainda
                  onClick={() => setSelectedSite(site)}
                />
              ))}
            </section>
          </div>
        ) : (
          /* TELA 2: VISUALIZAÇÃO DO SITE ESPECÍFICO */
          <SiteView 
            siteName={selectedSite.name} 
            siteUrl={selectedSite.url} 
            onBack={() => setSelectedSite(null)} 
          />
        )}
      </div>

      <footer className="fixed bottom-0 w-full p-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-md flex justify-between items-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
        <p>© 2026 ADULT HUB PROJECT</p>
        <div className="flex gap-4 italic">
          <span>{selectedSite ? `Navegando em: ${selectedSite.name}` : 'Aguardando Seleção'}</span>
          <span className="text-zinc-800">•</span>
          <span>v1.0.0</span>
        </div>
      </footer>
      <UpdateNotification />
    </div>
  )
}