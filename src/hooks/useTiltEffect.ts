import { useState, useRef, MouseEvent, CSSProperties } from 'react';

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
}

export function useTiltEffect(options: TiltOptions = {}) {
  const { maxTilt = 8, perspective = 1000, scale = 1.02, speed = 400 } = options;
  const elementRef = useRef<HTMLDivElement | null>(null);

  const [style, setStyle] = useState<CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: 'preserve-3d',
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
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
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
      transformStyle: 'preserve-3d',
    });
  };

  return {
    ref: elementRef,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}
