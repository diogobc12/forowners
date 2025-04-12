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
  const animationRef = useRef<{ startTime: number; endTime: number; }>({ startTime: 0, endTime: 0 });
  
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
      cancelAnimationFrame(timerRef.current);
      timerRef.current = null;
    }
    
    // Reset inicial
    setDisplayValue(0);
    
    // Usa timestamp para melhor performance
    animationRef.current.startTime = performance.now();
    animationRef.current.endTime = animationRef.current.startTime + duration;
    
    const animate = (timestamp: number) => {
      const { startTime, endTime } = animationRef.current;
      
      // Calcula progresso baseado no tempo decorrido
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Função de easing para suavizar a animação no final
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);
      
      // Calcula e atualiza valor
      const value = Math.floor(easedProgress * end);
      setDisplayValue(value);
      
      // Continua animação se não concluída
      if (progress < 1) {
        timerRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    
    timerRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
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