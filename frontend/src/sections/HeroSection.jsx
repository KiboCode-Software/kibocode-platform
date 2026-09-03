import { Container } from '../components/ui/Container.jsx';
import { Button } from '../components/ui/Button.jsx';
import { TerminalCard } from '../components/ui/TerminalCard.jsx';
import { Reveal, RevealWords } from '../components/motion/Reveal.jsx';
import { Counter } from '../components/motion/Counter.jsx';
import { Parallax } from '../components/motion/Parallax.jsx';
import { PointerLight } from '../components/motion/PointerLight.jsx';
import { Plane } from '../components/motion/Plane.jsx';
import { RouteLine } from '../components/motion/RouteLine.jsx';
import { gsap } from '../lib/gsap.js';
import { useGsapContext } from '../hooks/useGsap.js';
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
  const { title, subtitle, primaryCta, secondaryCta, terminal, stats } =
    heroContent;

  // La marca no se queda quieta: bascula despacio sobre su eje vertical y se
  // orienta hacia el puntero. Es el objeto que da nombre a la agencia, así
  // que es el que puede permitirse ser el único elemento con vida propia.
  const marca = useGsapContext((self, gsapLocal) => {
    const isotipo = marca.current.querySelector('[data-marca]');

    gsapLocal.to(isotipo, {
      rotationY: 26,
      rotationX: -8,
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined;
    }

    const girar = gsapLocal.quickTo(isotipo, 'rotationZ', { duration: 1.2, ease: 'power3' });
    const seguir = (evento) => {
      const caja = marca.current.getBoundingClientRect();
      const dx = evento.clientX - (caja.left + caja.width / 2);
      girar(Math.max(-14, Math.min(14, dx / 60)));
    };

    window.addEventListener('pointermove', seguir, { passive: true });
    return () => window.removeEventListener('pointermove', seguir);
  });

  // Las cifras arrancan en gris y suben a violeta mientras el contador las
  // recorre. El marcado las pinta ya en violeta: si no hay animación, se ven
  // encendidas, que es el estado que importa.
  const panel = useGsapContext(() => {
    gsap.from(panel.current.querySelectorAll('[data-cifra]'), {
      color: '#3a3a3a',
      duration: 1.6,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: { trigger: panel.current, start: 'top 92%', once: true },
    });
  });

  return (
    <section className="relative overflow-hidden bg-ink-950/70 pt-16">
      {/* Tres planos a distinta distancia. Las curvas al fondo, casi quietas;
          el halo en medio, respondiendo al puntero; el contenido al frente,
          firme. Es la separación entre ellos lo que da relieve. */}
      <Parallax pixels={320} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden="true"
          className="topo-lit fade-edges absolute inset-x-0 -inset-y-64"
        />
      </Parallax>
      {/* Segunda capa de curvas en sentido contrario: dos sistemas cruzándose
          leen como terreno con relieve, no como un papel con dibujo. */}
      <Parallax pixels={-180} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden="true"
          className="topo fade-edges absolute inset-x-0 -inset-y-64 opacity-70"
        />
      </Parallax>

      <PointerLight className="pointer-events-none absolute inset-0" />

      {/* La barra es fija, así que el `pt-16` de la sección solo compensa su
          altura: el aire real de la portada es este. */}
      <Container className="relative pb-14 pt-8 md:pb-20 md:pt-12 lg:pt-14">
        <Reveal y={12}>
          <span ref={marca} className="perspectiva relative inline-block">
            <span
              aria-hidden="true"
              className="glow-mark absolute -inset-8 blur-2xl"
            />
            <img
              data-marca
              src="/logo-mark.svg"
              alt=""
              width={96}
              height={96}
              className="placa relative h-20 w-20 md:h-24 md:w-24"
            />
          </span>
        </Reveal>

        {/* Sin antetítulo: repetía el nombre de la marca que ya está en la
            barra y en el isotipo, tres veces en el primer pantallazo. */}
        <h1 className="display mt-8 max-w-[19ch] text-[2.15rem] font-semibold leading-[1.06] text-silver-50 sm:text-5xl md:mt-10 md:text-6xl lg:text-[4.25rem]">
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

      {/* El registro entra inclinado y se endereza al subir: gira hacia ti
          hasta quedar de frente. Es el único momento coreografiado de la
          página — repetirlo en cada sección lo convertiría en un tic. */}
      <Container className="relative pb-16 md:pb-20">
        <Plane settle>
          <TerminalCard
            label={terminal.label}
            prompt={terminal.prompt}
            lines={terminal.lines}
          />
        </Plane>
      </Container>

      {/* Fila de instrumentos: la medición de lo que acaba de desplegarse.
          Sin cajas — solo filetes, como la lectura de un panel. La traza
          violeta lo recorre al entrar, y las cifras suben de gris apagado a
          violeta mientras cuentan: el panel se enciende, no aparece hecho. */}
      <div ref={panel} className="relative border-t border-ink-800 bg-ink-1000/50">
        <RouteLine axis="horizontal" className="absolute inset-x-0 top-0" />
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
                <dd
                  data-cifra
                  className="display text-3xl font-semibold text-accent-300 sm:text-4xl md:text-[2.75rem]"
                >
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
