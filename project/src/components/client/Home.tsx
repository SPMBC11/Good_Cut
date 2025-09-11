// src/components/Home.tsx
import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Barbers from "./Barbers";
import BookingModal from "./BookingModal";
import Contact from "./Contact";
import Footer from "./Footer";
import type { Barber } from "../../types";

/**
 * @component Home
 * 
 * Componente principal que ensambla todas las secciones de la página de inicio.
 * Gestiona el estado del modal de reservas y la navegación entre secciones.
 */
export default function Home() {
  // Estado para controlar la visibilidad del modal de reservas
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  // Estado para almacenar el barbero seleccionado para la reserva
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  /**
   * Navega suavemente a una sección de la página.
   * @param {string} sectionId - El ID del elemento de la sección a la que se quiere navegar.
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /**
   * Abre el modal de reservas.
   * Opcionalmente, puede preseleccionar un barbero.
   * @param {Barber | null} [barber=null] - El barbero a preseleccionar.
   */
  const handleBooking = (barber: Barber | null = null) => {
    setSelectedBarber(barber);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Encabezado de la página */}
      <Header onNavigate={scrollToSection} />
      
      {/* Secciones principales de la página */}
      <main>
        <Hero onBooking={() => handleBooking(null)} onNavigate={scrollToSection} />
        <Services />
        <Barbers onBooking={handleBooking} />
        <Contact />
      </main>

      {/* Pie de página */}
      <Footer />

      {/* Modal de Reservas (se muestra sobre el resto del contenido) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedBarber={selectedBarber}
      />
    </div>
  );
}