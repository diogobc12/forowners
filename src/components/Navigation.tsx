import React from 'react';
import { Menu, X } from 'lucide-react';
import logo from "/src/assets/logo.png";

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed z-50 transition-all duration-500 sm:p-5 mt-3 flex justify-center w-full">
      <div className={`transition-all duration-500 flex flex-col justify-between items-center ${
        scrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg w-[95%] sm:w-[80%] sm:py-1 py-0 px-6 sm:px-8 rounded-lg scale-100 origin-center' : 'bg-transparent w-[90%] sm:w-[70%] scale-95 origin-center' 
      }`}>
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center h-16 sm:h-20 relative w-full">
          <a href="#hero" className="flex items-center">
            <img src={logo} alt="ForOwners Logo" className="h-5 sm:h-7 w-auto" />
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
            <a href="#contact" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-lg">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden w-full overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 bg-slate-900/95 backdrop-blur-sm rounded-b-lg space-y-4">
            <a 
              href="#services" 
              className="block text-white hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a 
              href="#why-us" 
              className="block text-white hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Why Us
            </a>
            <a 
              href="#contact" 
              className="block text-white hover:text-cyan-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <a 
              href="#contact" 
              className="block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition-colors rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
