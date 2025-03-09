import React from 'react';

export function GlobeAnimation() {
  return (
    <div className="relative w-full h-[400px] bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center overflow-hidden">
      <div className="absolute w-48 h-48 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="relative">
        <div className="w-64 h-64 border-4 border-cyan-500/50 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-blue-500/50 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-cyan-400/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
      </div>
    </div>
  );
}