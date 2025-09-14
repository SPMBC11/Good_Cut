// src/components/barber/SettingsPage.tsx

import React, { useState } from 'react';
import { useBarbers } from '../../context/BarberContext';
import { Lock, Save } from 'lucide-react';

export default function SettingsPage() {
  const { barbers, changeBarberPassword } = useBarbers();
  const userEmail = localStorage.getItem('userEmail');
  const currentBarber = barbers.find(b => b.email === userEmail);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas nuevas no coinciden.');
      return;
    }

    if (!currentBarber) {
      setError('No se pudo encontrar al barbero actual.');
      return;
    }

    setIsLoading(true);
    try {
      await changeBarberPassword(currentBarber.id, oldPassword, newPassword);
      setSuccess('¡Contraseña actualizada con éxito!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError((err as Error).message);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Lock size={16} />
            Contraseña Actual
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Lock size={16} />
            Nueva Contraseña
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Lock size={16} />
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                <span>Guardando...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Actualizar Contraseña</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
