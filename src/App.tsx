import React, { useEffect, useState } from 'react';
import { Globe2, Palette, Code2, MapPin, ChevronRight, ArrowRight, ArrowDown, Zap, PenTool, Lightbulb, Users, Shield, Award, Clock, Briefcase } from 'lucide-react';
import { Testimonial } from './components/Testimonial';
import { ServiceCard } from './components/ServiceCard';
import { Navigation } from './components/Navigation';
import { PerformanceAnimation } from './components/PerformanceAnimation';
import { HeroAnimation } from './components/HeroAnimation';
import './index.css'; // ou o caminho correto para o seu arquivo CSS
import ClientCarousel from './components/ClientCarousel';
import Footer from './components/Footer';
import { Forms } from './components/Forms';
import { AnimatedNumber } from './components/AnimatedNumber';
import { ProjectsPage } from './components/ProjectsPage';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-[#050725] text-white overflow-hidden w-full max-w-[100vw]">
      <div className='flex justify-center'>
        <Navigation scrolled={scrolled} />
      </div>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-16 sm:pt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse will-change-[filter,opacity] transform-gpu"></div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              Empowering Your<br/>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                <TypewriterText />
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-md">Your brand, refined. Your website, perfected. Transform your digital identity today.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/20">
                Let's Talk <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 rounded-lg text-white font-semibold">
                Our Services <ArrowDown className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
          {/* Right Column - Hero Animation */}
          <div className="relative h-[500px] flex items-center justify-center hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/20 to-[#3B82F6]/20 rounded-3xl blur-3xl will-change-[opacity,transform] transform-gpu"
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
            
            {/* Add the new HeroAnimation component */}
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-cover bg-gradient-to-t from-[#000000] to-[#050725]/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-3 inline-block">WHAT WE OFFER</span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">Our Services</h2>
            <p className="text-slate-300 text-center mb-3 max-w-2xl mx-auto">
              We provide comprehensive digital solutions to elevate your brand and online presence.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-4 gap-6 mx-4 lg:mx-0">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="pb-0 bg-no-repeat bg-cover bg-center justify-center" style={{ backgroundImage: "url('/bg3.jpeg')"}}>
        <div className='bg-gradient-to-b from-black to-[#060623]/80 py-12'>
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-4xl font-bold mb-3">
                Where <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Innovation</span> Meets Execution
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 gap-6">
                  {[
                    {
                      icon: <Zap className="w-8 h-8 text-cyan-400" />,
                      title: "Performance-Driven",
                      description: "Optimised for speed, design and user experience — because first impressions are everything"
                    },
                    {
                      icon: <PenTool className="w-8 h-8 text-cyan-400" />,
                      title: "Creative Process",
                      description: "A blend of strategic thinking with innovation, delivering websites that not only function, they convert"
                    },
                    {
                      icon: <Lightbulb className="w-8 h-8 text-cyan-400" />,
                      title: "Tailored Solutions",
                      description: "Digital solutions that reflect your brand identity and drive measurable results"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="flex items-start bg-white/5 p-5 rounded-xl border border-white/5"
                    >
                      <div className="mr-4 p-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">Why Trust Us</h3>
                  <ul className="space-y-6">
                    <motion.li 
                      className="flex items-start" 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Trusted Across Industries</h4>
                        <p className="text-gray-400 text-sm">From visionary startups to established companies</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Results-Focused Approach</h4>
                        <p className="text-gray-400 text-sm">We prioritize your goals and create solutions that drive real business outcomes</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">Modern Digital Excellence</h4>
                        <p className="text-gray-400 text-sm">Leveraging the latest technologies to keep your brand ahead of the curve</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
          <div>
                        <h4 className="text-white font-medium mb-1">Collaborative Partnership</h4>
                        <p className="text-gray-400 text-sm">We work closely with you at every step, ensuring your vision is realized with precision and care</p>
                      </div>
                    </motion.li>
            </ul>
                </div>
              </motion.div>
            </div>
          </div>
        
        {/* Technologies We Use Section */}
        <div className="container mx-auto px-4 pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold mb-2">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Tools</span> We Use
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Leveraging industry-leading software to deliver exceptional quality
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Adobe Illustrator",
                icon: "/adobe-illustrator.png", 
                fallbackIcon: "Ai",
                color: "from-[#FF9A00] to-[#FF7C00]"
              },
              {
                name: "Adobe Photoshop",
                icon: "/adobe-photoshop.png",
                fallbackIcon: "Ps",
                color: "from-[#31A8FF] to-[#0077FF]"
              },
              {
                name: "Adobe Lightroom",
                icon: "/adobe-lightroom.png",
                fallbackIcon: "Lr",
                color: "from-[#ADD5EC] to-[#31A8FF]"
              },
              {
                name: "Adobe Premiere Pro",
                icon: "/adobe-premiere.png",
                fallbackIcon: "Pr",
                color: "from-[#9999FF] to-[#6363FF]"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center p-4"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 shadow-lg`}>
                  {tool.icon ? (
                    <img 
                      src={tool.icon} 
                      alt={tool.name} 
                      className="w-10 h-10 md:w-12 md:h-12 object-contain"
                      onError={(e) => {
                        const imgElement = e.currentTarget as HTMLImageElement;
                        imgElement.style.display = 'none';
                        const nextElement = imgElement.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'block';
                        }
                      }}
                    />
                  ) : null}
                  <span 
                    className="text-white font-bold text-xl md:text-2xl" 
                    style={{ display: 'none' }}
                  >
                    {tool.fallbackIcon}
                  </span>
                </div>
                <p className="text-white font-medium text-center text-sm md:text-base">{tool.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className='pt-16'>
        <ProjectsPage />
        </div>
        </div>
      </section>

      {/* Our Clients section with smooth gradient transition */}
      <section className="bg-gradient-to-b from-[#060623] via-[#050725] to-[#040620] relative -mt-24">
        {/* Smooth transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#060623]/90 to-transparent z-10"></div>
        
        <div className="container mx-auto relative z-20"> 
        <AppCarousel/>
          </div>
      </section>

      {/* Contact Section with improved transition */}
      <section id="contact" className='bg-gradient-to-b from-[#040620] via-[#050725] to-[#060623] relative -mt-20'>
        {/* Smooth transition overlay */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#040620]/90 to-transparent z-10"></div>

        <div className="container mx-auto min-h-screen flex items-center justify-center p-4 relative z-20">
      <Forms />
        </div>
      </section>

      <section className='py-20 bg-gradient-to-b from-[#060623] to-[#050F5A] relative overflow-hidden'>
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-xs font-medium mb-6">
              IMPACT METRICS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              Transform Your Digital <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>Presence</span>
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl text-sm">
              In today's digital landscape, a strong online presence is crucial. Here's why you should invest in your digital future.
            </p>

            <div className="grid lg:grid-cols-3 gap-12 w-full">
              <div className="flex flex-col items-center">
                <AnimatedNumber 
                  end={3} 
                  prefix="+" 
                  suffix="Billion"
                  delay={0}
                  label={
                    <div className="text-center mt-3">
                      <div className="text-white/70 text-sm">Daily Google Searches</div>
                      <div className="text-cyan-400/70 text-xs mt-1">Opportunity for visibility</div>
                    </div>
                  }
                />
              </div>

              <div className="flex flex-col items-center">
                <AnimatedNumber 
                  end={87} 
                  prefix="" 
                  suffix="%" 
                  delay={500}
                  label={
                    <div className="text-center mt-3">
                      <div className="text-white/70 text-sm">Website-Driven Sales</div>
                      <div className="text-cyan-400/70 text-xs mt-1">Revenue through web presence</div>
                    </div>
                  }
                />
              </div>

              <div className="flex flex-col items-center">
                <AnimatedNumber 
                  end={92} 
                  prefix="" 
                  suffix="%" 
                  delay={1000}
                  label={
                    <div className="text-center mt-3">
                      <div className="text-white/70 text-sm">Performance Matters</div>
                      <div className="text-cyan-400/70 text-xs mt-1">Users leave slow websites</div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-[#050F5A] via-[#050F5A] to-[#060623] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050F5A]/30 via-transparent to-[#060623]/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="relative z-10">
              <Testimonial />
          </div>
</section>

      {/* Footer with smooth transition */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060623] to-transparent z-10"></div>
        <footer className="bg-[#060623] relative z-0">
       <Footer /> 
      </footer>
      </div>
    </div>
  );
}

export default App;