import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Campo de luz violeta que recorre la página entera por detrás.
 *
 * Va fijo al viewport, no dentro de una sección, para que sea una sola
 * atmósfera continua: las secciones son translúcidas y la luz pasa por
 * debajo de todas. Es lo que hace que la página deje de ser una pila de
 * planos oscuros y pase a ser un espacio con algo encendido dentro.
 *
 * Tres focos con recorridos, tamaños y duraciones distintos y sin múltiplo
 * común: nunca vuelven a coincidir, así que el movimiento no se repite a la
 * vista aunque el bucle sea infinito.
 *
 * Además reaccionan a la velocidad del scroll — se estiran y se avivan
 * cuando bajas rápido — y ese es el enganche entre la atmósfera y lo que
 * está haciendo el visitante.
 */
const FOCOS = [
  {
    clase: 'left-[-15%] top-[6%] h-[62vh] w-[62vh] md:h-[75vh] md:w-[75vh]',
    color: 'rgb(168 85 247 / 0.30)',
    recorrido: { x: 220, y: 140, duracion: 19 },
  },
  {
    clase: 'right-[-12%] top-[38%] h-[70vh] w-[70vh] md:h-[85vh] md:w-[85vh]',
    color: 'rgb(109 40 217 / 0.34)',
    recorrido: { x: -260, y: -180, duracion: 23 },
  },
  {
    clase: 'left-[25%] bottom-[-18%] h-[55vh] w-[55vh] md:h-[68vh] md:w-[68vh]',
    color: 'rgb(217 187 255 / 0.16)',
    recorrido: { x: 180, y: -150, duracion: 29 },
  },
];

export function AuroraField() {
  const scope = useGsapContext((self, gsapLocal) => {
    const focos = scope.current.querySelectorAll('[data-foco]');

    focos.forEach((foco, indice) => {
      const { x, y, duracion } = FOCOS[indice].recorrido;
      gsapLocal.to(foco, {
        x,
        y,
        scale: 1.25,
        duration: duracion,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // La velocidad del scroll estira el campo y lo aviva. `quickSetter` no
    // crea un tween por fotograma; el amortiguador devuelve el valor a su
    // reposo cuando el scroll para.
    const estado = { energia: 0 };
    const aplicar = gsapLocal.quickSetter(scope.current, 'css');

    gsapLocal.ticker.add(() => {
      aplicar({
        scaleY: 1 + estado.energia * 0.22,
        opacity: 1 + estado.energia * 0.9,
      });
    });

    let ultimo = window.scrollY;
    const alDesplazar = () => {
      const delta = Math.abs(window.scrollY - ultimo);
      ultimo = window.scrollY;
      const objetivo = Math.min(delta / 90, 1);
      if (objetivo > estado.energia) {
        gsapLocal.to(estado, { energia: objetivo, duration: 0.15, overwrite: true });
        gsapLocal.to(estado, { energia: 0, duration: 1.1, delay: 0.15, ease: 'power2.out' });
      }
    };

    window.addEventListener('scroll', alDesplazar, { passive: true });
    return () => window.removeEventListener('scroll', alDesplazar);
  });

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {FOCOS.map((foco) => (
        <span
          key={foco.clase}
          data-foco
          className={`absolute rounded-full blur-[90px] md:blur-[130px] ${foco.clase}`}
          style={{
            background: `radial-gradient(circle at center, ${foco.color}, transparent 68%)`,
          }}
        />
      ))}
    </div>
  );
}
