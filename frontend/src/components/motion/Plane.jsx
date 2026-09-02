import { gsap } from '../../lib/gsap.js';
import { useGsapContext } from '../../hooks/useGsap.js';

/**
 * Trata a su contenido como una placa en el espacio, no como un rectángulo
 * pegado a la pantalla.
 *
 * Dos comportamientos, los dos opcionales:
 *
 * `settle` — la placa entra inclinada y se endereza al subir por la pantalla.
 *   Es el gesto de algo que gira hacia ti hasta quedar de frente. Un momento
 *   orquestado, no un efecto suelto: se usa una sola vez en la página.
 *
 * `tilt` — la placa se inclina hacia el puntero. Máximo 6 grados: por encima
 *   de eso deja de leerse como profundidad y empieza a leerse como truco.
 *   Solo con ratón; en táctil no hay puntero al que inclinarse y el gesto se
 *   dispararía al arrastrar para hacer scroll.
 *
 * La perspectiva vive en el envoltorio y la rotación en el hijo, que es lo
 * que hace que la placa gire sobre su propio centro y no alrededor del punto
 * de fuga de la página.
 */
export function Plane({
  children,
  className = '',
  settle = false,
  tilt = false,
  max = 6,
}) {
  const scope = useGsapContext(() => {
    const placa = scope.current.firstElementChild;

    if (settle) {
      gsap.fromTo(
        placa,
        { rotationX: 9, y: 28, transformOrigin: '50% 100%' },
        {
          rotationX: 0,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: scope.current,
            start: 'top 92%',
            end: 'top 45%',
            scrub: 0.6,
          },
        },
      );
    }

    if (!tilt) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return undefined;
    }

    // `rotationX` / `rotationY`, no `rotateX`: son los nombres de GSAP.
    // Con los del CSS el tween corre sin error y no gira nada.
    const girarX = gsap.quickTo(placa, 'rotationX', { duration: 0.5, ease: 'power3' });
    const girarY = gsap.quickTo(placa, 'rotationY', { duration: 0.5, ease: 'power3' });

    const seguir = (evento) => {
      const caja = scope.current.getBoundingClientRect();
      const x = (evento.clientX - caja.left) / caja.width - 0.5;
      const y = (evento.clientY - caja.top) / caja.height - 0.5;
      girarX(-y * max * 2);
      girarY(x * max * 2);
      // El brillo especular se coloca donde está el puntero: es lo que
      // convierte la inclinación en una superficie iluminada.
      placa.style.setProperty('--brillo-x', `${(x + 0.5) * 100}%`);
      placa.style.setProperty('--brillo-y', `${(y + 0.5) * 100}%`);
    };

    const soltar = () => {
      girarX(0);
      girarY(0);
    };

    scope.current.addEventListener('pointermove', seguir);
    scope.current.addEventListener('pointerleave', soltar);
    return () => {
      scope.current?.removeEventListener('pointermove', seguir);
      scope.current?.removeEventListener('pointerleave', soltar);
    };
  }, [settle, tilt, max]);

  return (
    <div ref={scope} className={`perspectiva ${className}`}>
      {children}
    </div>
  );
}
