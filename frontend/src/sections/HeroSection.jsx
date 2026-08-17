import { Container } from '../components/ui/Container.jsx';
import { Button } from '../components/ui/Button.jsx';
import { TerminalCard } from '../components/ui/TerminalCard.jsx';
import { Reveal, RevealWords } from '../components/motion/Reveal.jsx';
import { Parallax } from '../components/motion/Parallax.jsx';
import { Counter } from '../components/motion/Counter.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

export function HeroSection() {
  const { heroContent } = useContent();
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, terminal, stats } =
    heroContent;

  return (
    <section className="relative overflow-hidden bg-ink-900 pt-16 sm:pt-2 md:pt-2 lg:pt-2">
      {/* Capas de fondo: retícula técnica + halo superior. Ambas decorativas. */}
      <div
        aria-hidden="true"
        className="grid-backdrop grid-fade pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_55%_at_50%_-10%,rgba(255,255,255,0.08),transparent)] md:h-[560px]"
      />

      <Container className="relative py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h1 className="text-[2rem] font-bold leading-[1.12] tracking-tight text-silver-50 sm:text-4xl md:text-5xl xl:text-6xl">
              <RevealWords text={title} delay={0.1} />
            </h1>

            <Reveal delay={0.5}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-silver-400 sm:text-lg md:mt-7">
                {subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.65} stagger={0.08}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10">
                <Button as="a" href={primaryCta.href}>
                  {primaryCta.label}
                </Button>
                <Button as="a" href={secondaryCta.href} variant="outline">
                  {secondaryCta.label}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* La terminal flota un poco más lento que el scroll: da profundidad. */}
          <Parallax speed={-0.08}>
            <Reveal delay={0.35}>
              <TerminalCard prompt={terminal.prompt} lines={terminal.lines} />
            </Reveal>
          </Parallax>
        </div>

        <Reveal delay={0.15}>
          <dl className="mt-16 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 md:mt-24 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative bg-ink-900 px-5 py-6 transition-colors duration-500 hover:bg-ink-850 sm:px-6 sm:py-8"
              >
                {/* Filo superior que se enciende al pasar el cursor */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-linear-to-r from-silver-300 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-bold tracking-tight text-silver-50 sm:text-3xl">
                  <Counter value={stat.value} />
                </dd>
                <p className="mt-2 text-xs leading-snug text-silver-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
