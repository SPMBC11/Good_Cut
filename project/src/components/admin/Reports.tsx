// src/components/admin/Reports.tsx
import React, { useRef, useState } from "react";
import { 
  TrendingUp, 
  Calendar, 
  Users, 
  DollarSign,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import { useServices } from "../../context/ServiceContext";

/**
 * @component Reports
 * 
 * Componente para visualizar reportes y análisis estadísticos del negocio.
 * Muestra métricas clave, rendimiento por barbero, análisis por día y por servicio.
 */
const Reports: React.FC = () => {
  // Hooks para acceder a los datos de la aplicación
  const { barbers, bookings } = useBarbers();
  const { services } = useServices();
  
  // Estados para los filtros del reporte
  const [dateRange, setDateRange] = useState("30"); // Rango de días para el filtro
  const [selectedBarber, setSelectedBarber] = useState("all"); // Filtro por barbero
  const printRef = useRef<HTMLDivElement>(null); // Ref para la sección imprimible

  // --- Lógica de Filtrado y Cálculo de Estadísticas ---

  // Mapeo de servicios por ID para un acceso rápido
  const serviceById = Object.fromEntries(services.map(s => [s.id, s]));
  
  // Filtra las reservas según el rango de fechas y el barbero seleccionado
  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    const daysAgo = new Date();
    daysAgo.setDate(daysAgo.getDate() - parseInt(dateRange));
    const inRange = bookingDate >= daysAgo;
    const matchesBarber = selectedBarber === "all" || booking.barberId === selectedBarber;
    const isCompleted = booking.status === 'completed';
    return inRange && matchesBarber && isCompleted;
  });

  // Métricas clave
  const totalBookings = filteredBookings.length;
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + (serviceById[b.serviceId]?.price || 0), 0);
  const averageBookingsPerDay = parseInt(dateRange) > 0 ? totalBookings / parseInt(dateRange) : 0;

  // Estadísticas de rendimiento por barbero
  const barberStats = barbers.map(barber => {
    const barberBookings = filteredBookings.filter(booking => booking.barberId === barber.id);
    const revenue = barberBookings.reduce((sum, b) => sum + (serviceById[b.serviceId]?.price || 0), 0);
    return {
      ...barber,
      bookings: barberBookings.length,
      revenue,
    };
  }).sort((a, b) => b.bookings - a.bookings);

  // Estadísticas de reservas por día de la semana
  const weekdayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const weekdayCounts: Record<string, number> = weekdayNames.reduce((acc, name) => ({ ...acc, [name]: 0 }), {} as Record<string, number>);
  filteredBookings.forEach(b => {
    const dayIdx = new Date(b.date).getDay();
    weekdayCounts[weekdayNames[dayIdx]]++;
  });
  const dayStats = weekdayNames.map(day => ({ day, bookings: weekdayCounts[day] }));

  // --- Manejadores de Eventos ---

  /**
   * Exporta el reporte a PDF utilizando la funcionalidad de impresión del navegador.
   */
  const handleExportReport = () => {
    const content = printRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank', 'width=1024,height=768');
    if (!printWindow) return;

    const styles = `
      <style>
        body { font-family: sans-serif; color: #111827; }
        .container { padding: 24px; }
        h1 { font-size: 20px; margin-bottom: 12px; }
        hr { margin: 16px 0; border-top: 1px solid #e5e7eb; }
        /* Oculta elementos no deseados en la impresión */
        @media print { .no-print { display: none; } }
      </style>
    `;

    const barberName = selectedBarber === 'all' ? 'Todos' : (barbers.find(b => b.id === selectedBarber)?.name || 'N/A');

    printWindow.document.write(`
      <html>
        <head><title>Reporte - GoodCut</title>${styles}</head>
        <body>
          <div class="container">
            <h1>Reporte de Rendimiento - GoodCut</h1>
            <p>Periodo: Últimos ${dateRange} días | Barbero: ${barberName}</p>
            <hr />
            ${content.innerHTML}
          </div>
          <script>window.onload = () => { window.print(); setTimeout(window.close, 300); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  /**
   * Simula la actualización de datos.
   */
  const handleRefreshData = () => {
    alert("Datos actualizados (simulación)");
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-dark">Reportes y Análisis</h1>
          <p className="text-gray-600 mt-1">Análisis de rendimiento y estadísticas del negocio</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleRefreshData} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <RefreshCw size={16} /> Actualizar
          </button>
          <button onClick={handleExportReport} className="flex items-center gap-2 bg-golden text-dark font-semibold px-4 py-2 rounded-lg">
            <Download size={16} /> Exportar PDF
          </button>
        </div>
      </div>

      {/* Filtros del Reporte */}
      <div className="bg-white rounded-xl p-4 shadow-lg border no-print">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <label className="text-sm font-medium">Período:</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-3 py-1 border rounded-lg text-sm">
              <option value="7">Últimos 7 días</option>
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 90 días</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Barbero:</label>
            <select value={selectedBarber} onChange={(e) => setSelectedBarber(e.target.value)} className="px-3 py-1 border rounded-lg text-sm">
              <option value="all">Todos los barberos</option>
              {barbers.map(barber => <option key={barber.id} value={barber.id}>{barber.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Contenido del Reporte (para visualización y exportación) */}
      <div ref={printRef}>
        {/* Métricas Clave */}
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

        {/* Gráficos y Tablas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Rendimiento por Barbero */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
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

          {/* Análisis por Día de la Semana */}
          <div className="bg-white rounded-xl p-6 shadow-lg border">
            <h3 className="text-lg font-semibold text-dark mb-4">Análisis por Día de la Semana</h3>
            <div className="space-y-3">
              {dayStats.map((day) => (
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

        {/* Análisis de Servicios */}
        <div className="bg-white rounded-xl p-6 shadow-lg border mt-6">
          <h3 className="text-lg font-semibold text-dark mb-4">Análisis de Servicios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => {
              const serviceBookings = filteredBookings.filter(b => b.serviceId === service.id);
              const serviceRevenue = serviceBookings.reduce((sum) => sum + service.price, 0);
              return (
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
                    <span className="text-green-600 font-medium">{serviceBookings.length} reservas</span>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">Ingresos aprox: ${serviceRevenue}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
