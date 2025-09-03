// src/types/index.ts
export interface Barber {
  id: string;
  name: string;
  specialty: string;
  experience: string; // ✅ lo hacemos obligatorio
  image: string;
  rating: number;
  phone: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  barberId: string;
  clientName: string;
  date: string; // "YYYY-MM-DD"
  time?: string; // "HH:MM"
  notes?: string;
}

// ÚNICA definición de Booking
export interface Booking {
  id: string;
  barberId: string;
  serviceId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}
