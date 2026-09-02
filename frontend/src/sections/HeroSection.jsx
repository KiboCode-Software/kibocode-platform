import { Container } from '../components/ui/Container.jsx';
import { Button } from '../components/ui/Button.jsx';
import { TerminalCard } from '../components/ui/TerminalCard.jsx';
import { Reveal, RevealWords } from '../components/motion/Reveal.jsx';
import { Counter } from '../components/motion/Counter.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

/**
 * Portada.
 *
 * Una sola columna en lugar del clásico titular-a-la-izquierda con tarjeta
 * a la derecha. La marca abre la página y su halo violeta es la fuente de
 * luz que enciende las curvas de nivel del fondo: el color no está pintado
 * encima, sale de la marca.
 *
 * Debajo, la secuencia dice lo mismo que el negocio — despliegue y luego
 * medición: el registro de producción y, cerrando, la fila de cifras.
 */
export function HeroSection() {
  const { heroContent } = useContent();
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, terminal, stats } =
    heroContent;

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-16">
      {/* Curvas de nivel con la cumbre encendida. Decorativas. */}
      <div
        aria-hidden="true"
        className="topo-lit fade-edges pointer-events-none absolute inset-0"
      />
      {/* Halo de la marca, muy abierto: baña la mitad superior. */}
      <div
        aria-hidden="true"
        className="glow-mark pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] blur-3xl md:right-[5%] md:h-[720px] md:w-[720px]"
      />

      <Container className="relative pb-14 pt-16 md:pb-20 md:pt-24 lg:pt-28">
        <Reveal y={12}>
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="glow-mark absolute -inset-5 blur-xl"
            />
            <img
              src="/logo.png"
              alt=""
              width={80}
              height={80}
              className="relative h-14 w-14 rounded-full md:h-[72px] md:w-[72px]"
            />
          </span>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="label mt-8 flex items-center gap-3 text-silver-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 bg-accent-500" />
            {eyebrow}
          </p>
        </Reveal>

        <h1 className="display mt-6 max-w-[19ch] text-[2.15rem] font-semibold leading-[1.06] text-silver-50 sm:text-5xl md:mt-8 md:text-6xl lg:text-[4.25rem]">
          <RevealWords text={title} delay={0.25} accentLast />
        </h1>

        <Reveal delay={0.6}>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-silver-400 md:mt-9 md:text-lg">
            {subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.75} stagger={0.08}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-12">
            <Button as="a" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
            <Button as="a" href={secondaryCta.href} variant="outline">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>

      <Container className="relative pb-16 md:pb-20">
        <Reveal delay={0.2}>
          <TerminalCard
            label={terminal.label}
            prompt={terminal.prompt}
            lines={terminal.lines}
          />
        </Reveal>
      </Container>

      {/* Fila de instrumentos: la medición de lo que acaba de desplegarse.
          Sin cajas — solo filetes, como la lectura de un panel. */}
      <div className="relative border-t border-ink-800 bg-ink-1000/50">
        <Container>
          <Reveal as="dl" stagger={0.08} className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                /* Filetes solo entre celdas: en móvil hay dos columnas y una
                   línea entre filas; en escritorio, cuatro columnas seguidas. */
                className={`border-ink-800 py-8 pr-5 md:border-l md:py-10 md:pl-6 ${
                  index % 2 === 1 ? 'border-l pl-5' : ''
                } ${index >= 2 ? 'border-t md:border-t-0' : ''} ${
                  index === 0 ? 'md:border-l-0 md:pl-0' : ''
                }`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="display text-3xl font-semibold text-accent-300 sm:text-4xl md:text-[2.75rem]">
                  <Counter value={stat.value} />
                </dd>
                <p className="mt-3 max-w-[24ch] text-xs leading-snug text-silver-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
