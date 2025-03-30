import React, { useEffect, useState } from 'react';
import { Globe2, Palette, Code2, MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { Testimonial } from './components/Testimonial';
import { ServiceCard } from './components/ServiceCard';
import { Navigation } from './components/Navigation';
import { PerformanceAnimation } from './components/PerformanceAnimation';
import './index.css'; // ou o caminho correto para o seu arquivo CSS
import ClientCarousel from './components/ClientCarousel';
import Footer from './components/Footer';
import { Forms } from './components/Forms';
import { AnimatedNumber } from './components/AnimatedNumber';

function AppCarousel() {
  return (
    <div className="">
      <ClientCarousel />
    </div>
  );
}

function TypewriterText() {
  const words = ['Brand', 'Presence', 'Design'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    if (!currentWord) return;

    const typeNextCharacter = () => {
      if (isTyping) {
        if (currentIndex < currentWord.length) {
          setDisplayText(currentWord.substring(0, currentIndex + 1));
          setCurrentIndex(prev => prev + 1);
        } else {
          setTimeout(() => {
            setIsTyping(false);
          }, 800);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentWord.substring(0, currentIndex - 1));
          setCurrentIndex(prev => prev - 1);
        } else {
          setTimeout(() => {
            setIsTyping(true);
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          }, 800);
        }
      }
    };

    const timeout = setTimeout(typeNextCharacter, 100);
    return () => clearTimeout(timeout);
  }, [currentIndex, isTyping, currentWordIndex]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
}


function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [])
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: <Palette className="md:w-8 md:h-8 w-6 h-6" />, title: 'Branding', description: 'Crafting a unique identity' },
    { icon: <Code2 className="md:w-8 md:h-8 w-6 h-6" />, title: 'Web Design', description: 'Sleek and intuitive interfaces' },
    { icon: <Globe2 className="md:w-8 md:h-8 w-6 h-6" />, title: 'Web Development', description: 'High-performance, scalable solutions' },
    { icon: <MapPin className="md:w-8 md:h-8 w-6 h-6" />, title: 'Google Maps Profile', description: 'Optimizing business visibility' },
  ];


  return (
    <div className="min-h-screen bg-[#050725] text-white">
      <div className='flex justify-center mx-2'>
      <Navigation scrolled={scrolled} />
      </div>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Empowering Your<br/>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                <TypewriterText />
                </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">Your brand, refined. Your website, perfected.</p>
            <a href="#contact" className="inline-flex  items-center px-5 py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-lg text-white font-semibold">
              Let's Talk <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
{/* Right Column - Animated Arrow */}
<div className="relative h-[500px] flex items-center justify-center hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/20 rounded-3xl blur-3xl"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 2s ease-out'
            }}
          />
          
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-8 opacity-20">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-[#60A5FA]/20 rounded-lg"></div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pb-20 bg-cover bg-gradient-to-t from-[#000000] to-[#050725]/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 mt-10">Our Services</h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            We provide comprehensive digital solutions to elevate your brand and online presence.
          </p>
          <div className="grid lg:grid-cols-4 gap-8 mx-4 lg:mx-0">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="grid md:grid-rows-3 gap-20 pt-20 pb-0 bg-no-repeat bg-cover bg-black bg-center justify-center " style={{ backgroundImage: "url('/bg3.jpeg')"}}>
        <div className="container mt-5 auto p-8 grid md:grid-cols-2 gap-12 items-center row-start-1 relative w-full bg-gradient-to-r from-[#060623]/50 via-[#000000]/60 to-[#060623]/50 md:rounded-2xl flex items-center justify-center overflow-hidden">
          <div>
            <h2 className="text-4xl font-bold mb-8 mt-7">Why Choose Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
                <p>Custom digital solutions for modern brands</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
                <p>Built for performance, design, and user experience</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
                <p>Trusted by businesses across multiple industries</p>
              </li>
              <li className="flex items-start">
                <ArrowRight className="w-6 h-6 text-cyan-400 mr-4 mt-1 flex-shrink-0" />
                <p>Our approach combines <span className="text-cyan-400">innovative design</span> with <span className="text-cyan-400">cutting-edge technology</span> to deliver solutions that not only meet but <span className="text-cyan-400">exceed expectations</span></p>
              </li>
            </ul>
          </div>
          <div>
            <PerformanceAnimation />
          </div>
        </div>
        <div>
          
        </div>

        <div className="container content-end row-start-3"> 
        <div className=''>
        <AppCarousel/>
        </div>
          </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className='bg-gradient-to-b from-[#000000] via-[#050725]/50 to-[#050725]'>
        <div className="container mx-auto min-h-screen  flex items-center justify-center p-4 pt-8 border-b border-gray-800">
      <Forms />
        </div>
      </section>


<section className='mt-20 pb-10 bg-gradient-to-b from-[#050725] to-[#050F5A]'>
<div className="flex flex-col items-center justify-center ">
      <h1 className="lg:text-4xl text-3xl font-bold mb-10 text-center">
      Elevate your <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>brand </span>!
      </h1>
      <div className="grid lg:gap-8 gap-2 lg:grid-cols-3">
        <AnimatedNumber end={3} label="searches happen daily on Google" prefix="+" suffix=" Billion"/>
        <AnimatedNumber end={70} label="of sales come from a good website" prefix="+" suffix="%" />
        <AnimatedNumber end={80} label="abandon slow websites" prefix="+" suffix="%"/>
      </div>
    </div>
</section>

      {/* CTA Section */}
      <section className="pt-40 bg-gradient-to-t from-[#000000] via-[#050725] to-[#050F5A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Let's Build Something Great</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Ready to elevate your digital presence? We're here to transform your vision into reality.
          </p>
          <a href="#contact" className="inline-flex items-center px-8 py-3 bg-white text-slate-900 hover:bg-slate-100 transition-colors rounded-full font-semibold">
            Get in Touch <ChevronRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>

<section>
          <div>
              <Testimonial />
          </div>
</section>

      {/* Footer */}
      <footer>
       <Footer /> 
      </footer>
    </div>
  );
}

export default App;