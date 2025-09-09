// src/context/BarberContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Barber, Booking } from "../types";

/**
 * @interface BarberContextProps
 * Define la forma de los datos y funciones que se proveerán en el contexto.
 */
interface BarberContextProps {
  barbers: Barber[];
  bookings: Booking[];
  notifications: string[];
  addBarber: (barber: Barber) => void;
  updateBarber: (barber: Barber) => void;
  deleteBarber: (id: string) => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: 'pending' | 'completed' | 'cancelled') => void;
  deleteBooking: (id: string) => void;
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

// Creación del contexto de React
const BarberContext = createContext<BarberContextProps | undefined>(undefined);

/**
 * @component BarberProvider
 * 
 * Proveedor de contexto que encapsula la lógica de estado para barberos, reservas y notificaciones.
 * Utiliza `localStorage` para persistir los datos.
 */
export const BarberProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para las notificaciones
  const [notifications, setNotifications] = useState<string[]>([]);

  // --- Estado de Barberos ---
  const [barbers, setBarbers] = useState<Barber[]>(() => {
    try {
      const saved = localStorage.getItem("barbers");
      return saved ? JSON.parse(saved) : []; // Inicia con datos de localStorage o vacío
    } catch {
      return [];
    }
  });

  // --- Estado de Reservas ---
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem("bookings");
      return saved ? JSON.parse(saved) : []; // Inicia con datos de localStorage o vacío
    } catch {
      return [];
    }
  });

  // --- Persistencia en localStorage ---
  useEffect(() => {
    localStorage.setItem("barbers", JSON.stringify(barbers));
  }, [barbers]);

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // --- Funciones CRUD para Barberos ---
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
    if (barber) addNotification(`Barbero eliminado: ${barber.name}`);
  };

  // --- Funciones para Reservas ---
  const addBooking = (booking: Booking) => {
    setBookings((prev) => [...prev, booking]);
    addNotification(booking.isWalkIn ? `Corte sin reserva registrado para ${booking.customerName}` : `Nueva reserva para ${booking.customerName}`);
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'completed' | 'cancelled') => {
  setBookings((prev) => {
    const updated = prev.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    const booking = prev.find((b) => b.id === id);
    if (booking) {
      addNotification(`Reserva de ${booking.customerName} marcada como ${status}`);
    }
    return updated;
  });
};
  
const deleteBooking = (id: string) => {
  setBookings((prev) => {
    const booking = prev.find((b) => b.id === id);
    if (booking) {
      addNotification(`Reserva eliminada para ${booking.customerName}`);
    }
    return prev.filter((b) => b.id !== id);
  });
};

  // --- Funciones para Notificaciones ---
  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    // La notificación se elimina automáticamente después de 5 segundos
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
      updateBookingStatus,
      deleteBooking,
      addNotification,
      clearNotifications
    }}>
      {children}
    </BarberContext.Provider>
  );
};

/**
 * @hook useBarbers
 * 
 * Hook personalizado para acceder fácilmente al BarberContext.
 * Lanza un error si se usa fuera de un BarberProvider.
 */
export const useBarbers = () => {
  const context = useContext(BarberContext);
  if (!context) throw new Error("useBarbers debe usarse dentro de BarberProvider");
  return context;
};