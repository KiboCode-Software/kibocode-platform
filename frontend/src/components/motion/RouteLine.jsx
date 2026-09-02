import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * La traza de la ruta: una línea violeta que se dibuja al hacer scroll.
 *
 * Es el elemento firma de la página. La marca de KiboCode es una llave
 * apuntando a una cumbre — Kibo es la cima del Kilimanjaro — y la
 * metodología son tres campamentos de ese ascenso. La línea los une.
 *
 * El marcado la pinta COMPLETA y es la animación la que la lleva a cero
 * antes de empezar. Así, si GSAP no carga o el visitante pidió menos
 * movimiento, la traza se ve entera en vez de quedarse invisible — el
 * mismo criterio que usa `Counter` con su cifra.
 */
export function RouteLine({ axis = 'horizontal', className = '' }) {
  const vertical = axis === 'vertical';

  const scope = useGsapContext(() => {
    const fill = scope.current.firstElementChild;
    const property = vertical ? 'scaleY' : 'scaleX';

    gsap.fromTo(
      fill,
      { [property]: 0 },
      {
        [property]: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: scope.current,
          start: vertical ? 'top 75%' : 'top 85%',
          end: vertical ? 'bottom 60%' : 'bottom 55%',
          scrub: 0.4,
        },
      },
    );
  }, [axis]);

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden bg-ink-700 ${vertical ? 'w-px' : 'h-px'} ${className}`}
    >
      <div
        className="route-fill h-full w-full"
        style={{
          transformOrigin: vertical ? 'center top' : 'left center',
          '--route-direction': vertical ? 'to bottom' : 'to right',
        }}
      />
    </div>
  );
}
