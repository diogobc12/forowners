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
import { useLanguage } from './contexts/LanguageContext';

function AppCarousel() {
  return (
    <div className="">
      <ClientCarousel />
    </div>
  );
}

function TypewriterText() {
  const { t } = useLanguage();
  const words = t('hero.words');
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
  }, [currentIndex, isTyping, currentWordIndex, words]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse text-white">|</span>
    </span>
  );
}


function App() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { icon: <Palette className="md:w-7 md:h-7 w-6 h-6" />, translationKey: 'branding' },
    { icon: <Code2 className="md:w-7 md:h-7 w-6 h-6" />, translationKey: 'webDesign' },
    { icon: <Globe2 className="md:w-7 md:h-7 w-6 h-6" />, translationKey: 'development' },
    { icon: <MapPin className="md:w-7 md:h-7 w-6 h-6" />, translationKey: 'maps' }
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
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              {t('hero.title')}<br/>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                <TypewriterText />
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-md">{t('hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/20">
                {t('hero.cta.talk')} <ChevronRight className="ml-2 w-5 h-5" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300 rounded-lg text-white font-semibold">
                {t('hero.cta.services')} <ArrowDown className="ml-2 w-5 h-5" />
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
      <section id="services" className="py-10 sm:py-16 bg-cover bg-gradient-to-t from-[#000000] to-[#050725]/50">
        <div className="container mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3 inline-block">{t('services.label')}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 sm:mb-3">{t('services.title')}</h2>
            <p className="text-slate-300 text-center mb-3 max-w-2xl mx-auto text-sm sm:text-base px-4">
              {t('services.subtitle')}
            </p>
            <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mx-4 lg:mx-auto max-w-6xl">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="pb-0 bg-no-repeat bg-cover bg-center justify-center" style={{ backgroundImage: "url('/bg3.jpeg')"}}>
        <div className='bg-gradient-to-b from-black to-[#060623]/80 py-12'>
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 px-2 sm:px-0">
                {t('whyUs.title').split(/(?:Innovation|Inovação)/).map((part, i, arr) => (
                  <React.Fragment key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {t('whyUs.title').match(/(?:Innovation|Inovação)/)?.[0]}
                    </span>}
                  </React.Fragment>
                ))}
              </h2>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            </motion.div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto px-3 sm:px-4">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {[
                    {
                      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
                      title: t('whyUs.features.performance.title'),
                      description: t('whyUs.features.performance.description')
                    },
                    {
                      icon: <PenTool className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
                      title: t('whyUs.features.creative.title'),
                      description: t('whyUs.features.creative.description')
                    },
                    {
                      icon: <Lightbulb className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
                      title: t('whyUs.features.tailored.title'),
                      description: t('whyUs.features.tailored.description')
                    }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      viewport={{ once: true, amount: 0.3 }}
                      className="flex items-start bg-white/5 p-3 sm:p-5 rounded-xl border border-white/5"
                    >
                      <div className="mr-3 sm:mr-4 p-2 sm:p-3 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t('whyUs.trust.title')}</h3>
                  <ul className="space-y-4 sm:space-y-6">
                    <motion.li 
                      className="flex items-start" 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-3 sm:mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">{t('whyUs.trust.points.industries.title')}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{t('whyUs.trust.points.industries.description')}</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-3 sm:mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">{t('whyUs.trust.points.results.title')}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{t('whyUs.trust.points.results.description')}</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-3 sm:mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">{t('whyUs.trust.points.excellence.title')}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{t('whyUs.trust.points.excellence.description')}</p>
                      </div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-3 sm:mr-4 mt-1 flex-shrink-0 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white text-sm sm:text-base font-medium mb-0.5 sm:mb-1">{t('whyUs.trust.points.partnership.title')}</h4>
                        <p className="text-gray-400 text-xs sm:text-sm">{t('whyUs.trust.points.partnership.description')}</p>
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
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold mb-2">
              {t('tools.title').split(/(?:Tools|Ferramentas)/).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {t('tools.title').match(/(?:Tools|Ferramentas)/)?.[0]}
                  </span>}
                </React.Fragment>
              ))}
            </h3>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              {t('tools.subtitle')}
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
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.3 }}
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
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 text-xs font-medium mb-6">
              {t('impactMetrics.label')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
              {t('impactMetrics.title').split(/(?:Presence|Presença)/).map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
                    {t('impactMetrics.title').match(/(?:Presence|Presença)/)?.[0]}
                  </span>}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl text-sm">
              {t('impactMetrics.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 w-full">
              <div className="flex flex-col items-center">
                <AnimatedNumber 
                  end={parseInt(t('impactMetrics.stats.searches.value'))} 
                  prefix={t('impactMetrics.stats.searches.prefix')} 
                  suffix={t('impactMetrics.stats.searches.suffix')}
                  delay={0}
                  duration={2500}
                  label={
                    <div className="text-center mt-3">
                      <div className="text-white/70 text-sm">{t('impactMetrics.stats.searches.title')}</div>
                      <div className="text-cyan-400/70 text-xs mt-1">{t('impactMetrics.stats.searches.subtitle')}</div>
                    </div>
                  }
                />
              </div>

              <div className="flex flex-col items-center">
                <AnimatedNumber 
                  end={parseInt(t('impactMetrics.stats.sales.value'))} 
                  prefix={t('impactMetrics.stats.sales.prefix')} 
                  suffix={t('impactMetrics.stats.sales.suffix')} 
                  delay={0}
                  duration={1800}
                  label={
                    <div className="text-center mt-3">
                      <div className="text-white/70 text-sm">{t('impactMetrics.stats.sales.title')}</div>
                      <div className="text-cyan-400/70 text-xs mt-1">{t('impactMetrics.stats.sales.subtitle')}</div>
                    </div>
                  }
                />
              </div>

              <div className="flex flex-col items-center">
                <AnimatedNumber 
                  end={parseInt(t('impactMetrics.stats.performance.value'))} 
                  prefix={t('impactMetrics.stats.performance.prefix')} 
                  suffix={t('impactMetrics.stats.performance.suffix')} 
                  delay={0}
                  duration={1800}
                  label={
                    <div className="text-center mt-3">
                      <div className="text-white/70 text-sm">{t('impactMetrics.stats.performance.title')}</div>
                      <div className="text-cyan-400/70 text-xs mt-1">{t('impactMetrics.stats.performance.subtitle')}</div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lisbon Section - Portuguese Identity */}
      <section className="py-16 bg-gradient-to-b from-[#050F5A] to-[#060623] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50"></div>
          
          {/* Pattern overlay - simulating traditional Portuguese azulejos */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAsMzBNMTUsMTVMMTUsNDVMNDUsNDVMNDUsMTVaIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0zMCwzMEMzMCwxOCAyMCwxNSAxNSwxNUMxNSw0NSA0NSw0NSA0NSwxNUM0MCwxNSAzMCwxOCAzMCwzMFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Minimal Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="inline-flex items-center mb-2">
              <div className="h-px w-8 bg-gradient-to-r from-green-500 to-green-500/0 mr-3"></div>
              <span className="text-sm font-light tracking-wider text-cyan-400 uppercase">
                {t('lisbon.label')}
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-red-500 to-red-500/0 ml-3"></div>
            </div>
            <h2 className="text-2xl md:text-4xl font-light text-white mb-2 tracking-wide">
              {t('lisbon.title')}
            </h2>
          </div>
          
          {/* Main Content with Image */}
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              {/* Image Container */}
              <div className="relative h-[50vh] min-h-[400px]">
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060623] via-[#060623]/70 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#060623]/50 via-transparent to-[#060623]/50 z-10"></div>
                
                <div className="absolute inset-0 z-0">
                  <img 
                    src="https://images.unsplash.com/photo-1580323956656-26bbb1206e34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
                    alt="Lisbon Waterfront" 
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                  />
                </div>
                
                {/* Portugal Flag-inspired Thin Line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 flex z-20">
                  <div className="w-2/5 h-full bg-green-600"></div>
                  <div className="w-3/5 h-full bg-red-600"></div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end z-20 p-6 md:p-8">
                  <div className="max-w-3xl">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-0.5 bg-gradient-to-b from-green-500 to-red-500 mr-3"></div>
                        <h3 className="text-2xl md:text-3xl text-white font-light tracking-wide">Lisboa</h3>
                        <div className="ml-3 px-2 py-0.5 text-xs rounded-full bg-white/10 backdrop-blur-sm">
                          PORTUGAL
                        </div>
                      </div>
                      
                      <p className="text-white/80 text-base md:text-lg font-light mb-4 max-w-2xl leading-relaxed">
                        {t('lisbon.subtitle')}
                      </p>
                      
                      <div className="flex flex-wrap gap-3">
                        {[0, 1, 2].map((index) => (
                          <div 
                            key={index}
                            className="group"
                          >
                            <div className="flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 transition-colors hover:bg-white/10">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${
                                index === 0 ? 'from-green-500/30 to-green-500/10 group-hover:from-green-500/50 group-hover:to-green-500/30' :
                                index === 1 ? 'from-red-500/30 to-red-500/10 group-hover:from-red-500/50 group-hover:to-red-500/30' :
                                'from-cyan-500/30 to-cyan-500/10 group-hover:from-cyan-500/50 group-hover:to-cyan-500/30'
                              } transition-all`}>
                                <div className={`${
                                  index === 0 ? 'text-green-500' : 
                                  index === 1 ? 'text-red-500' : 
                                  'text-cyan-500'
                                } group-hover:scale-110 transition-transform text-xs`}>●</div>
                              </div>
                              <span className="text-white/70 text-xs font-light">{t(`lisbon.facts.${index}.title`)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Quote Section */}
            <div className="mt-6 text-center max-w-2xl mx-auto">
              <blockquote className="italic text-white/60 text-sm md:text-base font-light">
                "{t('lisbon.description')}"
              </blockquote>
              <div className="flex justify-center mt-4">
                <div className="w-12 h-px bg-gradient-to-r from-green-500/0 via-red-500 to-green-500/0"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transition Elements to Testimonials */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060623] to-transparent"></div>
        <div className="absolute bottom-6 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-600/20 to-transparent"></div>
        
        {/* Decorative Dots Transition */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
          <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500/40"></div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-[#060623] via-[#050F5A] to-[#060623] relative">
        {/* Smooth Gradient Transition from Lisbon Section */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060623] via-[#060623] to-transparent z-0"></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#050F5A]/30 via-transparent to-[#060623]/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-30"></div>
        </div>
        <div className="relative z-10 pt-16">
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