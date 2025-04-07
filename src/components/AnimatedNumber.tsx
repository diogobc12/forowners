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
  duration = 2000, 
  label, 
  prefix = '', 
  suffix = '', 
  delay = 0 
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<number>(0);
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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    // Calculate step size based on number size
    const stepSize = end <= 40 ? 1 : Math.max(1, Math.ceil(end / 40));
    // Ensure we have at least 10 steps for smooth animation
    const steps = Math.min(end, Math.max(10, end / stepSize));
    // Calculate interval time for smooth animation
    const intervalTime = Math.floor(duration / steps);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Reset to start
    setDisplayValue(0);
    stepRef.current = 0;
    
    // Start the interval for counting
    timerRef.current = window.setInterval(() => {
      stepRef.current += stepSize;
      
      // If we've reached or exceeded the target, set final value and clear interval
      if (stepRef.current >= end) {
        setDisplayValue(end);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        setDisplayValue(stepRef.current);
      }
    }, intervalTime);
    
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