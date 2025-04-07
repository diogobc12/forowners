import React, { useEffect, useState, useRef, memo, useMemo } from 'react';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  label: React.ReactNode;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

function AnimatedNumberBase({ 
  end, 
  duration = 1000, 
  label, 
  prefix = '', 
  suffix = '', 
  delay = 0 
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }, []);
  
  const actualDuration = useMemo(() => {
    return isMobile ? Math.min(1000, duration / 2.5) : duration;
  }, [duration, isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => {
            setHasStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let frameId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / actualDuration, 1);
      const currentValue = Math.round(end * progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end); // Garantir valor final
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [hasStarted, end, actualDuration]);

  return (
    <div ref={elementRef} className="text-center" aria-live="polite">
      <div 
        className="lg:text-5xl text-3xl font-light text-white flex items-baseline justify-center"
        role="text"
        aria-label={`${prefix}${displayValue}${suffix}`}
      >
        <span className="text-white/90">{prefix}</span>
        <span>{displayValue}</span>
        <span className="text-white/90 ml-0.5">{suffix}</span>
      </div>
      <div className="mt-4">{label}</div>
    </div>
  );
}

export const AnimatedNumber = memo(AnimatedNumberBase);
