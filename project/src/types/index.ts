// src/types/index.ts

/**
 * @file index.ts
 * 
 * Define los tipos y las interfaces de datos centrales utilizados en toda la aplicación.
 * Centralizar los tipos ayuda a mantener la consistencia y la integridad de los datos.
 */

/**
 * @interface Barber
 * Representa a un barbero en el sistema.
 */
export interface Barber {
  id: string; // Identificador único
  name: string; // Nombre completo
  email: string; // Correo electrónico
  password?: string; // Contraseña (opcional para no exponerla siempre)
  specialty: string; // Especialidad principal (ej. "Corte Clásico")
  experience: string; // Años de experiencia
  image: string; // URL de la imagen de perfil
  rating: number; // Calificación promedio (de 1 a 5)
  phone: string; // Número de teléfono de contacto
}

/**
 * @interface Service
 * Representa un servicio ofrecido por la barbería.
 */
export interface Service {
  id: string; // Identificador único
  name: string; // Nombre del servicio
  description: string; // Descripción breve
  price: number; // Precio en la moneda local
  duration: number; // Duración en minutos
  image: string; // URL de una imagen representativa
  status: 'active' | 'inactive' | 'maintenance'; // Estado del servicio
}

/**
 * @interface TimeSlot
 * Representa un intervalo de tiempo disponible para una reserva.
 */
export interface TimeSlot {
  time: string; // Hora en formato "HH:MM"
  available: boolean; // Si el horario está disponible o no
}

/**
 * @interface Appointment
 * Representa una cita o reserva (puede ser un tipo más genérico si se necesita).
 */
export interface Appointment {
  id: string;
  barberId: string;
  clientName: string;
  date: string; // Fecha en formato "YYYY-MM-DD"
  time?: string; // Hora en formato "HH:MM"
  notes?: string;
}

/**
 * @interface Booking
 * Representa una reserva de un cliente para un servicio con un barbero.
 */
export interface Booking {
  id: string; // Identificador único de la reserva
  barberId: string; // ID del barbero asignado
  serviceId: string; // ID del servicio reservado
  date: string; // Fecha de la reserva
  time: string; // Hora de la reserva
  customerName: string; // Nombre del cliente
  customerPhone: string; // Teléfono del cliente
  customerEmail: string; // Email del cliente
  status: 'pending' | 'completed' | 'cancelled'; // Estado actual de la reserva
  price?: number; // Precio del servicio en el momento de la reserva
  isWalkIn?: boolean; // Flag para identificar si fue un corte sin cita previa
}