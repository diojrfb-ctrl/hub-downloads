import { ScraperResult } from '../../electron/scrapers/types'

interface MediaDisplayProps {
  result: ScraperResult
}

export function MediaDisplay({ result }: MediaDisplayProps) {
  if (!result.success) {
    return (
      <div className="p-6 rounded-3xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
        {result.error || 'Ocorreu um erro ao processar este link.'}
      </div>
    )
  }

  return (
    <section className="mt-12 p-8 rounded-3xl bg-zinc-900/20 border border-zinc-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Preview / Thumbnail */}
        <div className="w-full md:w-72 aspect-video bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 shrink-0">
          {result.thumbnail ? (
            <img src={result.thumbnail} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">Sem Preview</div>
          )}
        </div>

        {/* Informações e Botões */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-zinc-100 mb-6 leading-tight">{result.title}</h2>
          
          <div className="flex flex-wrap gap-3">
            {result.medias?.map((media, idx) => (
              <button 
                key={idx}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 cursor-pointer flex items-center gap-2"
                onClick={() => console.log('Download:', media.url)}
              >
                <span>Baixar {media.quality}</span>
                <span className="text-[10px] opacity-60 bg-black/20 px-1.5 py-0.5 rounded-md uppercase">
                  {media.extension}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}