import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  User,
  BarChart,
  Settings,
  LogOut,
} from "lucide-react";

export default function BarberSidebar() {
  return (
    <aside className="w-64 bg-black text-white h-screen flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-800">
        Good Cut <span className="text-yellow-400">Barber</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/barber/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
            }`
          }
        >
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/barber/agenda"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
            }`
          }
        >
          <Calendar size={20} /> Agenda
        </NavLink>

        <NavLink
          to="/barber/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
            }`
          }
        >
          <User size={20} /> Perfil
        </NavLink>

        <NavLink
          to="/barber/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
            }`
          }
        >
          <BarChart size={20} /> Reportes
        </NavLink>

        <NavLink
          to="/barber/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-yellow-500 text-black" : "hover:bg-gray-800"
            }`
          }
        >
          <Settings size={20} /> Configuración
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600 transition">
          <LogOut size={20} /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
