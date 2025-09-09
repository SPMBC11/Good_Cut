// src/components/admin/NotificationToast.tsx
import React from 'react';
import { CheckCircle, X, Bell } from 'lucide-react';

/**
 * @interface NotificationToastProps
 * @property {string[]} notifications - Un array de mensajes de notificación a mostrar.
 * @property {() => void} onClear - Callback para limpiar/cerrar las notificaciones.
 */
interface NotificationToastProps {
  notifications: string[];
  onClear: () => void;
}

/**
 * @component NotificationToast
 * 
 * Muestra una o más notificaciones "toast" en la esquina superior derecha de la pantalla.
 * Las notificaciones aparecen con una animación y pueden ser descartadas.
 * 
 * @param {NotificationToastProps} props - Propiedades del componente.
 * @returns {React.FC | null}
 */
const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, onClear }) => {
  // No renderiza nada si no hay notificaciones
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm animate-fade-in-up"
          // Aplica un retraso a la animación para un efecto escalonado
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-3">
            {/* Icono de la notificación */}
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            {/* Contenido del mensaje */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Notificación</span>
              </div>
              <p className="text-sm text-gray-700">{notification}</p>
            </div>
            {/* Botón para cerrar */}
            <button
              onClick={onClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;