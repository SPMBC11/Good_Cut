// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Home from "./components/Home";
import Login from "./components/admin/Login";
import NotFound from "./components/NotFound";
import AdminDashboard from "./components/admin/AdminDashboard";
import { BarberProvider } from "./context/BarberContext";

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  return isAdmin ? children : <Navigate to="/login" replace />;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"> <LoadingSpinner size="large" /> </div>;

  return (
    <BarberProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </BarberProvider>
  );
}

export default App;
