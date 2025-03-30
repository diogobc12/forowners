import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../components/data/testimonials';

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === (isMobile ? testimonials.flat().length - 1 : testimonials.length - 1) ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="bg-gradient-to-b from-[#000000] to-[#050725] text-white flex flex-col items-center justify-center pb-20 pt-40 lg:py-40">
      <div className="max-w-7xl mx-8 text-center mb-12">
        <h2 className="lg:text-5xl text-3xl font-bold mb-4">What Clients Say</h2>
        <p className="text-gray-300">
          Don't just take our word for it. Here's what our clients have to say about our work.
        </p>
      </div>

      <div className="relative w-full max-w-[90%] overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {isMobile
            ? testimonials.flat().map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-[#050725] p-6 md:p-8 rounded-2xl shadow-2xl">
                    <Quote className="text-cyan-400 w-6 h-6 mb-4" />
                    <p className="text-base md:text-lg mb-6">{testimonial.text}</p>
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))
            : testimonials.map((slideGroup, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {slideGroup.map((testimonial, index) => (
                      <div key={index} className="bg-[#050725] p-6 md:p-8 rounded-2xl shadow-2xl">
                        <Quote className="text-cyan-400 w-6 h-6 mb-4" />
                        <p className="text-base md:text-lg mb-6">{testimonial.text}</p>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {(isMobile ? testimonials.flat() : testimonials).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full duration-300 ${
                currentIndex === index ? 'bg-cyan-400' : 'bg-gray-600'
              } hover:bg-cyan-300`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}