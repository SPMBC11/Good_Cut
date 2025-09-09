// src/data/mockData.ts
import type { Service, TimeSlot } from "../types";

/**
 * @file mockData.ts
 * 
 * Este archivo contiene los datos de ejemplo (mock data) para la aplicación.
 * Se utiliza para inicializar el estado cuando no hay datos guardados en localStorage.
 */

// Lista de servicios de ejemplo
export const services: Service[] = [
  {
    id: "1",
    name: "Corte Clásico",
    description: "Corte tradicional con acabado prolijo y estilizado.",
    price: 35,
    duration: 40,
    image:
      "https://images.unsplash.com/photo-1621607512200-6f5b2b96cfa0?q=80&w=1280&auto=format&fit=crop",
    status: "active",
  },
  {
    id: "2",
    name: "Afeitado Tradicional",
    description: "Afeitado con toallas calientes y navaja para un acabado suave.",
    price: 25,
    duration: 30,
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1280&auto=format&fit=crop",
    status: "active",
  },
  {
    id: "3",
    name: "Corte + Barba",
    description: "Paquete completo de corte de cabello y arreglo de barba.",
    price: 50,
    duration: 60,
    image:
      "https://images.unsplash.com/photo-1517837016564-bfc3ffd67455?q=80&w=1280&auto=format&fit=crop",
    status: "active",
  },
  {
    id: "4",
    name: "Arreglo de Barba",
    description: "Perfilado y arreglo de barba con productos premium.",
    price: 20,
    duration: 25,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1280&auto=format&fit=crop",
    status: "active",
  },
  {
    id: "5",
    name: "Corte Fade",
    description: "Corte degradado de precisión con estilo moderno.",
    price: 40,
    duration: 45,
    image:
      "https://images.unsplash.com/photo-1605497788044-5f7f1c6d7a0e?q=80&w=1280&auto=format&fit=crop",
    status: "active",
  },
  {
    id: "6",
    name: "Color y Estilizado",
    description: "Coloración ligera y peinado para ocasiones especiales.",
    price: 60,
    duration: 70,
    image:
      "https://images.unsplash.com/photo-1503951914958-c4c4b8c3b34d?q=80&w=1280&auto=format&fit=crop",
    status: "maintenance",
  },
];

// Lista de horarios disponibles para las reservas
export const timeSlots: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: true },
  { time: "12:00", available: true },
  { time: "12:30", available: true },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: true },
  { time: "17:30", available: true },
  { time: "18:00", available: true },
];