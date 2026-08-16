import { Reveal } from '../motion/Reveal.jsx';

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <Reveal as="header" className="mb-12 max-w-2xl md:mb-16" stagger={0.1}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-silver-500 sm:text-xs sm:tracking-[0.25em]">
          <span className="h-px w-8 bg-ink-500" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold leading-tight text-silver-50 sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-silver-400">{subtitle}</p>
      )}
    </Reveal>
  );
}
