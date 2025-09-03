import { Barber, Service, TimeSlot } from '../types';

export const barbers: Barber[] = [
  {
    id: '1',
    name: 'Miguel Rodríguez',
    specialty: 'Cortes Clásicos & Fade',
    experience: '8 años de experiencia',
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg',
    rating: 4.9,
    phone: '+573053113534' // ✅ Teléfono con indicativo
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    specialty: 'Barbas & Bigotes',
    experience: '6 años de experiencia',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    rating: 4.8,
    phone: '+573053113534'
  },
  {
    id: '3',
    name: 'Fernando López',
    specialty: 'Cortes Modernos',
    experience: '5 años de experiencia',
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg',
    rating: 4.7,
    phone: '+573053113534'
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Corte Clásico',
    description: 'Corte tradicional con tijeras y navaja',
    price: 25,
    duration: 45,
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg'
  },
  {
    id: '2',
    name: 'Fade Premium',
    description: 'Degradado profesional con acabado perfecto',
    price: 35,
    duration: 60,
    image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg'
  },
  {
    id: '3',
    name: 'Barba & Bigote',
    description: 'Arreglo completo con navaja y aceites',
    price: 20,
    duration: 30,
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
  },
  {
    id: '4',
    name: 'Paquete Completo',
    description: 'Corte + Barba + Tratamiento capilar',
    price: 50,
    duration: 90,
    image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg'
  }
];

export const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '10:00', available: true },
  { time: '11:00', available: false },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: false },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true },
  { time: '18:00', available: false },
  { time: '19:00', available: true }
];
