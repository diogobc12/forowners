import React, { useEffect, useState, useRef, memo } from 'react';

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
  const timerRef = useRef<number | null>(null);
  
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
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    // Limpa timers anteriores
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset inicial
    setDisplayValue(0);
    let currentValue = 0;
    
    // Intervalo fixo de 50ms para garantir suavidade
    const interval = 50;
    // Calcula o incremento baseado na duração total
    const increment = Math.max(1, Math.ceil(end / (duration / interval)));
    
    timerRef.current = window.setInterval(() => {
      currentValue = Math.min(currentValue + increment, end);
      setDisplayValue(currentValue);
      
      if (currentValue >= end) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setDisplayValue(end);
      }
    }, interval);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [hasStarted, end, duration]);
  
  return (
    <div ref={elementRef} className="text-center" aria-live="polite">
      <div 
        className="lg:text-5xl text-3xl font-light text-white flex items-baseline justify-center"
        role="text"
        aria-label={`${prefix}${displayValue}${suffix}`}
      >
        <span className="text-white/90 font-bold">{prefix}</span>
        <span className="font-bold">{displayValue}</span>
        <span className="text-white/90 ml-0.5 font-bold">{suffix}</span>
      </div>
      <div className="mt-4">{label}</div>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export const AnimatedNumber = memo(AnimatedNumberBase);