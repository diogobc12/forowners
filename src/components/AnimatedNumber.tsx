import React, { useEffect, useState, useRef } from 'react';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  label: string | JSX.Element;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({ end, duration = 3000, label, prefix = '', suffix = '' }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, isVisible]);

  return (
    <div ref={elementRef} className="text-center">
      <div className="lg:text-5xl text-3xl font-light text-white flex items-baseline justify-center">
        <span className="text-white/90">{prefix}</span>
        <span>{count}</span>
        <span className="text-white/90">{suffix}</span>
      </div>
      <div className="mt-4">{label}</div>
    </div>
  );
}