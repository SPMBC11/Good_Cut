import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBarbers } from '../../context/BarberContext';
import type { Barber } from '../../types';

/**
 * @interface BarbersProps
 * @property {(barber: Barber) => void} onBooking - Callback que se ejecuta cuando un usuario hace clic en el botón de reservar.
 */
interface BarbersProps {
  onBooking: (barber: Barber) => void;
}

/**
 * @component Barbers
 * 
 * Sección de la página principal que muestra una lista horizontal de barberos.
 * Permite a los usuarios ver los barberos y iniciar el proceso de reserva.
 * 
 * @param {BarbersProps} props - Propiedades del componente.
 * @returns {React.FC}
 */
const Barbers: React.FC<BarbersProps> = ({ onBooking }) => {
  // Hook para obtener la lista de barberos del contexto
  const { barbers } = useBarbers();
  // Ref para el contenedor de las tarjetas para controlar el scroll
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Desplaza la lista de barberos horizontalmente.
   * @param {'left' | 'right'} dir - La dirección del desplazamiento.
   */
  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9; // Desplaza el 90% del ancho visible
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section id="barbers" className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-oswald">
            Conoce a Nuestros <span className="text-golden font-pacifico">Barberos</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-playfair">
            Profesionales altamente capacitados con años de experiencia y pasión por su arte
          </p>
        </div>

        {/* Carrusel de Barberos */}
        <div className="relative">
          {/* Botón de scroll a la izquierda */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              className="p-2 rounded-full border border-gray-700  text-white shadow-sm hover:bg-dark-700"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          {/* Botón de scroll a la derecha */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              className="p-2 rounded-full border border-gray-700 text-white shadow-sm hover:bg-dark-700"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Contenedor de las tarjetas de barbero */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {barbers.map((barber, index) => (
              <div
                key={barber.id}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-gradient-to-br from-dark-800 to-dark-900 rounded-xl overflow-hidden shadow-2xl hover:shadow-golden/20 transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }} // Animación escalonada
              >
                {/* Imagen del barbero */}
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
                
                {/* Detalles del barbero */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 font-oswald">{barber.name}</h3>
                  <p className="text-golden font-semibold mb-2 font-playfair">{barber.specialty}</p>
                  <p className="text-gray-300 font-playfair">{barber.experience}</p>
                  
                  {/* Botón de reserva */}
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
      </div>
    </section>
  );
};

export default Barbers;