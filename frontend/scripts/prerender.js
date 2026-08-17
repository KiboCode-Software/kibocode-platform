/**
 * Pre-renderiza las páginas públicas a HTML estático, una por idioma.
 *
 * Toma el bundle de servidor, renderiza cada ruta y escribe el resultado
 * dentro de `<div id="root">` del HTML compilado. Los rastreadores reciben
 * el contenido ya escrito sin ejecutar JavaScript; en el navegador, React
 * hidrata ese mismo marcado.
 *
 * Reescribe además los metadatos de cada página: título, descripción, URL
 * canónica, idioma y los enlaces `hreflang` que le dicen al buscador qué
 * versión mostrarle a quién. Sin ellos, las dos traducciones competirían
 * entre sí como si fueran contenido duplicado.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { seo, siteUrl } from '../src/config/seo.config.js';
import { LANGUAGES } from '../src/i18n/languages.js';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');
const SSR_DIST = join(ROOT, '.ssr');

async function main() {
  const { render } = await import(pathToFileURL(join(SSR_DIST, 'entry-server.js')).href);
  const template = await readFile(join(DIST, 'index.html'), 'utf8');

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('No se encontró <div id="root"></div> en dist/index.html');
  }

  for (const page of seo.pages) {
    const body = render(page.path);
    let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    html = applyMeta(html, page);

    // Archivo plano (`en/privacy.html`) para que nginx lo sirva en su URL
    // limpia, sin la redirección a la versión con barra final.
    const file = page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}.html`;
    const target = join(DIST, file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
    console.log(`  pre-renderizado  ${page.path.padEnd(14)} → dist/${file}`);
  }

  await rm(SSR_DIST, { recursive: true, force: true });
}

/** Sustituye los metadatos de la plantilla por los de esta página. */
function applyMeta(html, page) {
  const url = absolute(page.path);
  const title = escape(page.title);
  const description = escape(page.description);
  const idioma = LANGUAGES[page.lang];

  let output = html
    .replace(/<html lang="[^"]*"/, `<html lang="${idioma.htmlLang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
    )
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
    .replace(
      /<meta property="og:locale" content="[^"]*">/,
      `<meta property="og:locale" content="${idioma.ogLocale}">`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*">/,
      `<meta property="og:url" content="${url}">`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*">/,
      `<meta property="og:title" content="${title}">`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*">/,
      `<meta property="og:description" content="${description}">`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*">/,
      `<meta name="twitter:title" content="${title}">`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*">/,
      `<meta name="twitter:description" content="${description}">`,
    )
    .replace('</head>', `${hreflangTags(page)}</head>`);

  // Los datos estructurados describen la empresa y sus preguntas frecuentes:
  // solo tienen sentido en la portada.
  if (!page.structuredData) {
    output = output.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  }

  return output;
}

/**
 * Enlaces entre traducciones de la misma página. `x-default` marca cuál
 * servir a quien no encaje en ningún idioma declarado.
 */
function hreflangTags(page) {
  const hermanas = seo.pages.filter((otra) => otra.group === page.group);
  const etiquetas = hermanas.map(
    (otra) =>
      `<link rel="alternate" hreflang="${LANGUAGES[otra.lang].htmlLang}" href="${absolute(otra.path)}">`,
  );

  const porDefecto = hermanas.find((otra) => otra.lang === 'es') || hermanas[0];
  etiquetas.push(
    `<link rel="alternate" hreflang="x-default" href="${absolute(porDefecto.path)}">`,
  );

  return `${etiquetas.join('')}`;
}

function absolute(path) {
  return `${siteUrl}${path}`;
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

main().catch((error) => {
  console.error('\nFalló el pre-renderizado:\n', error);
  process.exit(1);
});
