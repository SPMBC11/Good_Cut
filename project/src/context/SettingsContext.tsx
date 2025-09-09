import React, { createContext, useContext, useEffect, useState } from "react";

// 1. Define la interfaz para las opciones de configuración
export interface AppSettings {
  barberiaName: string;
  address: string;
  phone: string;
  schedule: string;
  nequiNumber: string;
  daviplataNumber: string;
  otherPaymentMethods: string;
  bookingConfirmationMessage: string;
  appointmentReminderMessage: string;
  logoUrl: string; // Podría ser una URL o base64
  primaryColor: string; // Color principal en formato hex
  welcomeText: string;
}

// 2. Define la interfaz para el contexto
interface SettingsContextProps {
  settings: AppSettings;
  updateSetting: (key: keyof AppSettings, value: string | number) => void;
  // Podrías añadir funciones para guardar/cargar explícitamente si no usas useEffect
}

// 3. Crea el contexto
const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

// 4. Define el proveedor del contexto
export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Valores por defecto para la configuración
  const defaultSettings: AppSettings = {
    barberiaName: "Good Cut",
    address: "Cl. 138 #52a-2 a 52a-100, Bogotá, Colombia",
    phone: "+57 300 123 4567",
    schedule: "Lun - Sáb: 9:00am - 7:00pm",
    nequiNumber: "",
    daviplataNumber: "",
    otherPaymentMethods: "Efectivo, Tarjeta",
    bookingConfirmationMessage: "Su cita ha sido confirmada. ¡Le esperamos!",
    appointmentReminderMessage: "Recordatorio: Su cita es mañana.",
    logoUrl: "",
    primaryColor: "#D4AF37", // Golden principal
    welcomeText: "Bienvenido a Good Cut",
  };

  // Estado para la configuración, inicializado desde localStorage o con valores por defecto
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem("appSettings");
      return saved ? JSON.parse(saved) : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // Persistir la configuración en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem("appSettings", JSON.stringify(settings));
    } catch (error) {
      console.error("Error al guardar la configuración en localStorage:", error);
    }
  }, [settings]);

  // Función para actualizar una configuración específica
  const updateSetting = (key: keyof AppSettings, value: string | number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting }}>
      {children}
    </SettingsContext.Provider>
  );
};

// 5. Hook personalizado para usar el contexto de configuración
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings debe usarse dentro de un SettingsProvider");
  }
  return context;
};
