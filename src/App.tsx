import React, { useEffect, useState } from 'react';
import { Globe2, Palette, Code2, Play, MapPin, Headphones, ChevronRight, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Testimonial } from './components/Testimonial';
import { ServiceCard } from './components/ServiceCard';
import { ContactForm } from './components/ContactForm';
import { Navigation } from './components/Navigation';
import { GlobeAnimation } from './components/GlobeAnimation';
import { PerformanceAnimation } from './components/PerformanceAnimation';
import logo from "/src/assets/logo.png"; 
import './index.css'; // ou o caminho correto para o seu arquivo CSS
import ClientCarousel from './components/ClientCarousel';

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: <Palette className="w-8 h-8" />, title: 'Branding', description: 'Crafting a unique identity' },
    { icon: <Code2 className="w-8 h-8" />, title: 'Web Design', description: 'Sleek and intuitive interfaces' },
    { icon: <Globe2 className="w-8 h-8" />, title: 'Web Development', description: 'High-performance, scalable solutions' },
    { icon: <Play className="w-8 h-8" />, title: 'Graphic Motion', description: 'Engaging animations & visuals' },
    { icon: <MapPin className="w-8 h-8" />, title: 'Google Maps Profile', description: 'Optimizing business visibility' },
    { icon: <Headphones className="w-8 h-8" />, title: 'Online Consulting', description: 'Expert digital strategy guidance' },
  ];

  const testimonials = [
    {
      text: "ForOwners transformed our digital presence completely. Their attention to detail and innovative approach set them apart.",
      author: "Sarah Johnson, CEO of TechStart"
    },
    {
      text: "The team's expertise in both design and development helped us achieve results beyond our expectations.",
      author: "Michael Chen, Founder of GrowthLabs"
    },
    {
      text: "Working with ForOwners was a game-changer for our brand. They delivered exceptional results on time and within budget.",
      author: "Emma Williams, Marketing Director"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050725] text-white">
      <Navigation scrolled={scrolled} />
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
            <a href="#contact" className="inline-flex items-center px-8 py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-full text-white font-semibold">
              Let's Talk <ChevronRight className="ml-2 w-5 h-5" />
            </a>
          </div>
          <div className="hidden md:block">
            <GlobeAnimation />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-cover bg-gradient-to-t from-[#000000] to-[#050725]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 mt-10">Our Services</h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            We provide comprehensive digital solutions to elevate your brand and online presence.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="grid md:grid-rows-2 gap-4 pt-20 pb-0 bg-no-repeat bg-cover bg-black bg-center justify-center" style={{ backgroundImage: "url('/bg3.jpeg')"}}>
        <div className="container mx-2 auto p-8 grid md:grid-cols-2 gap-12 items-center relative w-full h-full bg-gradient-to-r from-[#060623]/50 via-[#000000]/60 to-[#060623]/50 rounded-2xl flex items-center justify-center overflow-hidden">
          <div className=''>
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
        <div className="container grid grid-rows-3"> 
        <div className='row-start-2'>
        <AppCarousel/>
        </div>
          </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="pt-20 pb-40 bg-cover bg-center bg-gradient-to-b from-[#000000] via-[#050725]/50 to-[#050725]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 mt-7">What Clients Say</h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about our work.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#050725]">
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

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 mt-7">Contact Us</h2>
          <p className="text-slate-300 text-center mb-12 max-w-2xl mx-auto">
            Ready to start your project? Get in touch with us and we'll get back to you as soon as possible.
          </p>
          <div className="max-w-2xl mx-auto">
            <ContactForm services={services.map(s => s.title)} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src={logo} alt="ForOwners Logo" className="h-5 w-auto mb-4" />
              <p className="text-slate-300 mb-4 max-w-md">
                A premium digital consultancy focused on crafting exceptional digital experiences for modern brands.
              </p>
              <p className="text-slate-400">© 2025 ForOwners. All rights reserved.</p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/forowners" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.linkedin.com/company/forowners/" target="_blank" rel="noopener noreferrer"
                   className="text-slate-300 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:forownersagency@gmail.com"
                   className="text-slate-300 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;