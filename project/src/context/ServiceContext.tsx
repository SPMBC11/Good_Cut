// src/context/ServiceContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { services as defaultServices } from "../data/mockData";
import type { Service } from "../types";

/**
 * @interface ServiceContextProps
 * Define la forma de los datos y funciones que se proveerán en el contexto de servicios.
 */
interface ServiceContextProps {
  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  updateServiceStatus: (id: string, status: 'active' | 'inactive' | 'maintenance') => void;
  deleteService: (id: string) => void;
}

// Creación del contexto de React para los servicios
const ServiceContext = createContext<ServiceContextProps | undefined>(undefined);

/**
 * @component ServiceProvider
 * 
 * Proveedor de contexto que encapsula la lógica de estado para los servicios.
 * Utiliza `localStorage` para la persistencia de datos.
 */
export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para los servicios, inicializado desde localStorage o con datos por defecto
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const saved = localStorage.getItem("services");
      return saved ? JSON.parse(saved) as Service[] : defaultServices;
    } catch {
      return defaultServices;
    }
  });

  // Efecto para guardar los servicios en localStorage cada vez que cambian
  useEffect(() => {
    try {
      localStorage.setItem("services", JSON.stringify(services));
    } catch (error) {
      console.error("Error al guardar servicios en localStorage:", error);
    }
  }, [services]);

  // --- Funciones CRUD para Servicios ---

  const addService = (service: Service) => {
    const newService = { ...service, status: 'active' as const };
    setServices((prev) => [...prev, newService]);
  };
  
  const updateService = (service: Service) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
  };

  const updateServiceStatus = (id: string, status: 'active' | 'inactive' | 'maintenance') => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };
  
  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <ServiceContext.Provider value={{ 
      services, 
      addService, 
      updateService, 
      updateServiceStatus,
      deleteService
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

/**
 * @hook useServices
 * 
 * Hook personalizado para acceder fácilmente al ServiceContext.
 * Lanza un error si se usa fuera de un ServiceProvider.
 */
export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error("useServices debe usarse dentro de ServiceProvider");
  return context;
};