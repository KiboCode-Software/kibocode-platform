import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal, RevealWords } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

/**
 * Los cuatro síntomas.
 *
 * Sin numerar: no son pasos ni un orden, son cuatro cosas que pasan a la
 * vez. Numerarlas sugeriría una secuencia que no existe. Van como entradas
 * de una lista, separadas solo por filetes, y el filete se enciende en
 * violeta al pasar por encima — el mismo gesto de la traza de la ruta.
 */
export function ProblemsSection() {
  const { problemsContent } = useContent();
  const { id, eyebrow, title, items, closing } = problemsContent;

  return (
    <Section id={id} tone="raised" texture="topo">
      <SectionHeader eyebrow={eyebrow} title={title} />

      {/* Entran desde lados opuestos: los síntomas llegan de todas partes
          a la vez, no en fila india. */}
      <div className="grid gap-x-14 lg:grid-cols-2">
        {items.map((item, index) => (
          <Reveal
            key={item.title}
            as="article"
            x={index % 2 === 0 ? -120 : 120}
            rotate={index % 2 === 0 ? -1.5 : 1.5}
            delay={index * 0.06}
            className="group relative border-t border-ink-700 py-8 md:py-10"
          >
            {/* Filo violeta que se dibuja sobre el filete al pasar el cursor */}
            <span
              aria-hidden="true"
              className="route-fill absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            />
            <h3 className="display-tight text-lg font-semibold text-silver-100 transition-colors duration-300 group-hover:text-silver-50 md:text-xl">
              {item.title}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-silver-400 md:text-[15px]">
              {item.description}
            </p>
          </Reveal>
        ))}
      </div>

      {/* El cierre es la conclusión del diagnóstico, así que entra palabra a
          palabra en vez de aparecer de golpe: es el mismo gesto del titular
          de la portada, reservado para las dos frases que rematan algo. */}
      <p className="display-tight mt-14 max-w-4xl border-l-2 border-accent-500 pl-6 text-lg font-medium leading-snug text-silver-100 md:mt-16 md:pl-8 md:text-2xl">
        <RevealWords text={closing} delay={0.05} />
      </p>
    </Section>
  );
}
