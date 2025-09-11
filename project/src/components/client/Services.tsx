import React, { useRef } from 'react';
import { Clock, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { useServices } from '../../context/ServiceContext';

/**
 * @component Services
 * 
 * Sección de la página principal que muestra una lista de los servicios ofrecidos.
 * Los servicios se muestran en un carrusel horizontal y solo se incluyen los activos.
 */
const Services: React.FC = () => {
  // Hook para obtener los servicios del contexto
  const { services } = useServices();
  // Ref para el contenedor del carrusel para controlar el scroll
  const trackRef = useRef<HTMLDivElement>(null);

  /**
   * Desplaza el carrusel de servicios horizontalmente.
   * @param {'left' | 'right'} dir - La dirección del desplazamiento.
   */
  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9; // Desplaza el 90% del ancho visible
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  // Filtra los servicios para mostrar solo los que están activos
  const activeServices = services.filter(service => service.status === 'active');
  
  return (
    <section id="services" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4 font-oswald">
            Nuestros <span className="text-golden font-pacifico">Servicios</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-playfair">
            Ofrecemos una amplia gama de servicios profesionales para el cuidado masculino
          </p>
        </div>

        {/* Carrusel de Servicios */}
        <div className="relative">
          {/* Botones de navegación del carrusel */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
            <button type="button" onClick={() => scrollByAmount('left')} className="p-2 rounded-full border bg-white shadow-sm" aria-label="Anterior">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-10">
            <button type="button" onClick={() => scrollByAmount('right')} className="p-2 rounded-full border bg-white shadow-sm" aria-label="Siguiente">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Contenedor de las tarjetas de servicio */}
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {activeServices.map((service, index) => (
              <div
                key={service.id}
                className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }} // Animación escalonada
              >
                {/* Imagen y Precio */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-golden text-dark px-3 py-1 rounded-full font-bold">
                    ${service.price}
                  </div>
                </div>
                
                {/* Detalles del Servicio */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2 font-oswald">{service.name}</h3>
                  <p className="text-gray-600 mb-4 font-playfair">{service.description}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {service.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
