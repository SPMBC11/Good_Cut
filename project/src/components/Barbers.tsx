import React from 'react';
import { Star } from 'lucide-react';
import { useBarbers } from '../context/BarberContext';

import type { Barber } from '../types';

interface BarbersProps {
  onBooking: (barber: Barber) => void;
}

const Barbers: React.FC<BarbersProps> = ({ onBooking }) => {
  const { barbers } = useBarbers();
  return (
    <section id="barbers" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-oswald">
            Conoce a Nuestros <span className="text-golden font-pacifico">Barberos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-playfair">
            Profesionales altamente capacitados con años de experiencia y pasión por su arte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber, index) => (
            <div
              key={barber.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-golden/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-golden mr-1" />
                    <span className="text-white font-bold">{barber.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 font-oswald">{barber.name}</h3>
                <p className="text-golden font-semibold mb-2 font-playfair">{barber.specialty}</p>
                <p className="text-gray-300 font-playfair">{barber.experience}</p>
                
                <button 
                  className="mt-4 w-full bg-golden hover:bg-golden-dark text-dark font-bold py-2 px-4 rounded-lg transition-all duration-300"
                  onClick={() => onBooking(barber)}
                >
                  Reservar con {barber.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Barbers;