import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  text: string;
  author: string;
}

export function Testimonial({ text, author }: TestimonialProps) {
  return (
    <div className="bg-slate-900 md:p-8 p-6 rounded-2xl relative">
      <Quote className="md:w-8 md:h-8 w-6 h-8 text-cyan-400 mb-4" />
      <p className="text-slate-300 mb-4">{text}</p>
      <p className="font-semibold">{author}</p>
    </div>
  );
}