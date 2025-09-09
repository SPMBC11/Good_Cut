import React, { useState, useEffect } from "react";
import { useSettings } from "../../context/SettingsContext";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const { settings, updateSetting } = useSettings();

  // Estado local para los datos del formulario, inicializado con los valores globales
  const [localSettings, setLocalSettings] = useState(settings);

  // Sincroniza el estado local con el global cuando el global cambia
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Helper para renderizar los campos de input
  const renderInputField = (label: string, settingKey: keyof typeof settings, type: string = "text", placeholder: string = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={localSettings[settingKey] as string}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSettings(prev => ({ ...prev, [settingKey]: e.target.value }))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
      />
    </div>
  );

  // Manejador para guardar los cambios del tab activo
  const handleSaveChanges = () => {
    // Aquí podrías añadir lógica para guardar solo los cambios del tab activo
    // Por simplicidad, actualizamos todos los settings del estado local al global
    for (const key in localSettings) {
      updateSetting(key as keyof typeof settings, localSettings[key as keyof typeof settings]);
    }
    alert("Cambios guardados!"); // Feedback al usuario
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Configuración del Sistema</h1>

      {/* Tabs de Navegación */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("general")}
          className={`py-2 px-4 text-sm font-medium ${activeTab === "general" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          General
        </button>
        <button
          onClick={() => setActiveTab("pagos")}
          className={`py-2 px-4 text-sm font-medium ${activeTab === "pagos" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Pagos
        </button>
        <button
          onClick={() => setActiveTab("notificaciones")}
          className={`py-2 px-4 text-sm font-medium ${activeTab === "notificaciones" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Notificaciones
        </button>
        <button
          onClick={() => setActiveTab("personalizacion")}
          className={`py-2 px-4 text-sm font-medium ${activeTab === "personalizacion" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
        >
          Personalización
        </button>
      </div>

      {/* Contenido de las Pestañas */}
      <div className="space-y-6">
        {activeTab === "general" && (
          <div className="space-y-4">
            {renderInputField("Nombre de la Barbería", "barberiaName", "text", "Good Cut")}
            {renderInputField("Dirección", "address", "text", "Calle 123, Bogotá")}
            {renderInputField("Teléfono", "phone", "text", "+57 300 000 0000")}
            {renderInputField("Horario de Atención", "schedule", "text", "Lun - Sáb: 9:00am - 7:00pm")}
            <button onClick={handleSaveChanges} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar Cambios
            </button>
          </div>
        )}

        {activeTab === "pagos" && (
          <div className="space-y-4">
            {renderInputField("Número Nequi", "nequiNumber", "text", "")}
            {renderInputField("Número Daviplata", "daviplataNumber", "text", "")}
            {renderInputField("Otros Métodos", "otherPaymentMethods", "text", "Efectivo, Tarjeta, etc.")}
            <button onClick={handleSaveChanges} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar Cambios
            </button>
          </div>
        )}

        {activeTab === "notificaciones" && (
          <div className="space-y-4">
            {renderInputField("Mensaje de Confirmación de Reserva", "bookingConfirmationMessage", "text", "Su cita ha sido confirmada...")}
            {renderInputField("Mensaje de Recordatorio de Cita", "appointmentReminderMessage", "text", "Recuerde su cita mañana a las...")}
            <button onClick={handleSaveChanges} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar Cambios
            </button>
          </div>
        )}

        {activeTab === "personalizacion" && (
          <div className="space-y-4">
            {renderInputField("URL del Logo", "logoUrl", "text", "https://ejemplo.com/logo.png")}
            {renderInputField("Color Principal", "primaryColor", "color", "#FFD700")}
            {renderInputField("Texto de Bienvenida", "welcomeText", "text", "Bienvenido a Good Cut")}
            <button onClick={handleSaveChanges} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}