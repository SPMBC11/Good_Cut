// src/components/admin/NotificationToast.tsx
import React from 'react';
import { CheckCircle, X, Bell } from 'lucide-react';

interface NotificationToastProps {
  notifications: string[];
  onClear: () => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({ notifications, onClear }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Notificación</span>
              </div>
              <p className="text-sm text-gray-700">{notification}</p>
            </div>
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
