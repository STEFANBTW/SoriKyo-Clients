interface StyleSelectorProps {
    currentStyle: { color: string; roughness: number; metalness: number; opacity: number };
    onSelect: (style: { color: string; roughness: number; metalness: number; opacity: number }) => void;
}

const STYLES = [
    { id: 'ruby', name: 'Ruby', color: '#E0115F', roughness: 0.15, metalness: 0.1, opacity: 0.9 },
    { id: 'gold', name: 'Gold', color: '#FFD700', roughness: 0.2, metalness: 1.0, opacity: 1.0 },
    { id: 'midnight', name: 'Midnight', color: '#191970', roughness: 0.1, metalness: 0.3, opacity: 0.95 },
    { id: 'holographic', name: 'Pearl', color: '#F0FFFF', roughness: 0.1, metalness: 0.8, opacity: 0.7 },
    { id: 'matte-black', name: 'Onyx Matte', color: '#1a1a1a', roughness: 0.9, metalness: 0, opacity: 1.0 },
];

export default function StyleSelector({ currentStyle, onSelect }: StyleSelectorProps) {
    return (
        <div className="absolute bottom-8 left-0 right-0 z-50 flex flex-col items-center pointer-events-none">
            {/* Title / Label */}
            <div className="mb-4 text-white/90 text-sm font-light tracking-widest uppercase bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full border border-white/5">
                Select Finish
            </div>

            {/* Selector Bar */}
            <div className="pointer-events-auto bg-black/40 backdrop-blur-xl p-3 pr-5 pl-5 rounded-full flex gap-6 border border-white/10 shadow-2xl transition-all hover:bg-black/50 hover:scale-105">
                {STYLES.map(style => {
                    const isActive = currentStyle.color === style.color && currentStyle.metalness === style.metalness;
                    return (
                        <button
                            key={style.id}
                            onClick={() => onSelect(style)}
                            className={`
                                group relative w-12 h-12 rounded-full transition-all duration-500 ease-out
                                ${isActive ? 'scale-125 shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'hover:scale-110 opacity-70 hover:opacity-100'}
                            `}
                            title={style.name}
                        >
                            {/* Button Inner Gradient/Fill */}
                            <div
                                className="absolute inset-0 rounded-full border border-white/20 overflow-hidden"
                                style={{
                                    backgroundColor: style.color,
                                    background: style.id === 'holographic'
                                        ? 'linear-gradient(135deg, #FFD1FF 0%, #F0FFFF 50%, #D1F2FF 100%)'
                                        : style.color
                                }}
                            >
                                {/* Highlight Glint */}
                                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
                            </div>

                            {/* Active Ring */}
                            {isActive && (
                                <div className="absolute -inset-1 rounded-full border-2 border-white/80 animate-pulse-slow" />
                            )}

                            {/* Hover Label */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white tracking-widest uppercase whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                                {style.name}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
