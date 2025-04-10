import React, { useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "/src/assets/logo.png";

interface NavigationProps {
  scrolled: boolean;
}

export function Navigation({ scrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <nav className="fixed z-50 transition-all duration-300 sm:p-5 mt-3 flex justify-center w-full transform-gpu will-change-transform">
      <div 
        className={`transition-all duration-300 flex flex-col justify-between items-center transform-gpu backface-hidden ${
          scrolled ? 'bg-slate-900/90 backdrop-blur-sm shadow-lg w-[95%] sm:w-[80%] sm:py-1 py-0 px-6 sm:px-8 rounded-lg scale-100 origin-center' : 'bg-transparent w-[90%] sm:w-[70%] scale-95 origin-center' 
        }`}
      >
        <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center h-16 sm:h-20 relative w-full">
          <a href="#hero" className="flex items-center transform-gpu">
            <img src={logo} alt="ForOwners Logo" className="h-5 sm:h-7 w-auto" />
          </a>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none transform-gpu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            title={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#services" className="text-white hover:text-blue-300 transition-colors">Services</a>
            <a href="#why-us" className="text-white hover:text-blue-300 transition-colors">Why Us</a>
            <a href="#contact" className="text-white hover:text-blue-300 transition-colors">Contact</a>
            <a href="#contact" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg transform-gpu">
              Get in Touch
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden w-full overflow-hidden transition-all duration-300 transform-gpu ${
            isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`px-4 py-4 rounded-b-lg space-y-4 ${scrolled ? 'bg-none' : 'bg-slate-900/95 backdrop-blur-sm'}`}>
            <a 
              href="#services" 
              className="block text-white hover:text-blue-300 transition-colors py-2"
              onClick={toggleMenu}
            >
              Services
            </a>
            <a 
              href="#why-us" 
              className="block text-white hover:text-blue-300 transition-colors py-2"
              onClick={toggleMenu}
            >
              Why Us
            </a>
            <a 
              href="#contact" 
              className="block text-white hover:text-blue-300 transition-colors py-2"
              onClick={toggleMenu}
            >
              Contact
            </a>
            <a 
              href="#contact" 
              className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg text-center transform-gpu"
              onClick={toggleMenu}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
