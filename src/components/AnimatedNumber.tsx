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
  
  // Verifica se é dispositivo móvel - usando uma abordagem mais leve
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }, []);
  
  // Valores otimizados para performance vs. suavidade visual
  const { actualDuration, totalSteps, stepSize, intervalTime } = useMemo(() => {
    // Em dispositivos móveis, usamos sempre uma animação mais rápida
    const actualDuration = isMobile ? Math.min(800, duration / 3) : duration;
    
    // Reduzimos o número de steps para valores maiores
    const totalSteps = end <= 10 ? end : Math.min(20, Math.ceil(end / (isMobile ? 10 : 5)));
    
    const stepSize = Math.ceil(end / totalSteps);
    const intervalTime = actualDuration / totalSteps;
    
    return { actualDuration, totalSteps, stepSize, intervalTime };
  }, [end, duration, isMobile]);
  
  useEffect(() => {
    // Se o IntersectionObserver não for suportado, inicie a animação imediatamente após o delay
    if (typeof IntersectionObserver === 'undefined') {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(timer);
    }

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
    
    // Usa setInterval com intervalos maiores em dispositivos móveis
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
    <div ref={elementRef} className="text-center">
      <div 
        className="lg:text-5xl text-3xl font-light text-white flex items-baseline justify-center"
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