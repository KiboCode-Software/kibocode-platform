import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { RouteLine } from '../components/motion/RouteLine.jsx';
import { gsap } from '../lib/gsap.js';
import { useGsapContext } from '../hooks/useGsap.js';
import { useContent } from '../i18n/LanguageContext.jsx';

/**
 * La metodología, como la ruta de un ascenso.
 *
 * Aquí sí hay secuencia — descubrimiento, construcción, despliegue — así
 * que los números 01/02/03 dicen algo verdadero, y la traza violeta que
 * los une se dibuja al bajar por la página. Es el elemento firma del
 * sitio: la marca es una llave apuntando a una cumbre, y esto es la ruta.
 *
 * Los campamentos se encienden en orden conforme la traza los alcanza. Sin
 * eso la línea avanzaba sobre tres marcadores ya encendidos, que es tanto
 * como dibujar una ruta sobre un camino ya recorrido.
 *
 * En móvil la traza sube en vertical junto a los pasos; en escritorio los
 * cruza en horizontal.
 */
export function MethodologySection() {
  const { methodologyContent } = useContent();
  const { id, eyebrow, title, steps } = methodologyContent;

  // El marcado los pinta encendidos y es la animación la que los apaga para
  // volver a encenderlos: si GSAP no carga o hay movimiento reducido, se ven
  // los tres campamentos, no tres puntos grises sin explicación.
  const scope = useGsapContext(() => {
    const campamentos = scope.current.querySelectorAll('[data-campamento]');

    gsap.fromTo(
      campamentos,
      { backgroundColor: '#2c2c2c', scale: 0.55, boxShadow: '0 0 0 0 rgba(168,85,247,0)' },
      {
        backgroundColor: '#a855f7',
        scale: 1,
        boxShadow: '0 0 14px 2px rgba(168,85,247,0.45)',
        ease: 'none',
        stagger: 0.5,
        scrollTrigger: {
          trigger: scope.current,
          start: 'top 82%',
          end: 'top 38%',
          scrub: 0.5,
        },
      },
    );
  });

  return (
    <Section id={id} tone="raised" texture>
      <SectionHeader eyebrow={eyebrow} title={title} />

      <div ref={scope} className="relative">
        <RouteLine
          axis="vertical"
          className="absolute bottom-6 left-[3px] top-2 lg:hidden"
        />
        <RouteLine
          axis="horizontal"
          className="absolute inset-x-0 top-[3px] hidden lg:block"
        />

        <ol className="grid gap-12 md:gap-14 lg:grid-cols-3 lg:gap-10">
          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              as="li"
              delay={index * 0.12}
              className="relative pl-10 lg:pl-0 lg:pt-14"
            >
              {/* Marcador de campamento, sobre la traza */}
              <span
                data-campamento
                aria-hidden="true"
                className="absolute left-0 top-1 h-[7px] w-[7px] bg-accent-500 lg:top-0"
              />

              <span className="label text-accent-300">{step.number}</span>

              <h3 className="display-tight mt-4 text-xl font-semibold text-silver-50 md:text-2xl">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-silver-400 md:text-[15px]">
                {step.description}
              </p>

              <p className="mt-7 border-l border-ink-600 pl-5 text-sm font-medium leading-relaxed text-silver-200">
                {step.deliverable}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
