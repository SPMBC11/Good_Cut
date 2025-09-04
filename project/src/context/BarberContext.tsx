// src/context/BarberContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Barber, Booking } from "../types";

interface BarberContextProps {
  barbers: Barber[];
  bookings: Booking[];
  notifications: string[];
  addBarber: (barber: Barber) => void;
  updateBarber: (barber: Barber) => void;
  deleteBarber: (id: string) => void;
  addBooking: (booking: Booking) => void;
  deleteBooking: (id: string) => void;
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

const BarberContext = createContext<BarberContextProps | undefined>(undefined);

export const BarberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      id: "1",
      name: "Carlos Mendoza",
      specialty: "Corte Clásico",
      experience: "8 años",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      rating: 4.8,
      phone: "+1 234 567 8901"
    },
    {
      id: "2", 
      name: "Miguel Torres",
      specialty: "Barba y Bigote",
      experience: "5 años",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      rating: 4.9,
      phone: "+1 234 567 8902"
    },
    {
      id: "3",
      name: "Roberto Silva",
      specialty: "Afeitado Tradicional", 
      experience: "12 años",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      rating: 4.7,
      phone: "+1 234 567 8903"
    }
  ]);
  // Estado inicial de reservas con soporte de persistencia en localStorage
  const defaultBookings: Booking[] = [
    {
      id: "1",
      barberId: "1",
      serviceId: "1",
      date: new Date().toISOString().split('T')[0],
      time: "10:00",
      customerName: "Juan Pérez",
      customerPhone: "+1 234 567 8900",
      customerEmail: "juan@email.com"
    },
    {
      id: "2",
      barberId: "2", 
      serviceId: "2",
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: "14:30",
      customerName: "María García",
      customerPhone: "+1 234 567 8901",
      customerEmail: "maria@email.com"
    },
    {
      id: "3",
      barberId: "1",
      serviceId: "3",
      date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      time: "16:00",
      customerName: "Carlos López",
      customerPhone: "+1 234 567 8902", 
      customerEmail: "carlos@email.com"
    }
  ];

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem("bookings");
      return saved ? JSON.parse(saved) as Booking[] : defaultBookings;
    } catch {
      return defaultBookings;
    }
  });

  // Persistir reservas en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    } catch {}
  }, [bookings]);

  const addBarber = (barber: Barber) => {
    setBarbers((prev) => [...prev, barber]);
    addNotification(`Nuevo barbero agregado: ${barber.name}`);
  };
  
  const updateBarber = (barber: Barber) => {
    setBarbers((prev) => prev.map((b) => (b.id === barber.id ? barber : b)));
    addNotification(`Barbero actualizado: ${barber.name}`);
  };
  
  const deleteBarber = (id: string) => {
    const barber = barbers.find(b => b.id === id);
    setBarbers((prev) => prev.filter((b) => b.id !== id));
    if (barber) {
      addNotification(`Barbero eliminado: ${barber.name}`);
    }
  };

  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
    addNotification(`Nueva reserva creada para ${booking.customerName}`);
  };
  
  const deleteBooking = (id: string) => {
    const booking = bookings.find(b => b.id === id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (booking) {
      addNotification(`Reserva eliminada para ${booking.customerName}`);
    }
  };

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);
  };

  const clearNotifications = () => setNotifications([]);

  return (
    <BarberContext.Provider value={{ 
      barbers, 
      bookings, 
      notifications,
      addBarber, 
      updateBarber, 
      deleteBarber, 
      addBooking, 
      deleteBooking,
      addNotification,
      clearNotifications
    }}>
      {children}
    </BarberContext.Provider>
  );
};

export const useBarbers = () => {
  const context = useContext(BarberContext);
  if (!context) throw new Error("useBarbers debe usarse dentro de BarberProvider");
  return context;
};
