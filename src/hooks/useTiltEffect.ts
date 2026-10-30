import { useState, useRef, useEffect, MouseEvent, CSSProperties } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function useTiltEffect(options: TiltOptions = {}) {
  const { maxTilt = 7, perspective = 1000, scale = 1.015, speed = 400 } = options;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [canHover, setCanHover] = useState(false);
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      setCanHover(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const [style, setStyle] = useState<CSSProperties>({});

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canHover || !elementRef.current) return;
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const rotateX = ((y / height) - 0.5) * -maxTilt * 2;
    const rotateY = ((x / width) - 0.5) * maxTilt * 2;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 80ms ease-out',
      transformStyle: 'preserve-3d',
    });

    setSheenPos({
      x: Math.round((x / width) * 100),
      y: Math.round((y / height) * 100),
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      transformStyle: 'preserve-3d',
    });
    setSheenPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return {
    ref: elementRef,
    style: canHover ? style : {},
    sheenPos: canHover ? sheenPos : { x: 50, y: 50, opacity: 0 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    isTouchDevice: !canHover,
  };
}
