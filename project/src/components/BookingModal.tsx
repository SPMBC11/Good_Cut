// src/components/BookingModal.tsx
import React, { useEffect, useState } from 'react';
import { services, timeSlots } from '../data/mockData';
import { Booking } from '../types';
import type { Barber } from '../types';
import { useBarbers } from '../context/BarberContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBarber: Barber | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, selectedBarber }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState<Partial<Booking>>({});
  const { addBooking, barbers, bookings } = useBarbers();

  useEffect(() => {
    if (selectedBarber) {
      setBooking(prev => ({ ...prev, barberId: selectedBarber.id }));
    }
  }, [selectedBarber]);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
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
    setIsLoading(false);
    onClose();
    setStep(1);
    setBooking({});
  };

  // Bloqueo por barbero-fecha-hora
  const computedTimeSlots = timeSlots.map((slot) => {
    const selectedBarberId = booking.barberId || selectedBarber?.id;
    const isTaken = !!bookings.find(
      (b) =>
        b.barberId === selectedBarberId &&
        b.date === booking.date &&
        b.time === slot.time
    );
    return {
      ...slot,
      available: Boolean(booking.date) && slot.available && !isTaken,
    };
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        minHeight: '400px'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#111827',
            margin: 0
          }}>Reserva tu cita - PASO {step}</h3>
          <button 
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: '#f3f4f6',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Steps progress */}
        <div style={{ padding: '16px 24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            <span style={{ fontWeight: step >= 1 ? '600' : '400', color: step >= 1 ? '#111827' : '#6b7280' }}>Barbero</span>
            <span style={{ fontWeight: step >= 2 ? '600' : '400', color: step >= 2 ? '#111827' : '#6b7280' }}>Servicio</span>
            <span style={{ fontWeight: step >= 3 ? '600' : '400', color: step >= 3 ? '#111827' : '#6b7280' }}>Fecha y Hora</span>
            <span style={{ fontWeight: step >= 4 ? '600' : '400', color: step >= 4 ? '#111827' : '#6b7280' }}>Datos</span>
          </div>
          <div style={{
            height: '4px',
            backgroundColor: '#e5e7eb',
            borderRadius: '2px'
          }}>
            <div style={{
              height: '4px',
              backgroundColor: '#d97706',
              borderRadius: '2px',
              width: `${(step - 1) * 33.33 + 1}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {step === 1 && (
            <div>
              <h4 style={{ fontWeight: '500', marginBottom: '16px', color: '#111827' }}>Selecciona un barbero</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}>
                {barbers.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBooking((prev) => ({ ...prev, barberId: b.id }))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px',
                      border: booking.barberId === b.id ? '2px solid #d97706' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxShadow: booking.barberId === b.id ? '0 0 0 3px rgba(217, 119, 6, 0.1)' : 'none'
                    }}
                  >
                    <img 
                      src={b.image} 
                      alt={b.name} 
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }} 
                    />
                    <div>
                      <p style={{ fontWeight: '600', margin: 0, color: '#111827' }}>{b.name}</p>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>{b.specialty}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 style={{ fontWeight: '500', marginBottom: '16px', color: '#111827' }}>Selecciona un servicio</h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setBooking((prev) => ({ ...prev, serviceId: s.id }))}
                    style={{
                      padding: '12px',
                      border: booking.serviceId === s.id ? '2px solid #d97706' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                      boxShadow: booking.serviceId === s.id ? '0 0 0 3px rgba(217, 119, 6, 0.1)' : 'none'
                    }}
                  >
                    <p style={{ fontWeight: '600', margin: '0 0 4px 0', color: '#111827' }}>{s.name}</p>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>${s.price} · {s.duration} min</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 style={{ fontWeight: '500', marginBottom: '16px', color: '#111827' }}>Selecciona fecha y hora</h4>
              <input
                type="date"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  fontSize: '16px'
                }}
                value={booking.date || ''}
                onChange={(e) => setBooking((prev) => ({ ...prev, date: e.target.value }))}
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                gap: '8px'
              }}>
                {computedTimeSlots.map((t) => (
                  <button
                    key={t.time}
                    onClick={() => t.available && setBooking((prev) => ({ ...prev, time: t.time }))}
                    disabled={!t.available}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: booking.time === t.time ? '2px solid #d97706' : '1px solid #d1d5db',
                      backgroundColor: booking.time === t.time ? '#fef3c7' : 'white',
                      cursor: t.available ? 'pointer' : 'not-allowed',
                      fontSize: '14px',
                      opacity: t.available ? 1 : 0.5
                    }}
                  >
                    {t.time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h4 style={{ fontWeight: '500', marginBottom: '16px', color: '#111827' }}>Tus datos</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  value={booking.customerName || ''}
                  onChange={(e) => setBooking((prev) => ({ ...prev, customerName: e.target.value }))}
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  value={booking.customerPhone || ''}
                  onChange={(e) => setBooking((prev) => ({ ...prev, customerPhone: e.target.value }))}
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px'
                  }}
                  value={booking.customerEmail || ''}
                  onChange={(e) => setBooking((prev) => ({ ...prev, customerEmail: e.target.value }))}
                />
              </div>
            </div>
          )}
        </div>

        {/* Botones */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '24px',
          borderTop: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          {step > 1 && (
            <button
             // Anterior
            onClick={() => setStep((s) => Math.max(1, s - 1))}
              style={{
                padding: '12px 24px',
                border: '1px solid #d1d5db',
                color: '#374151',
                borderRadius: '8px',
                backgroundColor: 'white',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Anterior
            </button>
          )}
          
          <div style={{ marginLeft: 'auto' }}>
            {step < 4 ? (
              <button
                // Siguiente
              onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={
                  (step === 1 && !booking.barberId) ||
                  (step === 2 && !booking.serviceId) ||
                  (step === 3 && (!booking.date || !booking.time))
                }
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#d97706',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  opacity: (
                    (step === 1 && !booking.barberId) ||
                    (step === 2 && !booking.serviceId) ||
                    (step === 3 && (!booking.date || !booking.time))
                  ) ? 0.5 : 1
                }}
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!booking.customerName || !booking.customerPhone || !booking.customerEmail || isLoading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#d97706',
                  color: 'white',
                  fontWeight: '500',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: (!booking.customerName || !booking.customerPhone || !booking.customerEmail || isLoading) ? 0.5 : 1
                }}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid white',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
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
    </div>
  );
};

export default BookingModal;