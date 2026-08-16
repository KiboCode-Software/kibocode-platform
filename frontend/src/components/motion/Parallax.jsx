import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Desplaza su contenido a distinta velocidad que la página.
 *
 * `speed` positivo = se mueve más lento que el scroll (queda "atrás");
 * negativo = más rápido (queda "adelante"). Valores pequeños (0.1–0.3)
 * son los que dan profundidad sin marear.
 */
export function Parallax({ children, speed = 0.2, className = '' }) {
  const scope = useGsapContext(() => {
    gsap.to(scope.current, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
