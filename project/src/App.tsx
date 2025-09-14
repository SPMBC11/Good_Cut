// src/App.tsx

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Home from "./components/client/Home";
import Login from "./components/ui/Login";
import NotFound from "./components/client/NotFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import { BarberProvider } from "./context/BarberContext";
import { ServiceProvider } from "./context/ServiceContext";
import { SettingsProvider } from "./context/SettingsContext"; // Importar SettingsProvider
import BarberLayout from "./components/barber/BarberLayout";
import BarberDashboard from "./components/barber/BarberDashboard";
import BarberAgenda from "./components/barber/BarberAgenda";
import BarberProfile from "./components/barber/BarberProfile";
import SettingsPage from "./components/barber/SettingsPage";

/**
 * @component AdminPrivateRoute
 * 
 * Componente de orden superior para proteger rutas de administrador.
 * Verifica si el usuario es administrador (`isAdmin` en `localStorage`).
 * Si no es administrador, redirige a la página de login.
 */
function AdminPrivateRoute({ children }: { children: React.ReactElement }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
}

/**
 * @component BarberPrivateRoute
 * 
 * Componente de orden superior para proteger rutas de barbero.
 * Verifica si el usuario es barbero (`isBarber` en `localStorage`).
 * Si no es barbero, redirige a la página de login.
 */
function BarberPrivateRoute({ children }: { children: React.ReactElement }) {
  const isBarber = localStorage.getItem("isBarber") === "true";
  return isBarber ? children : <Navigate to="/login" replace />;
}

/**
 * @component App
 * 
 * Componente principal de la aplicación.
 * Configura el enrutamiento y los proveedores de contexto.
 * Muestra un spinner de carga inicial.
 */
function App() {
  // Estado para gestionar la pantalla de carga inicial
  const [isLoading, setIsLoading] = useState(true);

  // Simula un tiempo de carga para mejorar la experiencia de usuario
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  // Muestra el spinner mientras la aplicación está cargando
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  // Renderiza la aplicación principal una vez que la carga ha terminado
return (
    <BarberProvider>
      <ServiceProvider>
        <SettingsProvider>
          <BrowserRouter>
            <Routes>
              {/* Ruta principal (cliente) */}
              <Route path="/" element={<Home />} />

              {/* Login */}
              <Route path="/login" element={<Login />} />

              {/* Admin */}
              <Route
                path="/admin"
                element={
                  <AdminPrivateRoute>
                    <AdminDashboard />
                  </AdminPrivateRoute>
                }
              />

              {/* Barber */}
              <Route
                path="/barber"
                element={
                  <BarberPrivateRoute>
                    <BarberLayout />
                  </BarberPrivateRoute>
                }
              >
                <Route path="dashboard" element={<BarberDashboard />} />
                <Route path="agenda" element={<BarberAgenda />} />
                <Route path="profile" element={<BarberProfile />} />
                <Route path="reports" element={<div>Reportes</div>} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SettingsProvider>
      </ServiceProvider>
    </BarberProvider>
  );
}

export default App;
