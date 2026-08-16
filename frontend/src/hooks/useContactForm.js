import { useState } from 'react';
import { whatsappUrl } from '../config/site.config.js';

const INITIAL_VALUES = { name: '', company: '', message: '', consent: false };

/**
 * Lógica del formulario de contacto, desacoplada de la vista.
 * Al enviar, abre WhatsApp Business con el mensaje pre-llenado:
 * el lead llega directo al canal de atención, con su número incluido.
 */
export function useContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [status, setStatus] = useState('idle'); // idle | success

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = whatsappUrl(buildWhatsappMessage(values));
    const popup = window.open(url, '_blank', 'noopener');
    if (!popup) {
      // Bloqueador de popups: navegamos en la misma pestaña
      window.location.href = url;
    }
    setStatus('success');
  };

  return { values, status, handleChange, handleSubmit };
}

function buildWhatsappMessage({ name, company, message }) {
  return [
    'Hola KiboCode 👋',
    `Soy ${name}, de ${company}.`,
    '',
    message,
  ].join('\n');
}
