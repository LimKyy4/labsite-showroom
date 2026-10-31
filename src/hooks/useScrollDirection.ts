import { useState, useEffect } from 'react';

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let ticking = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      setIsAtTop(scrollY < 30);

      if (Math.abs(scrollY - lastScrollY) < 8) {
        ticking = false;
        return;
      }

      setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;

      // Automatically reveal dock when scrolling stops (idle threshold)
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setScrollDirection('up');
      }, 750);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return { scrollDirection, isAtTop };
}
