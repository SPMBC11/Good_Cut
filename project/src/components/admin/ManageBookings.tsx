// src/components/admin/ManageBookings.tsx
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import { useServices } from "../../context/ServiceContext";
import type { Booking } from "../../types";

/**
 * @component ManageBookings
 * 
 * Componente para la gestión de reservas en el panel de administración.
 * Permite ver, buscar, filtrar y modificar el estado de las reservas.
 */
const ManageBookings: React.FC = () => {
  // Hooks para acceder a los contextos de reservas y servicios
  const { bookings, updateBookingStatus, deleteBooking } = useBarbers();
  const { services } = useServices();

  // Estados para la búsqueda y el filtro por estado
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed" | "cancelled">("all");

  // Filtra las reservas según el término de búsqueda y el estado seleccionado
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerPhone.includes(searchTerm) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // --- Funciones de ayuda para la UI de estado ---

  /**
   * Devuelve un icono según el estado de la reserva.
   * @param {string} status - El estado de la reserva.
   * @returns {React.ReactElement}
   */
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    }
  };

  /**
   * Devuelve el texto descriptivo del estado.
   * @param {string} status - El estado de la reserva.
   * @returns {string}
   */
  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completada";
      case "cancelled":
        return "Cancelada";
      default:
        return "Pendiente";
    }
  };

  /**
   * Devuelve las clases de color de Tailwind CSS según el estado.
   * @param {string} status - El estado de la reserva.
   * @returns {string}
   */
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  // --- Manejadores de eventos ---

  /**
   * Actualiza el estado de una reserva.
   * @param {string} bookingId - El ID de la reserva a actualizar.
   * @param {"pending" | "completed" | "cancelled"} newStatus - El nuevo estado.
   */
  const handleStatusChange = (bookingId: string, newStatus: "pending" | "completed" | "cancelled") => {
    updateBookingStatus(bookingId, newStatus);
  };

  /**
   * Elimina una reserva tras confirmación.
   * @param {string} bookingId - El ID de la reserva a eliminar.
   */
  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
      deleteBooking(bookingId);
    }
  };

  // --- Cálculo de Estadísticas ---
  const totalBookings = bookings.length;
  const completedBookings = bookings.filter(b => b.status === "completed").length;
  const pendingBookings = bookings.filter(b => b.status === "pending").length;
  const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Gestión de Reservas</h1>
          <p className="text-gray-600 mt-1">Administra las reservas y su estado</p>
        </div>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reservas</p>
              <p className="text-xl font-bold text-dark">{totalBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completadas</p>
              <p className="text-xl font-bold text-dark">{completedBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pendientes</p>
              <p className="text-xl font-bold text-dark">{pendingBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Canceladas</p>
              <p className="text-xl font-bold text-dark">{cancelledBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, teléfono o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "pending" | "completed" | "cancelled")}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden"
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-dark">
            Lista de Reservas ({filteredBookings.length})
          </h2>
        </div>
        <div className="p-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm || statusFilter !== "all" 
                  ? "No se encontraron reservas con ese criterio" 
                  : "No hay reservas registradas"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => {
                const service = services.find(s => s.id === booking.serviceId);
                return (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Información de la reserva */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(booking.status)}
                          <h3 className="font-semibold text-dark">{booking.customerName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                          {booking.isWalkIn && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Sin Reserva
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString('es-ES')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{service?.name || 'Servicio'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">${service?.price || '0'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{booking.customerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{booking.customerEmail}</span>
                          </div>
                        </div>
                      </div>

                      {/* Acciones de la reserva */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleStatusChange(booking.id, "completed")}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Completar
                        </button>
                       
                        <button
                          onClick={() => handleStatusChange(booking.id, "pending")}
                          className="flex items-center gap-2 px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                        >
                          <AlertCircle className="w-4 h-4" />
                          Pendiente
                        </button>
                        
                        <button
                          onClick={() => handleStatusChange(booking.id, "cancelled")}
                          className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancelar
                        </button>
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;