import { Container } from '../components/ui/Container.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Parallax } from '../components/motion/Parallax.jsx';
import { gsap } from '../lib/gsap.js';
import { useGsapContext } from '../hooks/useGsap.js';
import { useContent } from '../i18n/LanguageContext.jsx';

const APAGADO = { backgroundColor: '#2c2c2c', scale: 0.5, boxShadow: '0 0 0 0 rgba(168,85,247,0)' };
const ENCENDIDO = {
  backgroundColor: '#a855f7',
  scale: 1,
  boxShadow: '0 0 18px 3px rgba(168,85,247,0.55)',
};

/**
 * La metodología, recorrida de lado.
 *
 * Es el ascenso, así que en escritorio deja de ser una lista y pasa a ser
 * una travesía: la sección se clava en pantalla y los tres campamentos
 * cruzan de derecha a izquierda mientras bajas. La traza violeta se dibuja
 * al mismo tiempo y cada campamento se enciende cuando la línea lo alcanza.
 *
 * Las tres cosas van en una sola línea de tiempo con el mismo scrub, que es
 * lo único que garantiza que la luz llegue al campamento exactamente cuando
 * llega la traza. Con tres disparadores sueltos se desincronizan en cuanto
 * cambia el alto de la ventana.
 *
 * Por debajo de 1024 px no se clava nada: en un teléfono robar el scroll
 * vertical es la forma más rápida de que alguien se vaya de la página. Ahí
 * la travesía se lee en vertical, con la misma traza y los mismos
 * encendidos.
 */
export function MethodologySection() {
  const { methodologyContent } = useContent();
  const { id, eyebrow, title, steps } = methodologyContent;

  const alcance = useGsapContext(() => {
    const raiz = alcance.current;
    const pista = raiz.querySelector('[data-pista]');
    const campamentos = raiz.querySelectorAll('[data-campamento]');
    const trazaH = raiz.querySelector('[data-traza-h]');
    const trazaV = raiz.querySelector('[data-traza-v]');
    const mm = gsap.matchMedia();

    // ── Escritorio: travesía horizontal con la sección clavada ──────────
    mm.add('(min-width: 1024px)', () => {
      const distancia = () => Math.max(pista.scrollWidth - raiz.offsetWidth + 80, 0);
      const recorrido = () => distancia() * 1.7;

      const linea = gsap.timeline({
        scrollTrigger: {
          trigger: raiz,
          start: 'top top',
          end: () => `+=${recorrido()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Las tres duraciones tienen que sumar lo mismo. Sin fijarlas, GSAP
      // le da 0,5 por defecto a cada tween y la más larga —los campamentos
      // escalonados— estira la línea de tiempo: la pista terminaba su
      // recorrido al 36% del scroll y el resto de la travesía era una
      // sección clavada sin nada moviéndose.
      linea
        .to(pista, { x: () => -distancia(), ease: 'none', duration: 1 }, 0)
        .fromTo(trazaH, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(
          campamentos,
          APAGADO,
          { ...ENCENDIDO, ease: 'none', duration: 0.25, stagger: 0.375 },
          0,
        );

      return () => linea.scrollTrigger?.kill(true);
    });

    // ── Móvil y tablet: la misma travesía, en vertical ──────────────────
    mm.add('(max-width: 1023px)', () => {
      const linea = gsap.timeline({
        scrollTrigger: {
          trigger: pista,
          start: 'top 80%',
          end: 'bottom 65%',
          scrub: 0.6,
        },
      });

      linea
        .fromTo(trazaV, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 1 }, 0)
        .fromTo(
          campamentos,
          APAGADO,
          { ...ENCENDIDO, ease: 'none', duration: 0.25, stagger: 0.375 },
          0,
        );

      return () => linea.scrollTrigger?.kill(true);
    });

    return () => mm.revert();
  });

  return (
    <section
      ref={alcance}
      id={id}
      className="relative overflow-hidden bg-ink-900/75 py-18 md:py-24 lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-0"
    >
      <Parallax pixels={140} className="pointer-events-none absolute inset-0">
        <div aria-hidden="true" className="topo fade-edges absolute inset-x-0 -inset-y-40" />
      </Parallax>

      <Container className="relative">
        <SectionHeader eyebrow={eyebrow} title={title} />
      </Container>

      {/* La pista sangra hasta el borde derecho: el corte es la promesa de
          que hay más camino del que cabe en pantalla. */}
      <div className="relative overflow-hidden">
        {/* Traza vertical (móvil) */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-6 top-2 w-px overflow-hidden bg-ink-700 md:left-10 lg:hidden"
        >
          <div
            data-traza-v
            className="route-fill h-full w-full origin-top"
            style={{ '--route-direction': 'to bottom' }}
          />
        </div>

        <div
          data-pista
          className="relative flex flex-col gap-14 px-6 md:px-10 lg:w-max lg:flex-row lg:items-start lg:gap-20 lg:pr-[28vw]"
        >
          {/* Traza horizontal (escritorio), a lo largo de toda la pista */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-1 hidden h-px w-full overflow-hidden bg-ink-700 lg:block"
          >
            <div data-traza-h className="route-fill h-full w-full origin-left" />
          </div>

          {steps.map((step) => (
            <article
              key={step.number}
              className="relative pl-10 lg:w-[44vw] lg:max-w-[600px] lg:shrink-0 lg:pl-0 lg:pt-16"
            >
              <span
                data-campamento
                aria-hidden="true"
                className="absolute -left-1 top-1 h-2 w-2 bg-accent-500 lg:left-0 lg:top-0"
              />

              <span className="label text-accent-300">{step.number}</span>

              <h3 className="display-tight mt-4 text-xl font-semibold text-silver-50 md:text-2xl lg:text-3xl">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-silver-400 md:text-[15px]">
                {step.description}
              </p>

              <p className="mt-7 border-l border-ink-600 pl-5 text-sm font-medium leading-relaxed text-silver-200">
                {step.deliverable}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
