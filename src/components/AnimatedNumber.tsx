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
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const previousTimestampRef = useRef<number | null>(null);
  const accumulatedDelayRef = useRef<number>(0);
  
  // Verifica se é dispositivo móvel e ajusta duração
  const isMobile = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }, []);
  
  // Ajusta a duração para mobile (mais rápido) e desktop
  const actualDuration = useMemo(() => {
    return isMobile ? Math.min(1500, duration / 1.8) : duration;
  }, [duration, isMobile]);
  
  // Ajusta o intervalo para evitar bugs em dispositivos mais lentos
  const throttleInterval = useMemo(() => {
    return isMobile ? 12 : 0; // 12ms throttle em mobile para performance melhor
  }, [isMobile]);
  
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
    
    // Cancel any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Reset to start
    setDisplayValue(0);
    startTimeRef.current = null;
    previousTimestampRef.current = null;
    accumulatedDelayRef.current = 0;
    
    // Force numbers to increment exactly one by one
    let currentValue = 0;
    
    // Function to animate the counter using individual increments of 1
    const animateCounter = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
        previousTimestampRef.current = timestamp;
      }
      
      // Calcula o tempo decorrido
      const elapsed = timestamp - startTimeRef.current;
      
      // Limita a taxa de atualização para evitar bugs em dispositivos móveis
      const deltaTime = timestamp - (previousTimestampRef.current || timestamp);
      accumulatedDelayRef.current += deltaTime;
      
      // Se estiver usando throttle, verifica se passou tempo suficiente
      if (throttleInterval > 0 && accumulatedDelayRef.current < throttleInterval) {
        previousTimestampRef.current = timestamp;
        animationFrameRef.current = requestAnimationFrame(animateCounter);
        return;
      }
      
      // Reseta o acumulador de atraso
      accumulatedDelayRef.current = 0;
      previousTimestampRef.current = timestamp;
      
      // Calcula o incremento de forma dinâmica com base no número final
      // Números menores têm incremento menor para manter animação suave
      const increment = end > 100 ? Math.max(1, Math.floor(end / 60)) : 1;
      
      // Calcula o valor alvo com base no tempo decorrido
      const targetValue = Math.min(
        end,
        Math.floor((elapsed / actualDuration) * end)
      );
      
      // Se precisamos aumentar o valor exibido
      if (currentValue < targetValue) {
        // Incrementa pelo valor calculado, mas não ultrapassa o targetValue
        currentValue = Math.min(currentValue + increment, targetValue);
        setDisplayValue(currentValue);
      }
      
      // Continua a animação se não alcançamos o valor final
      if (currentValue < end) {
        animationFrameRef.current = requestAnimationFrame(animateCounter);
      } else {
        // Garante que o valor final seja exatamente igual ao esperado
        setDisplayValue(end);
      }
    };
    
    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animateCounter);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [hasStarted, end, actualDuration, throttleInterval]);
  
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