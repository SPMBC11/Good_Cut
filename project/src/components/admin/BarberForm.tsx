// src/components/admin/BarberForm.tsx

import React, { useState, useEffect, useRef } from "react";
import { User, Scissors, Clock, Star, Phone, Image, Save, X, Mail, Lock } from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import type { Barber } from "../../types";
import bcrypt from "bcryptjs";

interface BarberFormProps {
  editId?: string;
  onFinished: () => void;
}

export const BarberForm: React.FC<BarberFormProps> = ({ editId, onFinished }) => {
  const { barbers, addBarber, updateBarber } = useBarbers();

  // Estado para los campos del formulario de barbero (sin la contraseña)
  const [form, setForm] = useState<Omit<Barber, "id" | "password">>({
    name: "",
    email: "",
    specialty: "",
    experience: "",
    image: "",
    rating: 0,
    phone: "",
  });
  // Estado para la contraseña (solo se usa al crear un nuevo barbero)
  const [password, setPassword] = useState("");
  // Estado para la confirmación de contraseña
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editId) {
      const barberToEdit = barbers.find((b) => b.id === editId);
      if (barberToEdit) {
        const { password, ...rest } = barberToEdit;
        setForm(rest);
      }
      setPassword(""); // Limpiar contraseña al editar
      setConfirmPassword("");
    } else {
      setForm({
        name: "",
        email: "",
        specialty: "",
        experience: "",
        image: "",
        rating: 0,
        phone: "",
      });
    }
  }, [editId, barbers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editId) {
      updateBarber({ id: editId, ...form });
    } else {
      // Solo para la creación de un nuevo barbero, se requiere contraseña
      if (!password || !confirmPassword) {
        setError("Por favor, ingresa y confirma la contraseña.");
        setIsLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        setIsLoading(false);
        return;
      }

      // Hashear la contraseña antes de guardarla
      const hashedPassword = bcrypt.hashSync(password, 10);

      addBarber({
        ...form,
        id: Date.now().toString(),
        password: hashedPassword,
      });
    }

    setIsLoading(false);
    onFinished();
  };

  const handleCancel = () => {
    onFinished();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Preview de la imagen */}
      {form.image && (
        <div className="text-center">
          <img
            src={form.image}
            alt="Preview"
            className="w-20 h-20 rounded-lg object-cover mx-auto border-2 border-gray-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Nombre */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <User size={16} />
          Nombre del Barbero
        </label>
        <input
          type="text"
          placeholder="Nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          required
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Mail size={16} />
          Correo Electrónico
        </label>
        <input
          type="email"
          placeholder="barbero@goodcut.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          required
        />
      </div>

      {/* Contraseña (solo para nuevos barberos) */}
      {!editId && (
        <>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={16} />
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Lock size={16} />
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
              required
            />
          </div>
        </>
      )}

      {/* Especialidad */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Scissors size={16} />
          Especialidad
        </label>
        <input
          type="text"
          placeholder="Ej: Cortes clásicos, Barba"
          value={form.specialty}
          onChange={(e) => setForm({ ...form, specialty: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          required
        />
      </div>

      {/* Experiencia */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Clock size={16} />
          Años de Experiencia
        </label>
        <input
          type="number"
          placeholder="5"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          required
        />
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Star size={16} />
          Calificación (1-5)
        </label>
        <input
          type="number"
          placeholder="4.5"
          step="0.1"
          min="1"
          max="5"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          required
        />
      </div>

      {/* Teléfono */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Phone size={16} />
          Teléfono
        </label>
        <input
          type="tel"
          placeholder="+57 300 123 4567"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          required
        />
      </div>

      {/* URL de Imagen */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Image size={16} />
          URL de Imagen
        </label>
        <input
          type="url"
          placeholder="https://ejemplo.com/barbero.jpg"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Botones de Acción */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <X size={16} />
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              {editId ? "Actualizar Barbero" : "Crear Barbero"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};
