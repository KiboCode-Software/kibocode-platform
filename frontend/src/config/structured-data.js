import { faqContent, servicesContent } from '../content/landing.content.js';
import { siteConfig } from './site.config.js';
import { seo, siteUrl } from './seo.config.js';

/**
 * Datos estructurados (JSON-LD) para los motores de búsqueda.
 *
 * Es lo que convierte "una página con texto" en "una empresa que hace X, en
 * Y lugar, con estas preguntas frecuentes". Se generan desde el mismo
 * contenido que ve el visitante, así que no se pueden desincronizar.
 */
export function buildStructuredData() {
  const organizationId = `${siteUrl}/#organizacion`;

  return [
    professionalService(organizationId),
    website(organizationId),
    faqPage(),
  ];
}

function professionalService(id) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': id,
    name: seo.siteName,
    alternateName: 'KiboCode Software',
    description: seo.description,
    url: `${siteUrl}/`,
    logo: `${siteUrl}${seo.image}`,
    image: `${siteUrl}${seo.image}`,
    email: siteConfig.contactEmail,
    telephone: siteConfig.whatsapp.display,
    priceRange: '$$',
    founder: {
      '@type': 'Person',
      name: siteConfig.legal.ownerName,
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
    },
    areaServed: seo.areaServed.map((name) => ({ '@type': 'Place', name })),
    knowsLanguage: ['es'],
    sameAs: [`https://wa.me/${siteConfig.whatsapp.number}`],
    /* Catálogo de servicios: le dice al buscador qué vendemos exactamente. */
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de desarrollo de software',
      itemListElement: seo.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@id': id },
          areaServed: 'CO',
        },
      })),
    },
  };
}

function website(organizationId) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#sitio`,
    url: `${siteUrl}/`,
    name: seo.siteName,
    description: seo.description,
    inLanguage: seo.lang,
    publisher: { '@id': organizationId },
  };
}

/**
 * FAQPage a partir de las preguntas reales de la landing. Es el esquema con
 * más probabilidad de generar resultados enriquecidos en Google.
 */
function faqPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqContent.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** Servicios descritos en la landing, por si se quieren reutilizar. */
export const serviceNames = servicesContent.items.map((item) => item.title);
