/**
 * Pre-renderiza las páginas públicas a HTML estático.
 *
 * Se ejecuta después de `vite build`: toma el bundle de servidor, renderiza
 * cada ruta y escribe el resultado dentro de `<div id="root">` del HTML
 * compilado. Los rastreadores reciben así el contenido completo sin ejecutar
 * JavaScript; en el navegador, React hidrata ese mismo marcado.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST = join(ROOT, 'dist');
const SSR_DIST = join(ROOT, '.ssr');

/* Solo las páginas públicas: la plataforma interna no debe pre-renderizarse
   (es privada y depende de la sesión del navegador). */
const PAGES = [
  { path: '/', file: 'index.html' },
  { path: '/privacidad', file: 'privacidad/index.html' },
];

async function main() {
  const { render } = await import(pathToFileURL(join(SSR_DIST, 'entry-server.js')).href);
  const template = await readFile(join(DIST, 'index.html'), 'utf8');

  if (!template.includes('<div id="root"></div>')) {
    throw new Error('No se encontró <div id="root"></div> en dist/index.html');
  }

  for (const page of PAGES) {
    const html = render(page.path);
    const output = template.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>`,
    );

    const target = join(DIST, page.file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, output, 'utf8');
    console.log(`  pre-renderizado  ${page.path.padEnd(14)} → dist/${page.file}`);
  }

  // El bundle de servidor solo servía para esto.
  await rm(SSR_DIST, { recursive: true, force: true });
}

main().catch((error) => {
  console.error('\nFalló el pre-renderizado:\n', error);
  process.exit(1);
});
