// src/components/BookingModal.tsx
import React, { useEffect, useState } from 'react';
import { timeSlots } from '../data/mockData';
import { Booking } from '../types';
import type { Barber } from '../types';
import { useBarbers } from '../context/BarberContext';
import { useServices } from '../context/ServiceContext';

/**
 * @interface BookingModalProps
 * @property {boolean} isOpen - Controla si el modal está abierto o cerrado.
 * @property {() => void} onClose - Callback para cerrar el modal.
 * @property {Barber | null} selectedBarber - El barbero preseleccionado al abrir el modal.
 */
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBarber: Barber | null;
}

/**
 * @component BookingModal
 * 
 * Modal de varios pasos para que los clientes reserven una cita.
 * Guía al usuario a través de la selección de barbero, servicio, fecha, hora y datos personales.
 * Al final, genera un mensaje de WhatsApp y guarda la reserva en la aplicación.
 */
const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedBarber }) => {
  // Estados para controlar el flujo del modal
  const [step, setStep] = useState(1); // Paso actual del formulario
  const [isLoading, setIsLoading] = useState(false); // Estado de carga para el envío
  const [booking, setBooking] = useState<Partial<Booking>>({}); // Datos de la reserva en progreso

  // Hooks para acceder a los contextos de la aplicación
  const { addBooking, barbers, bookings } = useBarbers();
  const { services } = useServices();

  // Efecto para preseleccionar el barbero si se pasa como prop
  useEffect(() => {
    if (selectedBarber) {
      setBooking(prev => ({ ...prev, barberId: selectedBarber.id }));
    }
  }, [selectedBarber]);

  /**
   * Maneja el envío final del formulario.
   * Construye un mensaje para WhatsApp y guarda la reserva localmente.
   */
  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un retraso

    const selectedBarberInfo = barbers.find(b => b.id === booking.barberId);
    const selectedServiceInfo = services.find(s => s.id === booking.serviceId);

    if (selectedBarberInfo) {
      // Construye el mensaje para WhatsApp
      const message = `¡Hola! Me gustaría reservar una cita:\n\n📅 Fecha: ${booking.date}\n🕐 Hora: ${booking.time}\n💇‍♂️ Barbero: ${selectedBarberInfo.name}\n✂️ Servicio: ${selectedServiceInfo?.name || 'N/A'}\n💰 Precio: $${selectedServiceInfo?.price || '0'}\n\n👤 Mis datos:\n• Nombre: ${booking.customerName}\n• Teléfono: ${booking.customerPhone}\n• Email: ${booking.customerEmail}\n\n¿Está disponible? ¡Gracias!`;
      const cleanPhone = selectedBarberInfo.phone.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    // Guarda la reserva en el estado de la aplicación
    const newBooking: Booking = {
      id: Date.now().toString(),
      barberId: booking.barberId!,
      serviceId: booking.serviceId!,
      date: booking.date!,
      time: booking.time!,
      customerName: booking.customerName!,
      customerPhone: booking.customerPhone!,
      customerEmail: booking.customerEmail!,
      status: 'pending',
      price: services.find(s => s.id === booking.serviceId)?.price || 0,
    };
    addBooking(newBooking);

    // Resetea y cierra el modal
    setIsLoading(false);
    onClose();
    setStep(1);
    setBooking({});
  };

  // Calcula los horarios disponibles, deshabilitando los ya reservados
  const computedTimeSlots = timeSlots.map((slot) => {
    const selectedBarberId = booking.barberId || selectedBarber?.id;
    const isTaken = !!bookings.find(
      (b) =>
        b.barberId === selectedBarberId &&
        b.date === booking.date &&
        b.time === slot.time &&
        b.status !== 'cancelled'
    );
    return { ...slot, available: !!booking.date && !isTaken };
  });

  if (!isOpen) return null;

  // Renderizado del modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-800">Reserva tu cita - PASO {step}</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">✕</button>
        </div>

        {/* Barra de Progreso */}
        <div className="p-6">
          {/* ... (código de la barra de progreso) ... */}
        </div>

        {/* Cuerpo del Modal (pasos) */}
        <div className="p-6 flex-grow">
            {/* Paso 1 - Barbero */}
          {step === 1 && (
            <div>
              <h4 className="text-lg font-medium mb-4">Selecciona tu barbero</h4>
              <div className="grid grid-cols-2 gap-6">
                {barbers.map(barber => (
                  <div
                    key={barber.id}
                    onClick={() => setBooking(prev => ({ ...prev, barberId: barber.id }))}
                    className={`cursor-pointer border-2 rounded-xl overflow-hidden transition-all hover:shadow-lg ${
                      booking.barberId === barber.id ? 'border-golden' : 'border-gray-200 hover:border-golden'
                    }`}
                  >
                    <img src={barber.image || '/default-barber.jpg'} alt={barber.name} className="h-40 w-full object-cover" />
                    <div className="p-4 text-center">
                      <p className="font-medium">{barber.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Paso 2 - Servicio */}
          {step === 2 && (
            <div>
              <h4 className="text-lg font-medium mb-4">Selecciona el servicio</h4>
              <div className="grid grid-cols-2 gap-6">
                {services.map(service => (
                  <div
                    key={service.id}
                    onClick={() => setBooking(prev => ({ ...prev, serviceId: service.id }))}
                    className={`cursor-pointer border-2 rounded-xl p-4 transition-all hover:shadow-lg ${
                      booking.serviceId === service.id ? 'border-golden' : 'border-gray-200 hover:border-golden'
                    }`}
                  >
                    <p className="font-medium">{service.name}</p>
                    <p className="text-gray-500">${service.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
           {/* Paso 3 - Fecha y Hora */}
          {step === 3 && (
            <div>
              <h4 className="text-lg font-medium mb-4">Selecciona fecha y hora</h4>
              <input
                type="date"
                className="border p-2 rounded w-full mb-6"
                value={booking.date || ''}
                onChange={(e) => setBooking(prev => ({ ...prev, date: e.target.value }))}
              />
              <div className="grid grid-cols-3 gap-3">
                {computedTimeSlots.map(slot => (
                  <button
                    key={slot.time}
                    onClick={() => setBooking(prev => ({ ...prev, time: slot.time }))}
                    disabled={!slot.available}
                    className={`px-3 py-2 border-2 rounded-lg transition-all ${
                      booking.time === slot.time ? 'bg-golden text-white border-golden' : 'border-gray-200 hover:border-golden'
                    } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          )}

              {/* Paso 4 - Datos personales */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Tus datos</h4>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full border-2 p-2 rounded"
                value={booking.customerName || ''}
                onChange={(e) => setBooking(prev => ({ ...prev, customerName: e.target.value }))}
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full border-2 p-2 rounded"
                value={booking.customerPhone || ''}
                onChange={(e) => setBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full border-2 p-2 rounded"
                value={booking.customerEmail || ''}
                onChange={(e) => setBooking(prev => ({ ...prev, customerEmail: e.target.value }))}
              />
            </div>
          )}
        </div>

        

        {/* Pie del Modal (botones de navegación) */}
        <div className="flex justify-between p-6 border-t bg-gray-50">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="px-6 py-3 border rounded-lg bg-white">Anterior</button>
          )}
          <div className="ml-auto">
            {step < 4 ? (
              <button onClick={() => setStep(s => s + 1)} disabled={false} className="px-6 py-3 bg-golden text-white rounded-lg">Siguiente</button>
            ) : (
              <button onClick={handleSubmit} disabled={isLoading} className="px-6 py-3 bg-golden text-white rounded-lg flex items-center gap-2">
                {isLoading ? 'Confirmando...' : 'Enviar por WhatsApp'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
