import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Button, ArrowLink } from '../components/ui/Button.jsx';
import { TextField, TextAreaField } from '../components/ui/FormField.jsx';
import { Checkbox } from '../components/ui/Checkbox.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContactForm } from '../hooks/useContactForm.js';
import { useContent, useLanguage } from '../i18n/LanguageContext.jsx';
import { whatsappUrl, scheduleUrl } from '../config/site.config.js';

/**
 * Contacto.
 *
 * El punto más luminoso de la página: el halo violeta sube desde abajo y
 * la cierra donde termina el ascenso. Es también el único sitio donde el
 * formulario se apoya sobre un plano propio, para que se lea como el
 * destino de todo lo anterior y no como una sección más.
 */
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
    scheduleLabel,
    replyNote,
    preferenceForm,
  } = useContent().contactContent;
  const { language, config } = useLanguage();
  const { values, status, handleChange, handleSubmit } = useContactForm();

  return (
    <Section id={id} tone="raised" glow className="overflow-hidden">
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <Reveal stagger={0.09} className="mb-14 grid gap-px bg-ink-700 md:grid-cols-3">
        {assurances.map((assurance) => (
          <p
            key={assurance}
            className="flex items-start gap-3 bg-ink-900 py-5 pr-5 text-sm leading-snug text-silver-300 md:px-5"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent-500"
            />
            {assurance}
          </p>
        ))}
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
        <Reveal
          as="form"
          onSubmit={handleSubmit}
          className="space-y-7 border border-ink-700 bg-ink-950 p-7 md:p-10"
        >
          <div className="grid gap-7 md:grid-cols-2">
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

          <Checkbox id="consent" checked={values.consent} onChange={handleChange} required>
            {consent.label}{' '}
            <a
              href={config.routes.privacy}
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver-100 underline decoration-accent-500 underline-offset-4 transition-colors duration-200 hover:text-accent-300"
            >
              {consent.linkLabel}
            </a>
            .
          </Checkbox>

          <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
            <Button type="submit" className="w-full sm:w-auto">
              {submitLabel}
            </Button>
            {status === 'success' ? (
              <p className="text-sm text-accent-300" role="status">
                {successMessage}
              </p>
            ) : (
              <p className="text-sm text-silver-400">{replyNote}</p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.15} as="aside" className="lg:pt-2">
          <h3 className="label text-silver-400">{preferenceForm}</h3>

          <div className="mt-6 space-y-5 border-t border-ink-700 pt-6">
            <ArrowLink
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-silver-100"
            >
              {whatsappLabel}
            </ArrowLink>

            <div className="border-t border-ink-800 pt-5">
              <ArrowLink
                href={scheduleUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {scheduleLabel}
              </ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
