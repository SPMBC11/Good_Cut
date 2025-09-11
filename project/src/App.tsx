// src/App.tsx

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/client/LoadingSpinner";
import Home from "./components/client/Home";
import Login from "./components/admin/Login";
import NotFound from "./components/client/NotFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import { BarberProvider } from "./context/BarberContext";
import { ServiceProvider } from "./context/ServiceContext";
import { SettingsProvider } from "./context/SettingsContext"; // Importar SettingsProvider

/**
 * @component PrivateRoute
 * 
 * Componente de orden superior para proteger rutas.
 * Verifica si el usuario es administrador (`isAdmin` en `localStorage`).
 * Si no es administrador, redirige a la página de login.
 * 
 * @param {{ children: React.ReactElement }} props - Propiedades del componente, `children` es el componente a renderizar si la ruta es privada.
 * @returns {React.ReactElement} El componente hijo o una redirección.
 */
function PrivateRoute({ children }: { children: React.ReactElement }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
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
        <SettingsProvider> {/* Envuelve AdminDashboard con SettingsProvider */}
          <BrowserRouter>
            <Routes>
              {/* Ruta principal de la aplicación */}
              <Route path="/" element={<Home />} />

              {/* Ruta para el inicio de sesión de administradores */}
              <Route path="/login" element={<Login />} />

              {/* Ruta protegida para el panel de administración */}
              <Route 
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* Ruta para páginas no encontradas (404) */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SettingsProvider>
      </ServiceProvider>
    </BarberProvider>
  );
}

export default App;