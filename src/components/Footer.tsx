import React from 'react';
import { Mail, Instagram} from 'lucide-react';
import logo from "/src/assets/logo.png"; 

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#050725] via-[#050F5A] to-[#050725] text-gray-300 pt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-4 gap-8">
            <div className='col-span-2'>
              <img src={logo} alt="ForOwners Logo" className="h-5 w-auto mb-4" />
              <p className="text-slate-300 mb-4 max-w-md">
                ForOwners will make it happen again!
              </p>
            </div>
            <div className='col-start-4'> 
              <h4 className="text-xl font-semibold mb-4 text-center">Let's Connect</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.instagram.com/forowners" target="_blank" rel="noopener noreferrer" 
                   className="text-slate-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="mailto:agency@forowners.co"
                   className="text-slate-300 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 ForOwners. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;