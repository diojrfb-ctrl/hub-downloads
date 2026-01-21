interface SiteViewProps {
  siteName: string;
  siteUrl: string;
  onBack: () => void;
}

export function SiteView({ siteName, siteUrl, onBack }: SiteViewProps) {
  return (
    <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500">
      {/* Header Interno do Site Selecionado */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors group cursor-pointer"
          >
            <span className="text-zinc-400 group-hover:text-white transition-colors">← Voltar ao Hub</span>
          </button>
          <div>
            <h2 className="text-3xl font-black text-white uppercase italic">{siteName}</h2>
            <p className="text-xs text-red-500 font-bold tracking-widest">{siteUrl}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20">
            SCRAPER ONLINE
          </span>
        </div>
      </div>

      {/* Área de Conteúdo do Site */}
      <div className="flex-1 min-h-[500px] w-full bg-zinc-900/40 border border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center">
        <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce">
          🌐
        </div>
        <h3 className="text-xl font-bold text-zinc-300">Carregando interface de {siteName}...</h3>
        <p className="text-zinc-500 max-w-sm mt-2">
          Em breve aqui será renderizado o conteúdo direto de {siteUrl} ou a lista de vídeos populares.
        </p>
        
        <button className="mt-8 px-8 py-3 bg-zinc-100 text-black font-bold rounded-xl hover:bg-white transition-all cursor-pointer">
          Acessar Site Oficial
        </button>
      </div>
    </div>
  );
}