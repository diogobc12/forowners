import React from 'react';
import { Menu, X } from 'lucide-react';
import logo from "/src/assets/logo.png";

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#050725]/90 backdrop-blur-sm shadow-lg' : 'bg-[#050725]' 
    }`}>
          <div className="flex items-center justify-center bg-gradient-to-br from-[#050725] via-[#050F5A] to-[#050725] animate-gradient bg-500% p-3">
        <h1 className="text-white text-center text-sm">
        <a href="" className="mx-2">
        Get your Free Ebook Now! →
          </a>
        </h1>
    </div>
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <a href="#hero" className="flex items-center">
          <img src={logo} alt="ForOwners Logo" className="h-7 w-auto" />
        </a>
        
        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          title={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#services" className="text-white hover:text-cyan-400 transition-colors">Services</a>
          <a href="#why-us" className="text-white hover:text-cyan-400 transition-colors">Why Us</a>
          <a href="#contact" className="text-white hover:text-cyan-400 transition-colors">Contact</a>
          <a href="#contact" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-full">
            Get in Touch
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-4 space-y-4">
          <a href="#services" className="block text-white hover:text-cyan-400 transition-colors">Services</a>
          <a href="#why-us" className="block text-white hover:text-cyan-400 transition-colors">Why Us</a>
          <a href="#testimonials" className="block text-white hover:text-cyan-400 transition-colors">Testimonials</a>
          <a href="#contact" className="block text-white hover:text-cyan-400 transition-colors">Contact</a>
          <a href="#contact" className="block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-full text-center">
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
