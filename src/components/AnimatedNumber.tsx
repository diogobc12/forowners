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
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
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
    
    // Force numbers to increment exactly one by one
    let currentValue = 0;
    
    // Function to animate the counter using individual increments of 1
    const animateCounter = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      
      // Calculate how many numbers we should have counted up to by now
      // This is based on a linear progression through the duration
      const targetValue = Math.min(
        end,
        Math.floor((elapsed / duration) * end)
      );
      
      // If we need to increase the displayed value by exactly 1
      if (currentValue < targetValue) {
        currentValue += 1;
        setDisplayValue(currentValue);
      }
      
      // Continue animation if we haven't reached the end value
      if (currentValue < end) {
        animationFrameRef.current = requestAnimationFrame(animateCounter);
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