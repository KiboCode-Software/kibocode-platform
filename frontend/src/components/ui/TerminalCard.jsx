/**
 * Tarjeta estilo terminal: muestra líneas que aparecen en secuencia,
 * como un despliegue real. Da contexto de oficio sin salir de la paleta.
 *
 * El texto escala con el viewport para que las líneas no se corten
 * en pantallas angostas.
 */
export function TerminalCard({ prompt, lines }) {
  return (
    <div className="sheen relative overflow-hidden border border-ink-600 bg-ink-1000/90 font-mono text-[11px] leading-relaxed sm:text-xs lg:text-sm">
      <div className="flex items-center gap-1.5 border-b border-ink-700 bg-ink-950 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-600" />
        <span className="ml-3 truncate text-[10px] tracking-wider text-silver-600 sm:text-xs">
          kibocode — producción
        </span>
      </div>
      <div className="space-y-2 px-4 py-5 sm:space-y-2.5 sm:px-5 sm:py-6">
        <p className="terminal-line text-silver-100" style={{ animationDelay: '200ms' }}>
          {prompt}
        </p>
        {lines.map((line, index) => (
          <p
            key={line}
            className={`terminal-line ${
              index === lines.length - 1 ? 'pt-2 text-silver-100' : 'text-silver-400'
            }`}
            style={{ animationDelay: `${700 + index * 500}ms` }}
          >
            {line}
          </p>
        ))}
        <span
          className="terminal-line mt-1 inline-block h-3.5 w-1.5 animate-cursor bg-silver-100 sm:h-4 sm:w-2"
          style={{ animationDelay: `${700 + lines.length * 500}ms` }}
        />
      </div>
    </div>
  );
}
