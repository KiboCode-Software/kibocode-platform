/**
 * Registro de despliegue.
 *
 * Ocupa el ancho completo bajo el titular en lugar de flotar como tarjeta
 * al lado: así deja de ser un adorno y se lee como lo que dice ser — la
 * salida real de una puesta en producción, que es exactamente el momento
 * en que el trabajo de KiboCode empieza a devolver horas.
 *
 * El texto escala con el viewport para que las líneas no se corten en
 * pantallas angostas.
 */
export function TerminalCard({ label, prompt, lines }) {
  return (
    <div className="relative overflow-hidden border border-ink-700 bg-ink-1000 font-mono text-[11px] leading-relaxed sm:text-xs lg:text-[13px]">
      <div className="flex items-center gap-3 border-b border-ink-800 bg-ink-950 px-4 py-3 sm:px-6">
        <span className="h-1.5 w-1.5 shrink-0 bg-accent-500" aria-hidden="true" />
        <span className="label truncate text-silver-400">{label}</span>
      </div>

      <div className="grid gap-y-2 px-4 py-6 sm:gap-y-2.5 sm:px-6 sm:py-8">
        <p className="terminal-line text-accent-300" style={{ animationDelay: '200ms' }}>
          {prompt}
        </p>

        {lines.map((line, index) => {
          const esUltima = index === lines.length - 1;
          return (
            <p
              key={line}
              className={`terminal-line ${
                esUltima ? 'mt-3 border-t border-ink-800 pt-4 text-silver-100' : 'text-silver-400'
              }`}
              style={{ animationDelay: `${700 + index * 500}ms` }}
            >
              {line}
            </p>
          );
        })}

        <span
          className="terminal-line mt-1 inline-block h-3.5 w-1.5 animate-cursor bg-accent-500 sm:h-4 sm:w-2"
          style={{ animationDelay: `${700 + lines.length * 500}ms` }}
        />
      </div>
    </div>
  );
}
