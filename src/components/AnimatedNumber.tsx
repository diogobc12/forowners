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
  duration = 2000, 
  label, 
  prefix = '', 
  suffix = '', 
  delay = 0 
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  
  // Verifica se é dispositivo móvel
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }, []);
  
  // Ajusta duração com base no dispositivo
  const actualDuration = useMemo(() => {
    return isMobile ? Math.min(1000, duration / 2.5) : duration;
  }, [duration, isMobile]);
  
  // Calcula número de steps com base no valor final
  const totalSteps = useMemo(() => {
    // Em dispositivos móveis, usamos menos steps para melhor performance
    if (isMobile) {
      return end <= 10 ? end : Math.min(20, Math.ceil(end / 5));
    }
    return end <= 10 ? end : Math.min(40, Math.ceil(end / 3));
  }, [end, isMobile]);
  
  // Calcula o valor de incremento e o intervalo
  const { stepSize, intervalTime } = useMemo(() => {
    const stepSize = Math.ceil(end / totalSteps);
    const intervalTime = actualDuration / totalSteps;
    return { stepSize, intervalTime };
  }, [end, totalSteps, actualDuration]);
  
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
    
    // Limpa timers anteriores
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset inicial
    setDisplayValue(0);
    let currentValue = 0;
    
    // Usa setInterval em vez de requestAnimationFrame para melhor controle em mobile
    timerRef.current = window.setInterval(() => {
      // Calcula o próximo valor
      currentValue = Math.min(currentValue + stepSize, end);
      setDisplayValue(currentValue);
      
      // Verifica se chegamos ao final
      if (currentValue >= end) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        
        // Garante que o valor final é exatamente o valor esperado
        setDisplayValue(end);
      }
    }, intervalTime);
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [hasStarted, end, stepSize, intervalTime]);
  
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

// Memoize component to prevent unnecessary re-renders
export const AnimatedNumber = memo(AnimatedNumberBase);