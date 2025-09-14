import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  User, 
  BarChart, 
  Settings,
  LogOut,
  Scissors
} from "lucide-react";

/**
 * @component BarberLayout
 * 
 * Proporciona una estructura de diseño consistente para el panel del barbero.
 * Incluye un menú lateral de navegación y un área de contenido principal.
 */
export default function BarberLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // --- Definición de los Items del Menú de Navegación del Barbero ---
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/barber/dashboard" },
    { id: "agenda", label: "Mi Agenda", icon: Calendar, path: "/barber/agenda" },
    { id: "profile", label: "Mi Perfil", icon: User, path: "/barber/profile" },
    { id: "reports", label: "Mis Reportes", icon: BarChart, path: "/barber/reports" },
    { id: "settings", label: "Configuración", icon: Settings, path: "/barber/settings" },
  ];

  /**
   * Cierra la sesión del barbero, eliminando los datos de `localStorage`
   * y redirigiendo a la página de inicio.
   */
  const handleLogout = () => {
    localStorage.removeItem("isBarber");
    localStorage.removeItem("userEmail");
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
              <p className="text-sm text-gray-400">Panel de Barbero</p>
            </div>
          </div>
        </div>

        {/* Navegación Principal */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setSidebarOpen(false)} // Cierra el menú en móvil
                className={`flex items-center gap-3 p-3 rounded-xl w-full text-left transition-all duration-200 ${
                  isActive
                    ? "bg-golden text-dark font-semibold shadow-lg"
                    : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
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
                {menuItems.find(item => location.pathname.includes(item.path))?.label}
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

        {/* Contenido dinámico según la ruta */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
