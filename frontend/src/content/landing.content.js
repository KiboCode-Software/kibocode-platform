/**
 * Capa de contenido: todo el copy de la landing vive aquí,
 * desacoplado de los componentes de presentación.
 *
 * NOTA: las cifras de `hero.stats` son objetivos típicos de proyecto.
 * Ajústalas con métricas reales de tus clientes cuando las tengas.
 */
export const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Por qué KiboCode', href: '#diferenciacion' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export const footerContent = {
  tagline: 'Ingeniería de software a medida.',
  privacy: 'Aviso de Privacidad',
};

export const heroContent = {
  title: 'Software a medida que convierte horas de trabajo manual en rentabilidad.',
  subtitle:
    'No vendemos plantillas ni licencias genéricas. Estudiamos cómo opera tu empresa y construimos los sistemas que eliminan cuellos de botella, automatizan lo repetitivo y te dan control real del negocio. Trabajamos en remoto, con clientes en cualquier país.',
  primaryCta: { label: 'Agendar diagnóstico sin costo', href: '#contacto' },
  secondaryCta: { label: 'Ver cómo trabajamos', href: '#metodologia' },
  terminal: {
    label: 'kibocode — producción',
    prompt: '$ kibo deploy --production',
    lines: [
      '✓ Sincronización de inventario conectada',
      '✓ 1.240 pedidos migrados sin errores',
      '✓ Reportes automáticos: activados',
      '→ Tiempo de captura manual: −70%',
      'Sistema en producción. Operación bajo control.',
    ],
  },
  stats: [
    { value: '−70%', label: 'de tiempo en tareas repetitivas tras automatizar' },
    { value: '< 24 h', label: 'de respuesta a cada mensaje, siempre' },
    { value: '100%', label: 'del código es tuyo — sin licencias atadas' },
    { value: '0', label: 'intermediarios entre tú y quien construye' },
  ],
};

export const problemsContent = {
  id: 'problemas',
  eyebrow: '¿Te suena familiar?',
  title: 'Estos problemas le cuestan dinero a tu empresa todos los días.',
  items: [
    {
      title: 'La operación vive en Excels',
      description:
        'Versiones duplicadas, fórmulas rotas y nadie sabe cuál es el archivo bueno. La información existe, pero no sirve para decidir.',
    },
    {
      title: 'Tu equipo captura lo mismo dos y tres veces',
      description:
        'Del correo al Excel, del Excel al sistema, del sistema al reporte. Horas de gente valiosa haciendo trabajo de copiar y pegar.',
    },
    {
      title: 'Tus sistemas no se hablan entre sí',
      description:
        'Facturación por un lado, inventario por otro, ventas en WhatsApp. Cada isla de información es una fuente de errores y retrabajos.',
    },
    {
      title: 'Te enteras de los números a fin de mes',
      description:
        'Margen, inventario real, cuentas por cobrar. Cuando el dato llega, la decisión que dependía de él ya se tomó a ciegas.',
    },
  ],
  closing:
    'Cada uno de estos problemas se resuelve con software bien construido. Y cada día sin resolverlos cuesta horas, errores y margen.',
};

export const servicesContent = {
  id: 'servicios',
  eyebrow: 'Qué construimos',
  title: 'Tres formas de atacar el problema, un mismo objetivo: que tu operación deje de depender del esfuerzo manual.',
  items: [
    {
      title: 'Desarrollo a Medida',
      problem:
        'El software genérico te obliga a adaptar tu operación a la herramienta — y lo que no encaja se resuelve a mano.',
      description:
        'Portales de clientes, cotizadores, plataformas web y PWAs construidos sobre tu proceso real, no sobre el de otro.',
      result: 'El sistema se adapta a tu negocio. No al revés.',
    },
    {
      title: 'Automatización de Procesos',
      problem:
        'Capturas manuales, copiar y pegar entre sistemas, reportes armados a mano cada semana.',
      description:
        'Integramos tus herramientas vía APIs, sincronizamos datos entre sistemas y convertimos reportes de horas en reportes automáticos.',
      result: 'Horas recuperadas cada semana, errores de captura en cero.',
    },
    {
      title: 'Sistemas de Gestión (SGI/CRM)',
      problem:
        'Inventario, clientes y operación repartidos en archivos y en la cabeza de dos o tres personas clave.',
      description:
        'Un solo lugar para inventarios, clientes y operación, con datos en tiempo real y accesos por rol.',
      result: 'Decisiones con datos del día, no del mes pasado.',
    },
  ],
};

export const methodologyContent = {
  id: 'metodologia',
  eyebrow: 'Cómo trabajamos',
  title: 'Sin cajas negras: sabes qué se está construyendo, cuándo y por qué.',
  steps: [
    {
      number: '01',
      title: 'Descubrimiento & Arquitectura',
      description:
        'Nos sentamos con tu operación real: dónde se pierde tiempo, dónde se generan errores, qué procesos duelen más. De ahí sale el diseño del sistema.',
      deliverable:
        'Recibes: mapa del proceso, propuesta técnica y cotización cerrada.',
    },
    {
      number: '02',
      title: 'Desarrollo & Pruebas',
      description:
        'Construcción modular con entregas parciales funcionando. Pruebas continuas con datos reales de tu operación, no demos de laboratorio.',
      deliverable: 'Recibes: avances funcionales cada semana, no promesas.',
    },
    {
      number: '03',
      title: 'Despliegue & Escalabilidad',
      description:
        'Puesta en producción en entornos cloud seguros, capacitación de tu equipo y soporte posterior. El sistema crece cuando tu empresa crece.',
      deliverable:
        'Recibes: sistema en producción, equipo capacitado y soporte directo.',
    },
  ],
};

export const valuePropsContent = {
  id: 'diferenciacion',
  eyebrow: 'Por qué KiboCode',
  title: 'Lo que firmamos contigo, lo cumplimos en el código.',
  items: [
    {
      title: 'El código es tuyo',
      description:
        'Entregamos código fuente completo y documentado. Si mañana quieres seguir con otro equipo, puedes. Trabajamos para que te quedes por los resultados, no por dependencia.',
    },
    {
      title: 'Hablamos de negocio, no de tecnicismos',
      description:
        'Hablas directo con quien construye tu sistema, sin gestores intermedios. Te explicamos cada decisión en términos de tiempo y dinero, no de siglas.',
    },
    {
      title: 'Si el software no es la solución, te lo decimos',
      description:
        'Cada línea de código debe responder a un objetivo de rentabilidad o ahorro de tiempo. Si tu problema se resuelve con un ajuste de proceso y no con un desarrollo, te lo decimos en el diagnóstico — sin costo.',
    },
  ],
};

export const faqContent = {
  id: 'faq',
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que todo cliente pregunta antes de empezar.',
  items: [
    {
      question: '¿Cuánto cuesta un proyecto?',
      answer:
        'Depende del alcance, y por eso el diagnóstico es primero: de ahí sale una cotización cerrada, sin costos sorpresa. Trabajamos por fases para que veas resultados funcionando antes de comprometer todo el presupuesto.',
    },
    {
      question: '¿De quién es el código al terminar?',
      answer:
        'Tuyo, al 100%. Entregamos el código fuente completo, la documentación y los accesos. No hay licencias mensuales por usar tu propio sistema ni dependencia obligada con nosotros.',
    },
    {
      question: 'Ya uso otros sistemas, ¿tengo que abandonarlos?',
      answer:
        'No. Gran parte de nuestro trabajo es integración: hacer que tu facturación, tu inventario y tus ventas se comuniquen entre sí. Solo reemplazamos lo que de verdad conviene reemplazar.',
    },
    {
      question: '¿Cuánto tarda un proyecto?',
      answer:
        'Una automatización acotada: semanas. Un sistema completo: de 2 a 4 meses según el alcance. En ambos casos entregamos por fases, así que ves avances funcionando desde las primeras semanas.',
    },
    {
      question: '¿Qué pasa después del lanzamiento?',
      answer:
        'No desaparecemos. Damos soporte, monitoreamos el sistema en producción y lo evolucionamos conforme tu operación lo necesita. El despliegue es el inicio de la operación, no el final del proyecto.',
    },
  ],
};

export const contactContent = {
  id: 'contacto',
  eyebrow: 'Empecemos',
  title: 'Cuéntanos qué te está costando tiempo o dinero.',
  subtitle:
    'Llena estos tres campos y el mensaje llega directo a nuestro WhatsApp Business, listo para enviar. Sin correos que se pierden en la bandeja.',
  assurances: [
    'Diagnóstico inicial sin costo y sin compromiso',
    'Respuesta en menos de 24 horas hábiles',
    'Si el software no es la solución a tu problema, te lo decimos',
  ],
  fields: {
    name: { label: 'Nombre', placeholder: 'Tu nombre completo' },
    company: { label: 'Nombre de la Empresa', placeholder: 'Tu empresa' },
    message: {
      label: 'Descripción Breve del Proyecto / Necesidad',
      placeholder:
        'Ej.: "Capturamos pedidos a mano y perdemos horas cada semana…"',
    },
  },
  consent: {
    label: 'He leído y acepto el',
    linkLabel: 'Aviso de Privacidad',
  },

  /* Mensaje que se abre en WhatsApp. {name} y {company} se sustituyen. */
  whatsappMessage: {
    greeting: 'Hola KiboCode 👋',
    intro: 'Soy {name}, de {company}.',
  },

  submitLabel: 'Enviar por WhatsApp',
  preferenceForm: '¿Prefieres saltarte el formulario?',
  whatsappLabel: 'O escríbenos directo por WhatsApp Business',
  scheduleLabel: 'O agenda una llamada de 30 minutos',
  replyNote: 'Te respondemos en menos de 24 horas hábiles.',
  successMessage:
    'Se abrió WhatsApp con tu mensaje listo — solo presiona enviar.',
};
