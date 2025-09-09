import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  BarChart, 
  Calendar, 
  Scissors, 
  Settings,
  LogOut,
  Clock,
  Star,
  UserCheck
} from "lucide-react";
import ManageBarbers from "./ManageBarbers";
import ManageBookings from "./ManageBookings";
import ManageServices from "./ManageServices";
import WalkInCuts from "./WalkInCuts";
import Reports from "./Reports";
import NotificationToast from "./NotificationToast";
import { useBarbers } from "../../context/BarberContext";
import  SettingsPage from "./SettingsPage";


/**
 * @component AdminDashboard
 * 
 * El panel de administración principal. 
 * Permite a los administradores gestionar barberos, reservas, servicios y ver reportes.
 * Es el componente central que renderiza las diferentes vistas de administración.
 */
export default function AdminDashboard() {
  // Estado para controlar la vista actual (ej. "dashboard", "barbers")
  const [view, setView] = useState("dashboard");
  // Estado para controlar la visibilidad del menú lateral en móviles
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Hook para acceder a los datos globales de la aplicación
  const { barbers, bookings, notifications, clearNotifications } = useBarbers();

  // --- Cálculo de Estadísticas para el Dashboard ---
  const totalBarbers = barbers.length;
  const totalBookings = bookings.length;
  const averageRating = barbers.length > 0 
    ? (barbers.reduce((sum, barber) => sum + barber.rating, 0) / barbers.length).toFixed(1)
    : "0.0";
  const todayBookings = bookings.filter(booking => 
    new Date(booking.date).toDateString() === new Date().toDateString()
  ).length;

  // --- Definición de los Items del Menú de Navegación ---
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "barbers", label: "Barberos", icon: Users },
    { id: "bookings", label: "Reservas", icon: Calendar },
    { id: "walkins", label: "Cortes Sin Reserva", icon: UserCheck },
    { id: "services", label: "Servicios", icon: Scissors },
    { id: "reports", label: "Reportes", icon: BarChart },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  /**
   * Cierra la sesión del administrador, eliminando los datos de `localStorage`
   * y redirigiendo a la página de inicio.
   */
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- Menú Lateral (Sidebar) --- */}
      <aside className={`w-72 bg-dark text-white flex flex-col shadow-2xl lg:relative fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Encabezado del Sidebar */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-golden rounded-lg flex items-center justify-center">
              <Scissors className="w-6 h-6 text-dark" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Good Cut</h1>
              <p className="text-sm text-gray-400">Panel de Administración</p>
            </div>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setSidebarOpen(false); // Cierra el menú en móvil al seleccionar una opción
                }}
                className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition-all duration-200 ${
                  view === item.id
                    ? "bg-golden text-dark font-semibold shadow-lg"
                    : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Botón de Cerrar Sesión */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-xl w-full text-left text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200"
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Overlay para cerrar el menú en móvil */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- Contenido Principal --- */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        {/* Encabezado del Contenido Principal */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Botón para abrir/cerrar menú en móvil */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {/* Título de la vista actual */}
              <h2 className="text-2xl font-bold text-dark">
                {menuItems.find(item => item.id === view)?.label}
              </h2>
            </div>
            {/* Fecha actual */}
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </header>

        {/* Contenido dinámico según la vista seleccionada */}
        <div className="p-6">
          {view === "dashboard" && (
            <div className="space-y-6">
              {/* Tarjetas de Estadísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Barberos */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Barberos</p>
                      <p className="text-3xl font-bold text-dark">{totalBarbers}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                {/* Reservas Totales */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Reservas Totales</p>
                      <p className="text-3xl font-bold text-dark">{totalBookings}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                {/* Citas Hoy */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
                      <p className="text-3xl font-bold text-dark">{todayBookings}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>

                {/* Calificación Promedio */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Calificación Promedio</p>
                      <p className="text-3xl font-bold text-dark">{averageRating}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actividad Reciente y Barberos Destacados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Actividad Reciente */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-dark mb-4">Actividad Reciente</h3>
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-golden rounded-full flex items-center justify-center">
                          <UserCheck className="w-4 h-4 text-dark" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-dark">{booking.customerName}</p>
                          <p className="text-sm text-gray-600">{booking.date} - {booking.time}</p>
                        </div>
                      </div>
                    ))}
                    {bookings.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No hay actividad reciente</p>
                    )}
                  </div>
                </div>

                {/* Barberos Destacados */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-semibold text-dark mb-4">Barberos Destacados</h3>
                  <div className="space-y-3">
                    {barbers
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 3)
                      .map((barber) => (
                        <div key={barber.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <img 
                            src={barber.image} 
                            alt={barber.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-dark">{barber.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm text-gray-600">{barber.rating}/5</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {barbers.length === 0 && (
                      <p className="text-gray-500 text-center py-4">No hay barberos registrados</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Renderiza el componente de gestión correspondiente a la vista */}
          {view === "barbers" && <ManageBarbers />}
          {view === "bookings" && <ManageBookings />}
          {view === "walkins" && <WalkInCuts />}
          {view === "services" && <ManageServices />}
          {view === "reports" && <Reports />}
          {view === "settings" && <SettingsPage />}
        </div>
      </main>

      {/* Componente de Notificaciones Toast */}
      <NotificationToast 
        notifications={notifications} 
        onClear={clearNotifications} 
      />
    </div>
  );
}
