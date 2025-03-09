import React from 'react';

export function PerformanceAnimation() {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl flex items-center justify-center overflow-hidden">
      <div className="space-y-4 w-full px-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-[growWidth_4s_ease-in-out_infinite]"
              style={{ 
                animationDelay: `${i * 0.5}s`,
                width: `${85 - (i * 15)}%`
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}