interface SiteCardProps {
  name: string;
  icon: string;
  url: string;
  status: 'active' | 'development';
  isSelected: boolean;
  onClick: () => void;
}

export function SiteCard({ name, icon, url, status, isSelected, onClick }: SiteCardProps) {
  const isActive = status === 'active';

  return (
    <button
      onClick={isActive ? onClick : undefined}
      // Mudamos o foco visual: de Azul para Vermelho/Laranja (Nicho +18)
      className={`
        relative w-full text-left p-5 rounded-3xl border transition-all duration-500 group
        ${!isActive ? 'opacity-40 grayscale cursor-not-allowed bg-zinc-950 border-zinc-900' : 'cursor-pointer'}
        ${isActive && isSelected 
          ? 'bg-red-600/10 border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.15)]' 
          : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900'}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform duration-500
          ${isSelected ? 'bg-red-600 text-white scale-110 shadow-lg shadow-red-900/40' : 'bg-zinc-800 text-zinc-400 group-hover:scale-110'}
        `}>
          {icon}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-bold text-lg transition-colors ${isSelected ? 'text-red-400' : 'text-zinc-100'}`}>
              {name}
            </h3>
            {status === 'development' && (
              <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">
                Em breve
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 font-medium tracking-tight opacity-70">{url}</p>
        </div>
      </div>

      {/* Indicador de seleção com cor Red-500 */}
      {isActive && isSelected && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-4 border-zinc-950 animate-pulse" />
      )}
    </button>
  );
}