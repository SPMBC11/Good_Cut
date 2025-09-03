// src/components/Home.tsx
import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import Barbers from "./Barbers";
import BookingModal from "./BookingModal";
import Contact from "./Contact";
import Footer from "./Footer";
import type { Barber } from "../types";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

  // Debug log
  console.log('Home render - isBookingOpen:', isBookingOpen, 'selectedBarber:', selectedBarber);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBooking = (barber: Barber | null = null) => {
    console.log('handleBooking called with:', barber);
    setSelectedBarber(barber);
    setIsBookingOpen(true);
    console.log('Modal should be open now');
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={scrollToSection} />
      <Hero onBooking={() => handleBooking(null)} />
      <Services />
      <Barbers onBooking={handleBooking} />
      <Contact />
      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          console.log('Closing modal');
          setIsBookingOpen(false);
        }}
        selectedBarber={selectedBarber}
      />
    </div>
  );
}
