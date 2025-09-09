// src/components/admin/WalkInCuts.tsx
import React, { useState } from "react";
import {
  UserPlus,
  Clock,
  User,
  Phone,
  Scissors,
  DollarSign,
  Calendar,
  Save,
  X,
} from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import { useServices } from "../../context/ServiceContext";
import type { Booking } from "../../types";

/**
 * @component WalkInCuts
 * 
 * Componente para registrar cortes de clientes que llegan sin cita previa (walk-ins).
 * Permite al administrador crear una reserva completada en el momento.
 */
const WalkInCuts: React.FC = () => {
  // Hooks para acceder a los contextos de barberos y servicios
  const { barbers, addBooking } = useBarbers();
  const { services } = useServices();

  // Estado para controlar la visibilidad del formulario
  const [showForm, setShowForm] = useState(false);
  
  // Estado para los datos del formulario, inicializado con la fecha y hora actual
  const [formData, setFormData] = useState({
    barberId: "",
    serviceId: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }).slice(0, 5),
  });

  /**
   * Maneja los cambios en los campos del formulario.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - Evento de cambio.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Maneja el envío del formulario para registrar el corte.
   * Crea un objeto de reserva y lo añade al contexto.
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const walkInBooking: Booking = {
      id: Date.now().toString(),
      barberId: formData.barberId,
      serviceId: formData.serviceId,
      date: formData.date,
      time: formData.time,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      status: 'completed', // Los walk-ins se marcan como completados inmediatamente
      isWalkIn: true, // Flag para identificar que es un corte sin reserva
    };

    addBooking(walkInBooking);
    
    // Resetea el formulario y lo oculta
    handleCancel();
  };

  /**
   * Cancela la operación y resetea el estado del formulario a sus valores iniciales.
   */
  const handleCancel = () => {
    setShowForm(false);
    setFormData({
      barberId: "",
      serviceId: "",
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }).slice(0, 5),
    });
  };

  return (
    <div className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Cortes Sin Reserva</h1>
          <p className="text-gray-600 mt-1">Registra cortes de clientes que llegan sin cita previa</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <UserPlus size={20} />
          Nuevo Corte
        </button>
      </div>

      {/* Formulario para registrar el corte (se muestra condicionalmente) */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-dark">Registrar Corte Sin Reserva</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Selección de Barbero */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={16} />Barbero</label>
                  <select name="barberId" value={formData.barberId} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required>
                    <option value="">Selecciona un barbero</option>
                    {barbers.map(barber => <option key={barber.id} value={barber.id}>{barber.name}</option>)}
                  </select>
                </div>

                {/* Selección de Servicio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Scissors size={16} />Servicio</label>
                  <select name="serviceId" value={formData.serviceId} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required>
                    <option value="">Selecciona un servicio</option>
                    {services.filter(s => s.status === 'active').map(service => <option key={service.id} value={service.id}>{service.name} - ${service.price}</option>)}
                  </select>
                </div>

                {/* Fecha y Hora */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Calendar size={16} />Fecha</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Clock size={16} />Hora</label>
                  <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>

                {/* Datos del Cliente */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><User size={16} />Nombre del Cliente</label>
                  <input type="text" name="customerName" value={formData.customerName} onChange={handleInputChange} placeholder="Nombre completo" className="w-full px-3 py-2 border rounded-lg" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><Phone size={16} />Teléfono</label>
                  <input type="tel" name="customerPhone" value={formData.customerPhone} onChange={handleInputChange} placeholder="+1 234 567 8900" className="w-full px-3 py-2 border rounded-lg" required />
                </div>
              </div>

              {/* Email (Opcional) */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2"><DollarSign size={16} />Email (opcional)</label>
                <input type="email" name="customerEmail" value={formData.customerEmail} onChange={handleInputChange} placeholder="cliente@email.com" className="w-full px-3 py-2 border rounded-lg" />
              </div>

              {/* Botones de Acción */}
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleCancel} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <X size={16} />Cancelar
                </button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-golden text-dark font-semibold px-4 py-2 rounded-lg">
                  <Save size={16} />Registrar Corte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tarjeta Informativa */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">¿Cómo funciona?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Los cortes sin reserva se registran como <strong>completados</strong> automáticamente.</li>
              <li>• El horario seleccionado se <strong>bloquea</strong> para futuras reservas.</li>
              <li>• Los datos se guardan para reportes y seguimiento.</li>
              <li>• Puedes registrar el corte en cualquier momento del día.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkInCuts;