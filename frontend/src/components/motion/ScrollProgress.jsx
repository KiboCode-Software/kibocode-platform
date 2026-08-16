import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/** Barra fina bajo el navbar que marca el avance de lectura de la página. */
export function ScrollProgress() {
  const scope = useGsapContext(() => {
    gsap.to(scope.current.firstElementChild, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  });

  return (
    <div ref={scope} className="absolute inset-x-0 bottom-0 h-px bg-transparent">
      <div className="scroll-progress h-full w-full bg-linear-to-r from-silver-500 to-silver-200" />
    </div>
  );
}
