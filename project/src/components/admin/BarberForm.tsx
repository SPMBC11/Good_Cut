// src/components/admin/BarberForm.tsx

import React, { useState, useEffect } from "react";
import { User, Scissors, Clock, Star, Phone, Image, Save, X } from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import type { Barber } from "../../types";

/**
 * @interface BarberFormProps
 * @property {string | null} editId - El ID del barbero a editar. Si es nulo, el formulario es para crear un nuevo barbero.
 * @property {() => void} onFinished - Callback que se ejecuta cuando el formulario se cierra o la operación (crear/editar) ha terminado.
 */
interface BarberFormProps {
  editId: string | null;
  onFinished: () => void;
}

/**
 * Componente BarberForm
 * 
 * Formulario para crear o editar un barbero.
 * Utiliza el contexto de barberos para añadir o actualizar la información.
 * 
 * @param {BarberFormProps} props - Propiedades del componente.
 * @returns {React.FC}
 */
const BarberForm: React.FC<BarberFormProps> = ({ editId, onFinished }) => {
  // Hook para acceder al contexto de los barberos
  const { barbers, addBarber, updateBarber } = useBarbers();

  // Estado para el formulario del barbero
  const [form, setForm] = useState<Omit<Barber, "id">>({
    name: "",
    specialty: "",
    experience: "",
    image: "",
    rating: 0,
    phone: "",
  });

  // Estado para controlar la carga durante el envío del formulario
  const [isLoading, setIsLoading] = useState(false);

  /**
   * useEffect para cargar los datos del barbero cuando se edita.
   * Se ejecuta cuando `editId` o `barbers` cambian.
   */
  useEffect(() => {
    if (editId) {
      const barberToEdit = barbers.find((b) => b.id === editId);
      if (barberToEdit) {
        setForm({
          name: barberToEdit.name,
          specialty: barberToEdit.specialty,
          experience: barberToEdit.experience,
          image: barberToEdit.image,
          rating: barberToEdit.rating,
          phone: barberToEdit.phone,
        });
      }
    } else {
      // Resetea el formulario si no hay un barbero para editar
      setForm({
        name: "",
        specialty: "",
        experience: "",
        image: "",
        rating: 0,
        phone: "",
      });
    }
  }, [editId, barbers]);

  /**
   * Maneja el envío del formulario.
   * Previene el comportamiento por defecto, activa el estado de carga,
   * y luego añade o actualiza un barbero.
   * 
   * @param {React.FormEvent} e - Evento del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simula un pequeño retraso para dar feedback visual
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editId) {
      // Si hay un editId, actualiza el barbero existente
      updateBarber({ id: editId, ...form });
    } else {
      // Si no, crea un nuevo barbero con un ID temporal
      addBarber({ id: Date.now().toString(), ...form });
    }
    
    setIsLoading(false);
    onFinished(); // Llama al callback para cerrar el formulario
  };

  /**
   * Maneja la cancelación del formulario.
   * Simplemente llama al callback `onFinished`.
   */
  const handleCancel = () => {
    onFinished();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Preview de la imagen del barbero */}
      {form.image && (
        <div className="text-center">
          <img
            src={form.image}
            alt="Preview del barbero"
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
            onError={(e) => {
              // Oculta la imagen si hay un error al cargarla
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Campo: Nombre Completo */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <User size={16} />
          Nombre Completo
        </label>
        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Campo: Especialidad */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Scissors size={16} />
          Especialidad
        </label>
        <select
          value={form.specialty}
          onChange={(e) => setForm({ ...form, specialty: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
          required
        >
          <option value="">Selecciona una especialidad</option>
          <option value="Corte Clásico">Corte Clásico</option>
          <option value="Corte Moderno">Corte Moderno</option>
          <option value="Barba y Bigote">Barba y Bigote</option>
          <option value="Afeitado Tradicional">Afeitado Tradicional</option>
          <option value="Corte y Barba">Corte y Barba</option>
          <option value="Estilista Senior">Estilista Senior</option>
        </select>
      </div>

      {/* Campo: Años de Experiencia */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Clock size={16} />
          Años de Experiencia
        </label>
        <input
          type="text"
          placeholder="Ej: 5 años"
          value={form.experience}
          onChange={(e) => setForm({ ...form, experience: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Campo: Teléfono */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Phone size={16} />
          Teléfono
        </label>
        <input
          type="tel"
          placeholder="Ej: +1 234 567 8900"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
          required
        />
      </div>

      {/* Campo: Calificación */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Star size={16} />
          Calificación (1-5)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm font-medium text-gray-600 w-8">
            {form.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={`${
                star <= form.rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Campo: URL de Imagen */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Image size={16} />
          URL de Imagen
        </label>
        <input
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
        />
        <p className="text-xs text-gray-500">
          Ingresa la URL de una imagen para el barbero.
        </p>
      </div>

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
          className="flex-1 flex items-center justify-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-dark border-t-transparent rounded-full animate-spin" />
              <span>Guardando...</span>
            </>
          ) : (
            <>
              <Save size={16} />
              <span>{editId ? "Actualizar" : "Crear"} Barbero</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default BarberForm;
