import React, { useEffect, useRef, useCallback } from 'react';
import { Palette, Code, Layout, Monitor, Smartphone, Layers, Eye, Zap } from 'lucide-react';

export const HeroAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const lastAnimationTime = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    // Throttling básico usando tempo para limitar os cálculos
    const now = Date.now();
    if (now - lastAnimationTime.current < 50) { // 50ms throttle (20fps é suficiente para esta animação)
      return;
    }
    lastAnimationTime.current = now;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Calculate mouse position relative to container center
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Only update if mouse position changed significantly
    if (Math.abs(mouseX - lastMousePosition.current.x) < 10 && 
        Math.abs(mouseY - lastMousePosition.current.y) < 10) {
      return;
    }

    lastMousePosition.current = { x: mouseX, y: mouseY };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const items = container.querySelectorAll('.animated-item');
      items.forEach((item) => {
        const element = item as HTMLElement;
        const speed = parseFloat(element.getAttribute('data-speed') || '0.05');
        
        const x = mouseX * speed;
        const y = mouseY * speed;
        
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden will-change-transform"
    >
      {/* Website mockup in the center */}
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 animated-item will-change-transform"
        data-speed="0.02"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        <div className="w-64 h-48 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg shadow-2xl p-1 opacity-90">
          <div className="w-full h-6 bg-gray-800 rounded-t-sm flex items-center px-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="w-full h-[calc(100%-1.5rem)] bg-gray-900 p-2">
            <div className="w-full h-4 bg-gray-700 rounded mb-2"></div>
            <div className="w-3/4 h-4 bg-gray-700 rounded mb-3"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 bg-gray-800 rounded"></div>
              <div className="h-10 bg-gray-800 rounded"></div>
              <div className="h-10 bg-gray-800 rounded"></div>
              <div className="h-10 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile mockup */}
      <div 
        className="absolute top-1/2 right-10 transform -translate-y-1/2 z-20 animated-item" 
        data-speed="0.05"
      >
        <div className="w-24 h-40 bg-gray-800 rounded-xl shadow-xl flex flex-col items-center overflow-hidden">
          <div className="w-10 h-2 bg-gray-700 rounded-b-xl mb-1"></div>
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-300 p-1">
            <div className="w-full h-full bg-gray-900 p-1 flex flex-col space-y-1">
              <div className="w-full h-2 bg-gray-700 rounded"></div>
              <div className="w-2/3 h-2 bg-gray-700 rounded"></div>
              <div className="w-full h-6 bg-gray-800 rounded"></div>
              <div className="w-full h-6 bg-gray-800 rounded"></div>
              <div className="w-full h-6 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements - reduzido para apenas os mais visíveis */}
      <div className="animated-item" data-speed="0.08" style={{position: 'absolute', top: '25%', left: '15%'}}>
        <div className="w-12 h-12 bg-blue-500/80 rounded-full flex items-center justify-center shadow-lg">
          <Layout className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="animated-item" data-speed="0.06" style={{position: 'absolute', top: '30%', right: '20%'}}>
        <div className="w-14 h-14 bg-indigo-500/80 rounded-full flex items-center justify-center shadow-lg">
          <Code className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="animated-item" data-speed="0.07" style={{position: 'absolute', top: '15%', left: '45%'}}>
        <div className="w-12 h-12 bg-teal-500/80 rounded-full flex items-center justify-center shadow-lg">
          <Layers className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="animated-item" data-speed="0.06" style={{position: 'absolute', bottom: '15%', left: '40%'}}>
        <div className="w-10 h-10 bg-blue-600/80 rounded-full flex items-center justify-center shadow-lg">
          <Zap className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Connection lines (SVG) - simplificado */}
      <svg className="absolute inset-0 w-full h-full z-5 opacity-40 pointer-events-none" style={{strokeDasharray: '5,5'}}>
        <line x1="35%" y1="30%" x2="45%" y2="15%" className="stroke-cyan-400/50" strokeWidth="1" />
        <line x1="35%" y1="30%" x2="70%" y2="30%" className="stroke-blue-400/50" strokeWidth="1" />
        <line x1="35%" y1="30%" x2="40%" y2="85%" className="stroke-indigo-400/50" strokeWidth="1" />
      </svg>
    </div>
  );
}; 