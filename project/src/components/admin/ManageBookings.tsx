// src/components/admin/ManageBookings.tsx
import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Eye,
  Trash2,
  Edit
} from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import type { Booking, Barber } from "../../types";

const ManageBookings: React.FC = () => {
  const { bookings, barbers, deleteBooking } = useBarbers();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  // Filtrar reservas
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerPhone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "today" && new Date(booking.date).toDateString() === new Date().toDateString()) ||
      (statusFilter === "upcoming" && new Date(booking.date) > new Date()) ||
      (statusFilter === "past" && new Date(booking.date) < new Date());

    return matchesSearch && matchesStatus;
  });

  const getBarberName = (barberId: string) => {
    const barber = barbers.find(b => b.id === barberId);
    return barber ? barber.name : "Barbero no encontrado";
  };

  const getStatusColor = (date: string) => {
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate.toDateString() === today.toDateString()) {
      return "bg-orange-100 text-orange-800";
    } else if (bookingDate > today) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (date: string) => {
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (bookingDate.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (bookingDate > today) {
      return "Próxima";
    } else {
      return "Pasada";
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta reserva?")) {
      deleteBooking(bookingId);
    }
  };

  const todayBookings = bookings.filter(booking => 
    new Date(booking.date).toDateString() === new Date().toDateString()
  ).length;

  const upcomingBookings = bookings.filter(booking => 
    new Date(booking.date) > new Date()
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Gestión de Reservas</h1>
          <p className="text-gray-600 mt-1">Administra las citas y reservas de clientes</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reservas</p>
              <p className="text-xl font-bold text-dark">{bookings.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Citas Hoy</p>
              <p className="text-xl font-bold text-dark">{todayBookings}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Próximas Citas</p>
              <p className="text-xl font-bold text-dark">{upcomingBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          >
            <option value="all">Todas las citas</option>
            <option value="today">Citas de hoy</option>
            <option value="upcoming">Próximas citas</option>
            <option value="past">Citas pasadas</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
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
                  : "No hay reservas registradas"
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      {/* Booking Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-golden rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-dark" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-dark">{booking.customerName}</h3>
                            <p className="text-sm text-gray-600">{getBarberName(booking.barberId)}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>{new Date(booking.date).toLocaleDateString('es-ES')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{booking.customerPhone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span className="truncate">{booking.customerEmail}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.date)}`}>
                          {getStatusText(booking.date)}
                        </span>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Ver detalles"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Eliminar reserva"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-dark">Detalles de la Reserva</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-golden rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-dark" />
                </div>
                <div>
                  <h4 className="font-semibold text-dark">{selectedBooking.customerName}</h4>
                  <p className="text-sm text-gray-600">{getBarberName(selectedBooking.barberId)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Fecha</p>
                  <p className="font-medium">{new Date(selectedBooking.date).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <p className="text-gray-600">Hora</p>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-gray-600">Teléfono</p>
                  <p className="font-medium">{selectedBooking.customerPhone}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{selectedBooking.customerEmail}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.date)}`}>
                  {getStatusText(selectedBooking.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;

