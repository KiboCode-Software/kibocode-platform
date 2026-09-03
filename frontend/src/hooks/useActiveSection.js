import { useEffect, useState } from 'react';

/**
 * Devuelve el ancla de la sección que el visitante está leyendo.
 *
 * Deliberadamente sin GSAP y sin comprobar `prefers-reduced-motion`: esto no
 * es decoración, es orientación. Saber en qué parte de la página estás tiene
 * que funcionar igual para todo el mundo.
 *
 * `IntersectionObserver` con el margen inferior al -55% considera activa la
 * sección que ocupa la mitad superior de la pantalla, que es donde de verdad
 * está mirando alguien mientras baja. Sin ese margen, la sección siguiente se
 * daría por activa en cuanto asomara un píxel.
 */
export function useActiveSection(anchors) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const secciones = anchors
      .map((anchor) => document.getElementById(anchor.replace('#', '')))
      .filter(Boolean);

    if (!secciones.length) return undefined;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((entrada) => entrada.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    );

    secciones.forEach((seccion) => observador.observe(seccion));
    return () => observador.disconnect();
  }, [anchors.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}
