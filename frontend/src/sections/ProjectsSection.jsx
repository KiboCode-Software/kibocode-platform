import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContent } from '../i18n/LanguageContext.jsx';

export function ProjectsSection() {
  const { projectsContent } = useContent();
  const { id, eyebrow, title, subtitle, project } = projectsContent;

  return (
    <Section id={id} tone="raised" texture="topo">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <Reveal>
        <article className="group grid overflow-hidden border border-ink-700 bg-ink-950/80 lg:grid-cols-[1.1fr_0.9fr]">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.linkLabel}: ${project.name}`}
            className="relative block min-h-64 overflow-hidden bg-ink-1000 focus-visible:outline-offset-[-4px] sm:min-h-80 lg:order-2 lg:min-h-full"
          >
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
            />
            <span className="absolute bottom-4 left-4 border border-white/15 bg-ink-950/85 px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-silver-200 backdrop-blur-sm">
              nucleo.kibocode.lat
            </span>
          </a>

          <div className="flex flex-col p-7 sm:p-9 lg:p-12">
            <p className="label text-accent-300">{project.category}</p>
            <h3 className="display mt-5 text-4xl font-semibold tracking-tight text-silver-50 sm:text-5xl">
              {project.name}
            </h3>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-silver-300">
              {project.description}
            </p>

            <ul className="mt-8 grid gap-3 border-t border-ink-700 pt-6 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-silver-300">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex w-fit items-center gap-3 border-b border-accent-500/60 pb-2 text-sm font-medium text-silver-50 transition-colors hover:border-accent-300 hover:text-accent-300"
            >
              {project.linkLabel}
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                <path d="M4 10h11M10 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
