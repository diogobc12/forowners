import React, { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedNumber({ end, duration = 2000, label, prefix = '', suffix = '' }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
  }, [end, duration]);

  return (
    <div className="text-center p-8">
      <div className="text-5xl font-bold mb-2 text-white">
        {prefix}{count}{suffix}
      </div>
      <div className="text-white/80">{label}</div>
    </div>
  );
}