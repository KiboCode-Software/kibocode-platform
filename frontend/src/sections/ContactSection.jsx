import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Button } from '../components/ui/Button.jsx';
import { TextField, TextAreaField } from '../components/ui/FormField.jsx';
import { Checkbox } from '../components/ui/Checkbox.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContactForm } from '../hooks/useContactForm.js';
import { useContent, useLanguage } from '../i18n/LanguageContext.jsx';
import { whatsappUrl } from '../config/site.config.js';

export function ContactSection() {
  const {
    id,
    eyebrow,
    title,
    subtitle,
    assurances,
    fields,
    consent,
    submitLabel,
    whatsappLabel,
    successMessage,
    replyNote,
    preferenceForm,
  } = useContent().contactContent;
  const { config } = useLanguage();
  const { values, status, handleChange, handleSubmit } = useContactForm();

  return (
    <Section id={id} className="relative overflow-hidden">
      {/* Halo inferior: cierra la página con un poco de luz. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[380px] bg-[radial-gradient(ellipse_60%_60%_at_50%_110%,rgba(255,255,255,0.06),transparent)]"
      />

      <div className="relative">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

        <Reveal stagger={0.09}>
          <ul className="mb-12 grid max-w-3xl gap-3 md:mb-14 lg:grid-cols-3 lg:gap-8">
            {assurances.map((assurance) => (
              <li
                key={assurance}
                className="flex items-start gap-3 border-l border-ink-600 pl-4 text-sm leading-snug text-silver-400"
              >
                <span aria-hidden="true" className="mt-0.5 text-silver-200">
                  ✓
                </span>
                {assurance}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
            <TextField
              id="name"
              label={fields.name.label}
              placeholder={fields.name.placeholder}
              value={values.name}
              onChange={handleChange}
              required
            />
            <TextField
              id="company"
              label={fields.company.label}
              placeholder={fields.company.placeholder}
              value={values.company}
              onChange={handleChange}
              required
            />
          </div>
          <TextAreaField
            id="message"
            label={fields.message.label}
            placeholder={fields.message.placeholder}
            value={values.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <Checkbox
            id="consent"
            checked={values.consent}
            onChange={handleChange}
            required
          >
            {consent.label}{' '}
            <a
              href={config.routes.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver-100 underline underline-offset-4 transition-colors duration-200 hover:text-white"
            >
              {consent.linkLabel}
            </a>
            .
          </Checkbox>

          <p className='text-[12px] text-gray-500'>{replyNote}</p>
          
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
            <Button type="submit" className="w-full sm:w-auto">
              {submitLabel}
            </Button>
            {status === 'success' && (
              <p className="text-sm text-silver-400" role="status">
                {successMessage}
              </p>
            )}
          </div>
        </form>

          <aside className="border-t border-ink-600 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
            <h3 className="text-sm font-medium uppercase tracking-wider text-silver-500">
              {preferenceForm}
            </h3>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-2 inline-flex items-center gap-2 border-b border-silver-500 py-3 text-sm leading-relaxed text-silver-100 transition-colors duration-300 hover:border-silver-100"
            >
              {whatsappLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </aside>
        </div>
      </div>
    </Section>
  );
}
