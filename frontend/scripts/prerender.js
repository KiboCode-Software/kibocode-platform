/**
 * Pre-renderiza las páginas públicas a HTML estático.
 *
 * Se ejecuta después de `vite build`: toma el bundle de servidor, renderiza
 * cada ruta y escribe el resultado dentro de `<div id="root">` del HTML
 * compilado. Los rastreadores reciben así el contenido completo sin ejecutar
 * JavaScript; en el navegador, React hidrata ese mismo marcado.
 *
 * Además reescribe los metadatos por página. La plantilla que produce Vite
 * lleva los de la portada, y si todas las páginas los comparten, los
 * buscadores las consideran duplicadas y solo indexan una.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { seo, siteUrl } from '../src/config/seo.config.js';

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

    // Archivo plano (`privacidad.html`) en vez de carpeta con índice: nginx
    // lo sirve directo en `/privacidad`, sin la redirección a `/privacidad/`
    // que dejaría el sitemap apuntando a una URL que redirige.
    const file = page.path === '/' ? 'index.html' : `${page.path.replace(/^\//, '')}.html`;
    const target = join(DIST, file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');
    console.log(`  pre-renderizado  ${page.path.padEnd(14)} → dist/${file}`);
  }

  await rm(SSR_DIST, { recursive: true, force: true });
}

/** Sustituye título, descripción y URLs canónicas por las de esta página. */
function applyMeta(html, page) {
  const url = `${siteUrl}${page.path}`;
  const title = escape(page.title);
  const description = escape(page.description);

  let output = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${description}">`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*">/,
      `<link rel="canonical" href="${url}">`,
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
    );

  // Los datos estructurados describen la empresa y sus preguntas frecuentes:
  // solo tienen sentido en la portada.
  if (!page.structuredData) {
    output = output.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      '',
    );
  }

  return output;
}

function escape(text) {
  return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

main().catch((error) => {
  console.error('\nFalló el pre-renderizado:\n', error);
  process.exit(1);
});
