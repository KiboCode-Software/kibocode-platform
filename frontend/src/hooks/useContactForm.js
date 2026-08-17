import { useState } from 'react';
import { whatsappUrl } from '../config/site.config.js';
import { registrarContacto } from '../lib/tiktok-pixel.js';
import { useContent } from '../i18n/LanguageContext.jsx';

const INITIAL_VALUES = { name: '', company: '', message: '', consent: false };

/**
 * Lógica del formulario de contacto, desacoplada de la vista.
 * Al enviar, abre WhatsApp Business con el mensaje pre-llenado:
 * el lead llega directo al canal de atención, con su número incluido.
 */
export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [status, setStatus] = useState('idle'); // idle | success
  const { whatsappMessage } = useContent().contactContent;

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // La conversión se registra antes de abrir WhatsApp: es lo que permite al
    // optimizador de TikTok aprender qué anuncios traen clientes reales.
    registrarContacto();

    const url = whatsappUrl(buildWhatsappMessage(values, whatsappMessage));
    const popup = window.open(url, '_blank', 'noopener');
    if (!popup) {
      // Bloqueador de popups: navegamos en la misma pestaña
      window.location.href = url;
    }
    setStatus('success');
  };

  return { values, status, handleChange, handleSubmit };
}

/**
 * Arma el mensaje en el idioma en que el visitante leyó la página: escribir
 * en español a quien navegó en inglés arruina la primera impresión justo en
 * el momento del contacto.
 */
function buildWhatsappMessage({ name, company, message }, plantilla) {
  return [
    plantilla.greeting,
    plantilla.intro.replace('{name}', name).replace('{company}', company),
    '',
    message,
  ].join('\n');
}
