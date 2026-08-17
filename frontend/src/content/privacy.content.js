import { siteConfig } from '../config/site.config.js';

const { legal, contactEmail, whatsapp, name } = siteConfig;

/**
 * Texto del Aviso de Privacidad (Ley 1581 de 2012 y Decreto 1377 de 2013).
 * Los datos del responsable se toman de `site.config.js` para no
 * duplicarlos en el código.
 */
export const privacyContent = {
  eyebrow: 'Legal',
  title: 'Aviso de Privacidad',
  subtitle: 'Aviso de tratamiento de datos personales',
  intro: `En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 sobre protección de datos personales en Colombia, ${name} informa a los usuarios de este sitio web lo siguiente:`,
  lastUpdated: `Última actualización: ${legal.lastUpdated}`,
  backLabel: 'Volver al inicio',
  blocks: [
    {
      heading: 'Responsable del tratamiento',
      paragraphs: [
        `${legal.ownerName}, operando bajo el nombre comercial ${name}, con domicilio en ${legal.country}. Puedes contactarnos en ${contactEmail} o por WhatsApp al ${whatsapp.display}.`,
      ],
    },
    {
      heading: 'Datos que recolectamos',
      paragraphs: [
        'A través del formulario de contacto de este sitio recolectamos tu nombre, el nombre de tu empresa y la descripción del proyecto o necesidad que nos compartas.',
        'Además, cuando navegas por el sitio se recogen datos técnicos y de uso mediante herramientas de medición: dirección IP, tipo de dispositivo y navegador, páginas visitadas y desde qué anuncio o enlace llegaste. Estos datos no permiten identificarte por nombre y se usan de forma agregada.',
      ],
    },
    {
      heading: 'Herramientas de medición y publicidad',
      paragraphs: [
        `Usamos el píxel de TikTok para saber cuántas personas llegan a este sitio desde nuestros anuncios y cuántas nos contactan. Esa medición implica que TikTok, como responsable independiente, recibe datos de tu navegación y puede usarlos conforme a su propia política de privacidad, incluso para mostrarte publicidad.`,
        'Puedes impedirlo bloqueando las cookies de terceros en tu navegador, usando su modo de navegación privada o una extensión de bloqueo. El sitio funciona con normalidad si lo haces.',
      ],
    },
    {
      heading: 'Finalidad del tratamiento',
      paragraphs: [
        'Los datos que nos proporcionas en el formulario se usan exclusivamente para contactarte, entender tu necesidad y ofrecerte un diagnóstico o propuesta relacionada con nuestros servicios de desarrollo de software. No los vendemos a terceros.',
        'Los datos de navegación se usan únicamente para medir el rendimiento de nuestra publicidad y mejorar el sitio.',
      ],
    },
    {
      heading: 'Cómo se envía tu información',
      paragraphs: [
        `Al completar el formulario, tu mensaje se abre directamente en WhatsApp para que lo envíes tú mismo desde tu propio número. Esto significa que, además de ser tratada por ${name}, tu información pasa por la plataforma de WhatsApp (Meta), sujeta a su propia política de privacidad.`,
      ],
    },
    {
      heading: 'Tiempo de conservación',
      paragraphs: [
        'Conservamos tus datos únicamente mientras dure la relación comercial o el proceso de evaluación de tu proyecto, y mientras sea necesario para efectos legales, contables o de responsabilidad frente a la relación establecida contigo.',
      ],
    },
    {
      heading: 'Tus derechos como titular de los datos',
      paragraphs: ['De acuerdo con la ley colombiana, tienes derecho a:'],
      list: [
        'Conocer, actualizar y rectificar tus datos personales.',
        'Solicitar prueba de la autorización otorgada.',
        'Ser informado sobre el uso que se le ha dado a tus datos.',
        'Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.',
        'Revocar la autorización o solicitar la supresión de tus datos cuando no exista un deber legal o contractual que lo impida.',
        'Acceder de forma gratuita a tus datos.',
      ],
    },
    {
      heading: 'Cómo ejercer tus derechos',
      paragraphs: [
        `Puedes escribirnos a ${contactEmail} indicando tu solicitud, y te responderemos en los términos establecidos por la ley (máximo 10 días hábiles para consultas, 15 días hábiles para reclamos).`,
      ],
    },
    {
      heading: 'Autorización',
      paragraphs: [
        `Al diligenciar y enviar el formulario de contacto de este sitio, autorizas a ${name} a tratar tus datos personales conforme a lo descrito en este aviso.`,
      ],
    },
  ],
};
