import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  rating: number;
  company: string;
}

const testimonials: Testimonial[] = [
  { id: 1, text: "The level of professionalism and expertise they brought to our project was outstanding. They delivered beyond our expectations.", author: "Raden Torth", role: "Founder", rating: 5, company: "French 'G" },
  { id: 2, text: "Working with this team was a game-changer for our business. Their attention to detail and creative approach helped us stand out in a crowded market.", author: "Sarah Johnson", role: "Marketing Director", rating: 5, company: "Medal" },
  { id: 3, text: "Their innovative solutions and dedication to our success made all the difference. We've seen significant growth since working with them.", author: "Emma Rodriguez", role: "Founder", rating: 5, company: "Atlantic Jewels" },
  { id: 4, text: "The team's ability to understand our vision and translate it into a stunning digital presence was remarkable. They exceeded all our expectations.", author: "David Wilson", role: "CTO", rating: 5, company: "FitKet" },
  { id: 5, text: "From start to finish, the experience was seamless. Their expertise in web development and design helped us achieve our business goals.", author: "Lisa Anderson", role: "Product Manager", rating: 5, company: "Make it green" },
  { id: 6, text: "Working with this team transformed our online presence. Their strategic approach and technical expertise were invaluable to our success.", author: "Robert Taylor", role: "Operations Director", rating: 5, company: "Atlantic Jewels" }
];

const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => (
  <div className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-blue-300/10 transition-colors">
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-blue-300 fill-current" />
        ))}
      </div>
      <p className="text-base text-gray-400">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-400/5 flex items-center justify-center flex-shrink-0">
          <Quote className="w-5 h-5 text-blue-300" />
        </div>
        <div>
          <h4 className="text-white font-semibold text-sm">{testimonial.author}</h4>
          <p className="text-blue-300 text-xs">{testimonial.role}</p>
          <p className="text-gray-500 text-xs">{testimonial.company}</p>
        </div>
      </div>
    </div>
  </div>
));

export const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const maxIndex = useMemo(() => {
    return isMobile ? testimonials.length - 1 : Math.ceil(testimonials.length / 3) - 1;
  }, [isMobile]);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const getCurrentTestimonials = useCallback(() => {
    if (isMobile) return [testimonials[currentIndex]];
    const startIndex = currentIndex * 3;
    return testimonials.slice(startIndex, startIndex + 3);
  }, [currentIndex, isMobile]);

  return (
    <div className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="px-3 py-1 rounded-full bg-blue-500/5 text-blue-300 text-xs font-medium mb-3 inline-block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Clients</span> Say
          </h2>
          <div className="w-20 h-1 bg-blue-400/20 mx-auto"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 transition-all duration-300">
            <AnimatePresence mode="popLayout">
              {getCurrentTestimonials().map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  layout
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center mt-12 gap-4">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.03] hover:bg-blue-400/5 border border-white/5 hover:border-blue-300/10 flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-blue-300" />
            </button>

            <div className="flex gap-2">
              {[...Array(isMobile ? testimonials.length : Math.ceil(testimonials.length / 3))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to testimonial slide ${index + 1}`}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-300' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/[0.03] hover:bg-blue-400/5 border border-white/5 hover:border-blue-300/10 flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-blue-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};