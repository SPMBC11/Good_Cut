// src/components/BookingModal.tsx
import React, { useEffect, useState } from 'react';
import { services, timeSlots } from '../data/mockData';
import { Booking } from '../types';
import type { Barber } from '../types';
import { useBarbers } from '../context/BarberContext';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBarber: Barber | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedBarber }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<Partial<Booking>>({});
  const { addBooking, barbers } = useBarbers();

  // Pre-select barber if coming from barber card
  useEffect(() => {
    if (selectedBarber) {
      setBooking(prev => ({ ...prev, barberId: selectedBarber.id }));
    }
  }, [selectedBarber]);

  if (!isOpen) {
    return null;
  }

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const selectedBarberData = barbers.find(b => b.id === booking.barberId);
    const selectedService = services.find(s => s.id === booking.serviceId);

    const newBooking: Booking = {
      id: Date.now().toString(),
      barberId: booking.barberId!,
      serviceId: booking.serviceId!,
      date: booking.date!,
      time: booking.time!,
      customerName: booking.customerName!,
      customerPhone: booking.customerPhone!,
      customerEmail: booking.customerEmail!,
    };
    addBooking(newBooking);

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formattedDate = new Date(booking.date as string).toLocaleDateString('es-ES', dateOptions);

    const barberName = selectedBarberData?.name ?? '';
    const serviceName = selectedService?.name ?? '';
    const servicePrice = selectedService?.price ?? '';

    const whatsappMessage = [
      '¡Hola! Quiero reservar una cita en Good Cut:',
      '',
      `📅 *Fecha:* ${formattedDate}`,
      `🕐 *Hora:* ${booking.time}`,
      `👨‍💼 *Barbero:* ${barberName}`,
      `✂️ *Servicio:* ${serviceName} - ${servicePrice}`,
      `👤 *Cliente:* ${booking.customerName}`,
      `📞 *Teléfono:* ${booking.customerPhone}`,
      `📧 *Email:* ${booking.customerEmail}`,
      '',
      '¡Gracias!'
    ].join('\n');

    const whatsappNumber = "573053113534"; // Replace with your real number
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    setIsLoading(false);

    const confirmed = window.confirm(
      '¡Reserva confirmada! ¿Deseas enviar los detalles por WhatsApp?'
    );

    if (confirmed) {
      window.open(whatsappUrl, '_blank');
    }

    onClose();
    setStep(1);
    setBooking({});
  };

  const isNextDisabled =
    (step === 1 && !booking.barberId) ||
    (step === 2 && !booking.serviceId) ||
    (step === 3 && (!booking.date || !booking.time));

  const isSubmitDisabled = !booking.customerName || !booking.customerPhone || !booking.customerEmail || isLoading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col min-h-[400px]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Reserva tu cita - PASO {step}</h3>
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Steps progress */}
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span className={`font-medium ${step >= 1 ? 'text-gray-900' : ''}`}>Barbero</span>
            <span className={`font-medium ${step >= 2 ? 'text-gray-900' : ''}`}>Servicio</span>
            <span className={`font-medium ${step >= 3 ? 'text-gray-900' : ''}`}>Fecha y Hora</span>
            <span className={`font-medium ${step >= 4 ? 'text-gray-900' : ''}`}>Datos</span>
          </div>
          <div className="bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-golden rounded-full h-1.5"
              style={{ width: `${((step - 1) / 3) * 100}%`, transition: 'width 0.3s ease' }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 flex-grow">
          {step === 1 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Selecciona un barbero</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {barbers.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBooking((prev) => ({ ...prev, barberId: b.id }))}
                    className={`flex items-center gap-3 p-3 border rounded-xl text-left w-full transition-all ${
                      booking.barberId === b.id
                        ? 'border-golden ring-2 ring-golden ring-opacity-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={b.image}
                      alt={b.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{b.name}</p>
                      <p className="text-sm text-gray-600">{b.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Selecciona un servicio</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBooking((prev) => ({ ...prev, serviceId: s.id }))}
                    className={`p-3 border rounded-xl text-left w-full transition-all ${
                      booking.serviceId === s.id
                        ? 'border-golden ring-2 ring-golden ring-opacity-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{s.name}</p>
                    <p className="text-sm text-gray-600">${s.price} · {s.duration} min</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Selecciona fecha y hora</h4>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-base"
                value={booking.date || ''}
                onChange={(e) => setBooking((prev) => ({ ...prev, date: e.target.value }))}
              />
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t.time}
                    onClick={() => t.available && setBooking((prev) => ({ ...prev, time: t.time }))}
                    disabled={!t.available}
                    className={`p-2 rounded-lg border text-sm transition-colors ${
                      booking.time === t.time
                        ? 'bg-golden-light border-golden font-semibold'
                        : 'border-gray-300 bg-white'
                    } ${
                      t.available
                        ? 'cursor-pointer hover:bg-gray-100'
                        : 'cursor-not-allowed opacity-50'
                    }`}
                  >
                    {t.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h4 className="font-medium text-gray-800 mb-4">Tus datos</h4>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full p-3 border border-gray-300 rounded-lg text-base"
                  value={booking.customerName || ''}
                  onChange={(e) => setBooking((prev) => ({ ...prev, customerName: e.target.value }))}
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full p-3 border border-gray-300 rounded-lg text-base"
                  value={booking.customerPhone || ''}
                  onChange={(e) => setBooking((prev) => ({ ...prev, customerPhone: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full p-3 border border-gray-300 rounded-lg text-base"
                  value={booking.customerEmail || ''}
                  onChange={(e) => setBooking((prev) => ({ ...prev, customerEmail: e.target.value }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-between p-6 border-t border-gray-200 bg-gray-50">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg bg-white hover:bg-gray-50 transition-colors text-base"
            >
              Anterior
            </button>
          ) : <div />}

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="px-6 py-3 bg-golden text-dark font-semibold rounded-lg border-none transition-opacity text-base disabled:opacity-50"
            >
              Siguiente
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="px-6 py-3 bg-golden text-dark font-semibold rounded-lg border-none flex items-center gap-2 transition-opacity text-base disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                  <span>Confirmando...</span>
                </>
              ) : (
                'Confirmar Reserva'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
