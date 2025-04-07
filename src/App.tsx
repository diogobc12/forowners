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
    <div className="min-h-screen bg-[#050725] text-white">
      <div className='flex justify-center'>
        <Navigation scrolled={scrolled} />
      </div>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-16 sm:pt-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
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
            
            {/* Add the new HeroAnimation component */}
            <HeroAnimation />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-cover bg-gradient-to-t from-[#000000] to-[#050725]/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 inline-block">WHAT WE OFFER</span>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Our Services</h2>
            <p className="text-slate-300 text-center mb-4 max-w-2xl mx-auto">
              We provide comprehensive digital solutions to elevate your brand and online presence.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-4 gap-8 mx-4 lg:mx-0">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="pb-0 bg-no-repeat bg-cover bg-center justify-center" style={{ backgroundImage: "url('/bg3.jpeg')"}}>
        <div className='bg-gradient-to-b from-black to-[#060623]/80 py-16'>
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-3">
                Why Choose <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Us</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We combine innovation, expertise, and dedication to deliver exceptional results for our clients
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Zap className="w-8 h-8 text-cyan-400" />,
                      title: "Performance-Driven",
                      description: "Optimized solutions that deliver speed and efficiency"
                    },
                    {
                      icon: <PenTool className="w-8 h-8 text-cyan-400" />,
                      title: "Creative Design",
                      description: "Stunning visuals that captivate your audience"
                    },
                    {
                      icon: <Lightbulb className="w-8 h-8 text-cyan-400" />,
                      title: "Innovative Approach",
                      description: "Forward-thinking strategies for digital success"
                    },
                    {
                      icon: <Users className="w-8 h-8 text-cyan-400" />,
                      title: "Client-Focused",
                      description: "Your vision and goals are our top priority"
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true }}
                      className="bg-white/5 p-5 rounded-xl hover:bg-white/10 transition-colors border border-white/5"
                    >
                      <div className="mb-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 p-3 inline-block rounded-lg">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Our Commitment</h3>
                  <ul className="space-y-4">
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
                      <p className="text-white">Custom digital solutions for modern brands</p>
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
                      <p className="text-white">Built for performance, design, and user experience</p>
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
                      <p className="text-white">Trusted by businesses across multiple industries</p>
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
                      <p className="text-white">Our approach combines <span className="text-cyan-400">innovative design</span> with <span className="text-cyan-400">cutting-edge technology</span> to deliver solutions that not only meet but <span className="text-cyan-400">exceed expectations</span></p>
                    </motion.li>
                  </ul>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <div className="mb-8 text-center">
                    <h3 className="text-2xl font-bold mb-2">Our Expertise</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: <Award className="w-6 h-6" />, title: "Quality", value: "Premium" },
                      { icon: <Clock className="w-6 h-6" />, title: "Delivery", value: "On Time" },
                      { icon: <Shield className="w-6 h-6" />, title: "Security", value: "Top Level" },
                      { icon: <Briefcase className="w-6 h-6" />, title: "Innovation", value: "Cutting-Edge" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                      >
                        <div className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mb-3">
                          {stat.icon}
                        </div>
                        <h4 className="text-lg font-medium mb-1">{stat.title}</h4>
                        <p className="text-cyan-400 font-bold">{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-8 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-full">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">Trusted by 200+ clients</h4>
                        <p className="text-sm text-gray-400">From startups to enterprises worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        
        {/* Technologies We Use Section */}
        <div className="container mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl font-bold mb-2">
              Professional <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Tools</span> We Use
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Leveraging industry-leading software to deliver exceptional quality
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 max-w-4xl mx-auto">
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
        
        <div className='pt-20'>
          <ProjectsPage />
        </div>
        </div>
        
        {/* Transition to Companies */}
        <div className="bg-gradient-to-b from-[#060623]/80 via-[#050725] to-[#050725]">
          <div className="w-full"> 
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