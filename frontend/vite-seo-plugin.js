import { seo, siteUrl } from './src/config/seo.config.js';
import { buildStructuredData } from './src/config/structured-data.js';

/**
 * Inyecta el SEO en `index.html` durante la compilación y genera
 * `robots.txt` y `sitemap.xml`.
 *
 * Se hace en tiempo de build y no desde React a propósito: así las etiquetas
 * y los datos estructurados están en el HTML que se sirve, y los ven también
 * los rastreadores que no ejecutan JavaScript (los de redes sociales, entre
 * otros).
 */
export function seoPlugin() {
  return {
    name: 'kibocode-seo',

    transformIndexHtml() {
      const canonical = `${siteUrl}/`;
      const image = `${siteUrl}${seo.image}`;

      return [
        meta({ name: 'description', content: seo.description }),
        meta({ name: 'robots', content: 'index, follow, max-image-preview:large' }),
        meta({ name: 'author', content: seo.siteName }),
        { tag: 'link', attrs: { rel: 'canonical', href: canonical }, injectTo: 'head' },

        /* Open Graph — WhatsApp, LinkedIn, Facebook */
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:site_name', content: seo.siteName }),
        meta({ property: 'og:locale', content: seo.locale }),
        meta({ property: 'og:url', content: canonical }),
        meta({ property: 'og:title', content: seo.title }),
        meta({ property: 'og:description', content: seo.socialDescription }),
        meta({ property: 'og:image', content: image }),
        meta({ property: 'og:image:alt', content: seo.imageAlt }),
        meta({ property: 'og:image:width', content: '192' }),
        meta({ property: 'og:image:height', content: '192' }),

        /* Twitter / X */
        meta({ name: 'twitter:card', content: 'summary' }),
        meta({ name: 'twitter:title', content: seo.title }),
        meta({ name: 'twitter:description', content: seo.socialDescription }),
        meta({ name: 'twitter:image', content: image }),

        /* Datos estructurados */
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(buildStructuredData()),
          injectTo: 'head',
        },
      ];
    },

    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() });
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() });
    },
  };
}

function meta(attrs) {
  return { tag: 'meta', attrs, injectTo: 'head' };
}

function robotsTxt() {
  const lines = ['User-agent: *', 'Allow: /'];
  seo.disallow.forEach((path) => lines.push(`Disallow: ${path}`));
  lines.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  return lines.join('\n');
}

function sitemapXml() {
  const today = new Date().toISOString().slice(0, 10);

  // Cada URL declara sus traducciones: es lo que evita que las versiones en
  // distintos idiomas compitan entre sí como contenido duplicado.
  const urls = seo.pages
    .map((page) => {
      const alternates = seo.pages
        .filter((otra) => otra.group === page.group)
        .map(
          (otra) =>
            `    <xhtml:link rel="alternate" hreflang="${otra.lang}" href="${siteUrl}${otra.path}"/>`,
        )
        .join('\n');

      return `  <url>
    <loc>${siteUrl}${page.path}</loc>
${alternates}
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
