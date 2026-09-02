import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Desplaza su contenido a distinta velocidad que la página.
 *
 * Es lo que da profundidad: si el fondo, la atmósfera y el contenido se
 * mueven todos igual, el ojo lee un solo plano. Separándolos, lee distancia.
 *
 * `speed` mueve un porcentaje de la propia altura del elemento — sirve para
 * bloques de contenido. `pixels` mueve una distancia fija, que es lo que
 * necesitan las capas de fondo posicionadas en absoluto, donde el porcentaje
 * depende de un alto que no controlamos.
 *
 * Valor positivo = se queda atrás (más lejos). Negativo = se adelanta (más
 * cerca). Pasarse de 0,3 o de 200 px marea.
 */
export function Parallax({ children, speed = 0.2, pixels, className = '' }) {
  const scope = useGsapContext(() => {
    const destino = pixels == null ? { yPercent: speed * 100 } : { y: pixels };

    gsap.to(scope.current, {
      ...destino,
      ease: 'none',
      scrollTrigger: {
        trigger: scope.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, [speed, pixels]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
