import { useEffect, useRef } from 'react';
import { Section } from '../components/layout/Section.jsx';
import { SectionHeader } from '../components/ui/SectionHeader.jsx';
import { Button, ArrowLink } from '../components/ui/Button.jsx';
import { TextField, TextAreaField } from '../components/ui/FormField.jsx';
import { Checkbox } from '../components/ui/Checkbox.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useContactForm } from '../hooks/useContactForm.js';
import { lanzarChispas, lanzarOnda } from '../lib/vfx.js';
import { useContent, useLanguage } from '../i18n/LanguageContext.jsx';
import { whatsappUrl, scheduleUrl } from '../config/site.config.js';

/**
 * Contacto.
 *
 * El punto más luminoso de la página: el halo violeta sube desde abajo y
 * la cierra donde termina el ascenso. Es también el único sitio donde el
 * formulario se apoya sobre un plano propio, para que se lea como el
 * destino de todo lo anterior y no como una sección más.
 *
 * Y es el único sitio donde el visitante hace algo, así que es el que más
 * tiene que responder: la barra de arriba avanza con cada campo, el botón
 * empieza a latir cuando ya se puede enviar, y al enviar salen chispas y
 * una onda desde el propio botón. Ese estallido es el acuse de recibo —
 * WhatsApp se abre en otra pestaña y, sin él, la página se quedaría muda
 * justo en el momento que importa.
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

  const panel = useRef(null);

  // Cuatro tramos, uno por cosa que hay que rellenar. Sin palabras: la barra
  // funciona igual en los dos idiomas y no hay que traducir nada.
  const pasos = [
    values.name.trim().length > 0,
    values.company.trim().length > 0,
    values.message.trim().length > 0,
    values.consent,
  ];
  const completados = pasos.filter(Boolean).length;
  const listo = completados === pasos.length;

  useEffect(() => {
    if (status !== 'success' || !panel.current) return;
    const boton = panel.current.querySelector('button[type="submit"]');
    lanzarOnda(panel.current, boton);
    lanzarChispas(boton);
  }, [status]);

  return (
    <Section id={id} tone="raised" texture="malla" glow className="overflow-hidden">
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
        {/* El panel contiene la onda: `overflow-hidden` la recorta contra sus
            propios bordes en vez de dejarla salpicar la sección. */}
        <div
          ref={panel}
          className="relative overflow-hidden border border-ink-700 bg-ink-950/90 transition-colors duration-700"
        >
          {/* Avance: se llena conforme se rellena. */}
          <div className="flex items-center gap-3 border-b border-ink-800 px-7 py-4 md:px-10">
            <div className="flex flex-1 items-center gap-1.5" aria-hidden="true">
              {pasos.map((hecho, indice) => (
                <span
                  key={indice}
                  className={`h-[3px] flex-1 origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    hecho ? 'route-fill' : 'bg-ink-700'
                  }`}
                />
              ))}
            </div>
            <span
              className={`label transition-colors duration-500 ${
                listo ? 'text-accent-300' : 'text-silver-500'
              }`}
            >
              {completados}/{pasos.length}
            </span>
          </div>

          <Reveal
            as="form"
            onSubmit={handleSubmit}
            className="space-y-7 p-7 md:p-10"
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
                className="text-silver-100 underline decoration-accent-500 underline-offset-4 transition-colors duration-200 hover:text-accent-300"
              >
                {consent.linkLabel}
              </a>
              .
            </Checkbox>

            <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
              <Button
                type="submit"
                className={`w-full sm:w-auto ${listo ? 'armado' : ''}`}
              >
                {submitLabel}
              </Button>
              {status === 'success' ? (
                <p className="text-sm font-medium text-accent-300" role="status">
                  {successMessage}
                </p>
              ) : (
                <p className="text-sm text-silver-400">{replyNote}</p>
              )}
            </div>
          </Reveal>
        </div>

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
