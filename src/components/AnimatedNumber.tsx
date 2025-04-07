import React, { useEffect, useState, useRef, useCallback } from 'react';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  label: string | JSX.Element;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export function AnimatedNumber({ end, duration = 3000, label, prefix = '', suffix = '', delay = 0 }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const runtime = timestamp - startTimeRef.current;
    const relativeProgress = runtime / duration;

    if (relativeProgress < 1) {
      const easeOutQuint = 1 - Math.pow(1 - relativeProgress, 5);
      const currentValue = Math.min(Math.floor(easeOutQuint * end), end);
      
      setCount(currentValue);
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
    }
  }, [end, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      startTimeRef.current = null;
    };
  }, [isVisible, animate, delay]);

  return (
    <div ref={elementRef} className="text-center will-change-[transform,opacity] transform-gpu">
      <div className="lg:text-5xl text-3xl font-light text-white flex items-baseline justify-center">
        <span className="text-white/90">{prefix}</span>
        <span>{count}</span>
        <span className="text-white/90 ml-0.5">{suffix}</span>
      </div>
      <div className="mt-4">{label}</div>
    </div>
  );
}