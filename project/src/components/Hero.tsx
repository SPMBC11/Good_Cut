import React from 'react';
import { Calendar, Star, Users } from 'lucide-react';

interface HeroProps {
  onBooking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBooking }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg')`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-oswald">
            <span className="text-golden font-pacifico drop-shadow-lg">Good</span> Cut
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto font-playfair">
            Experimenta el arte del cuidado masculino con nuestros barberos expertos. 
            Tradición, estilo y precisión en cada corte.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onBooking}
              className="bg-golden hover:bg-golden-dark text-dark font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Calendar className="w-5 h-5 inline mr-2" />
              Reservar Cita
            </button>
            <button className="border-2 border-golden text-golden hover:bg-golden hover:text-dark font-bold py-4 px-8 rounded-lg transition-all duration-300">
              Ver Servicios
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-golden mr-2" />
                <span className="text-4xl font-bold text-white">4.9</span>
              </div>
              <p className="text-gray-300">Calificación Promedio</p>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-golden mr-2" />
                <span className="text-4xl font-bold text-white">500+</span>
              </div>
              <p className="text-gray-300">Clientes Satisfechos</p>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-8 h-8 text-golden mr-2" />
                <span className="text-4xl font-bold text-white">5</span>
              </div>
              <p className="text-gray-300">Años de Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;