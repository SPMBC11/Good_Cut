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
import Reports from "./Reports";
import NotificationToast from "./NotificationToast";
import { useBarbers } from "../../context/BarberContext";

export default function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { barbers, bookings, notifications, clearNotifications } = useBarbers();

  // Calcular estadísticas
  const totalBarbers = barbers.length;
  const totalBookings = bookings.length;
  const averageRating = barbers.length > 0 
    ? (barbers.reduce((sum, barber) => sum + barber.rating, 0) / barbers.length).toFixed(1)
    : "0.0";
  const todayBookings = bookings.filter(booking => 
    new Date(booking.date).toDateString() === new Date().toDateString()
  ).length;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "barbers", label: "Barberos", icon: Users },
    { id: "bookings", label: "Reservas", icon: Calendar },
    { id: "services", label: "Servicios", icon: Scissors },
    { id: "reports", label: "Reportes", icon: BarChart },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    window.location.href = "/";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`w-72 bg-dark text-white flex flex-col shadow-2xl lg:relative fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Header */}
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

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
                        <button
                key={item.id}
                onClick={() => {
                  setView(item.id);
                  setSidebarOpen(false);
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

        {/* Logout */}
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

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-2xl font-bold text-dark">
              {view === "dashboard" && "Dashboard"}
              {view === "barbers" && "Gestión de Barberos"}
              {view === "bookings" && "Reservas y Citas"}
              {view === "services" && "Servicios"}
              {view === "reports" && "Reportes y Análisis"}
              {view === "settings" && "Configuración"}
              </h2>
            </div>
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

        {/* Content */}
        <div className="p-6">
          {view === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {view === "barbers" && <ManageBarbers />}
          {view === "bookings" && <ManageBookings />}
          {view === "services" && <ManageServices />}
          {view === "reports" && <Reports />}
          {view === "settings" && (
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-dark mb-4">Configuración del Sistema</h3>
              <p className="text-gray-600">Configuraciones del sistema en desarrollo...</p>
            </div>
          )}
        </div>
      </main>

      {/* Notifications */}
      <NotificationToast 
        notifications={notifications} 
        onClear={clearNotifications} 
      />
    </div>
  );
}
