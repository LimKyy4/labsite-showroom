import React, { useEffect, useState, useRef } from 'react';

interface RollingCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // in milliseconds
  formatNumber?: boolean;
  className?: string;
}

export const RollingCounter: React.FC<RollingCounterProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1200,
  formatNumber = true,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef(0);
  const containerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animFrame: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const startTime = performance.now();
          const startValue = prevValueRef.current;
          const endValue = value;
          const animDuration = startValue === 0 ? duration : Math.min(duration, 450);

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / animDuration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(startValue + (endValue - startValue) * easeOut);
            setDisplayValue(current);

            if (progress < 1) {
              animFrame = requestAnimationFrame(step);
            } else {
              setDisplayValue(endValue);
              prevValueRef.current = endValue;
            }
          };

          animFrame = requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [value, duration]);

  const formatted = formatNumber
    ? displayValue.toLocaleString('id-ID')
    : String(displayValue);

  return (
    <span ref={containerRef} className={`font-mono tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};
