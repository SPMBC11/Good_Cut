import React from 'react';
import { Scissors, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="w-8 h-8 text-golden" />
              <span className="text-2xl font-pacifico">Good Cut</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              La mejor experiencia en cuidado masculino. Tradición, estilo y precisión 
              en cada corte desde hace más de 5 años.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-golden transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-golden transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-golden transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-gray-300 hover:text-golden transition-colors">Inicio</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-golden transition-colors">Servicios</a></li>
              <li><a href="#barbers" className="text-gray-300 hover:text-golden transition-colors">Barberos</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-golden transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Cl. 138 #52a-2 a 52a-100</li>
              <li>Centro, Ciudad</li>
              <li>+1 (555) 123-4567</li>
              <li>info@barbershop.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Good Cut. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;