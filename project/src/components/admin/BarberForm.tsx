// src/components/admin/BarberForm.tsx
import React, { useState, useEffect } from "react";
import { User, Scissors, Clock, Star, Phone, Image, Save, X } from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import type { Barber } from "../../types";

interface BarberFormProps {
  editId: string | null;       // 🔹 id del barbero a editar
  onFinished: () => void;      // 🔹 callback al terminar (crear/editar)
}

const BarberForm: React.FC<BarberFormProps> = ({ editId, onFinished }) => {
  const { barbers, addBarber, updateBarber } = useBarbers();
  const [form, setForm] = useState<Omit<Barber, "id">>({
    name: "",
    specialty: "",
    experience: "",
    image: "",
    rating: 0,
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // 🔹 Si editamos, cargamos los datos en el formulario
  useEffect(() => {
    if (editId) {
      const barber = barbers.find((b) => b.id === editId);
      if (barber) {
        setForm({
          name: barber.name,
          specialty: barber.specialty,
          experience: barber.experience,
          image: barber.image,
          rating: barber.rating,
          phone: barber.phone,
        });
      }
    } else {
      // reset si no hay edición
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de guardado
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (editId) {
      // ✅ ahora pasamos UN SOLO objeto Barber
      updateBarber({ id: editId, ...form });
    } else {
      addBarber({ id: Date.now().toString(), ...form });
    }
    
    setIsLoading(false);
    onFinished(); // 🔹 reseteamos edición
  };

  const handleCancel = () => {
    onFinished();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Preview de la imagen */}
      {form.image && (
        <div className="text-center">
          <img
            src={form.image}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-200"
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

      {/* Especialidad */}
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

      {/* Experiencia */}
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

      {/* Teléfono */}
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

      {/* Calificación */}
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

      {/* URL de Imagen */}
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
          Ingresa la URL de una imagen del barbero
        </p>
      </div>

      {/* Botones */}
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
