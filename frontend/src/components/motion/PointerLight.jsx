import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * El halo violeta de la portada, siguiendo al puntero.
 *
 * En el sistema visual el violeta no es pintura, es luz: sale de la marca e
 * ilumina las curvas de nivel del fondo. Una luz que no se mueve delata que
 * la escena es un dibujo plano; una que responde al puntero convierte la
 * portada en un espacio con relieve.
 *
 * El desplazamiento es del 10% de la distancia al centro y con casi un
 * segundo de amortiguación: se nota, pero nadie lo persigue con el ratón.
 *
 * `quickTo` en vez de un tween por evento — reutiliza el mismo y es lo que
 * hace que esto no cueste nada aunque `pointermove` dispare cien veces por
 * segundo. En pantallas táctiles no hay puntero que seguir, así que ni se
 * engancha el listener.
 */
export function PointerLight({ className = '' }) {
  const scope = useGsapContext(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined;
    }

    const luz = scope.current.firstElementChild;
    const moverX = gsap.quickTo(luz, 'x', { duration: 0.9, ease: 'power3' });
    const moverY = gsap.quickTo(luz, 'y', { duration: 0.9, ease: 'power3' });

    const seguir = (evento) => {
      const caja = scope.current.getBoundingClientRect();
      moverX((evento.clientX - caja.left - caja.width / 2) * 0.1);
      moverY((evento.clientY - caja.top - caja.height / 2) * 0.1);
    };

    window.addEventListener('pointermove', seguir, { passive: true });
    return () => window.removeEventListener('pointermove', seguir);
  });

  return (
    <div ref={scope} aria-hidden="true" className={className}>
      <div className="glow-mark absolute -top-40 right-[-18%] h-[560px] w-[560px] blur-3xl md:right-[2%] md:h-[760px] md:w-[760px]" />
    </div>
  );
}
