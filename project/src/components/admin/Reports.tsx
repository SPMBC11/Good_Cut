// src/components/admin/Reports.tsx
import React, { useState } from "react";
import { 
  BarChart, 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import { services } from "../../data/mockData";

const Reports: React.FC = () => {
  const { barbers, bookings } = useBarbers();
  const [dateRange, setDateRange] = useState("30"); // días
  const [selectedBarber, setSelectedBarber] = useState("all");

  // Calcular estadísticas
  const totalBookings = bookings.length;
  const totalRevenue = bookings.length * 50; // Estimación promedio por cita
  const averageBookingsPerDay = totalBookings / 30;
  
  // Filtrar reservas por rango de fechas
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
    return bookingDate >= daysAgo;
  });

  // Estadísticas por barbero
  const barberStats = barbers.map(barber => {
    const barberBookings = filteredBookings.filter(booking => booking.barberId === barber.id);
    return {
      ...barber,
      bookings: barberBookings.length,
      revenue: barberBookings.length * 50,
    };
  }).sort((a, b) => b.bookings - a.bookings);

  // Estadísticas por día de la semana
  const dayStats = [
    { day: "Lunes", bookings: Math.floor(totalBookings * 0.15) },
    { day: "Martes", bookings: Math.floor(totalBookings * 0.12) },
    { day: "Miércoles", bookings: Math.floor(totalBookings * 0.18) },
    { day: "Jueves", bookings: Math.floor(totalBookings * 0.20) },
    { day: "Viernes", bookings: Math.floor(totalBookings * 0.25) },
    { day: "Sábado", bookings: Math.floor(totalBookings * 0.10) },
    { day: "Domingo", bookings: 0 },
  ];

  const handleExportReport = () => {
    // Simular exportación de reporte
    alert("Funcionalidad de exportación en desarrollo...");
  };

  const handleRefreshData = () => {
    // Simular actualización de datos
    alert("Datos actualizados");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Reportes y Análisis</h1>
          <p className="text-gray-600 mt-1">Análisis de rendimiento y estadísticas del negocio</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleRefreshData}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} />
            Actualizar
          </button>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Download size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Período:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden"
            >
              <option value="7">Últimos 7 días</option>
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 90 días</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Barbero:</label>
            <select
              value={selectedBarber}
              onChange={(e) => setSelectedBarber(e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-golden"
            >
              <option value="all">Todos los barberos</option>
              {barbers.map(barber => (
                <option key={barber.id} value={barber.id}>{barber.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reservas</p>
              <p className="text-3xl font-bold text-dark">{filteredBookings.length}</p>
              <p className="text-xs text-green-600 mt-1">+12% vs período anterior</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-3xl font-bold text-dark">${totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">+8% vs período anterior</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio Diario</p>
              <p className="text-3xl font-bold text-dark">{averageBookingsPerDay.toFixed(1)}</p>
              <p className="text-xs text-blue-600 mt-1">Citas por día</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Barberos Activos</p>
              <p className="text-3xl font-bold text-dark">{barbers.length}</p>
              <p className="text-xs text-purple-600 mt-1">En el sistema</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Barber Performance */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-dark mb-4">Rendimiento por Barbero</h3>
          <div className="space-y-4">
            {barberStats.map((barber, index) => (
              <div key={barber.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-golden rounded-full flex items-center justify-center text-dark font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-dark">{barber.name}</p>
                    <p className="text-sm text-gray-600">{barber.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-dark">{barber.bookings} citas</p>
                  <p className="text-sm text-green-600">${barber.revenue}</p>
                </div>
              </div>
            ))}
            {barberStats.length === 0 && (
              <p className="text-gray-500 text-center py-4">No hay datos disponibles</p>
            )}
          </div>
        </div>

        {/* Day of Week Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-dark mb-4">Análisis por Día de la Semana</h3>
          <div className="space-y-3">
            {dayStats.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{day.day}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-golden h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.bookings / Math.max(...dayStats.map(d => d.bookings))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-dark w-8">{day.bookings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Analysis */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-dark mb-4">Análisis de Servicios</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div key={service.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-dark">{service.name}</h4>
                  <p className="text-sm text-gray-600">${service.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{service.duration} min</span>
                <span className="text-green-600 font-medium">
                  {Math.floor(Math.random() * 20) + 5} reservas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;

