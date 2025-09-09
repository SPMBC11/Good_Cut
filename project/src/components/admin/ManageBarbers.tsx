// src/components/admin/ManageBarbers.tsx
import React, { useState } from "react";
import { Plus, Users, Search, Filter } from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import BarberForm from "./BarberForm";
import BarberList from "./BarberList";
import type { Barber } from "../../types";

/**
 * @component ManageBarbers
 * 
 * Componente principal para la gestión de barberos en el panel de administración.
 * Permite ver, buscar, crear y editar barberos.
 */
const ManageBarbers: React.FC = () => {
  // Estado para el ID del barbero que se está editando
  const [editingId, setEditingId] = useState<string | null>(null);
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para mostrar/ocultar el formulario de creación/edición
  const [showForm, setShowForm] = useState(false);
  // Hook para acceder a la lista de barberos del contexto
  const { barbers } = useBarbers();

  // Filtra los barberos según el término de búsqueda en nombre o especialidad
  const filteredBarbers = barbers.filter(barber =>
    barber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barber.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /**
   * Maneja la acción de crear un nuevo barbero, mostrando el formulario.
   */
  const handleNewBarber = () => {
    setEditingId(null); // Asegura que no estamos en modo edición
    setShowForm(true);
  };

  /**
   * Maneja la acción de editar un barbero, estableciendo el ID y mostrando el formulario.
   * @param {Barber} barber - El barbero a editar.
   */
  const handleEditBarber = (barber: Barber) => {
    setEditingId(barber.id);
    setShowForm(true);
  };

  /**
   * Se ejecuta cuando el formulario se cierra, reseteando los estados de edición.
   */
  const handleFormFinished = () => {
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Gestión de Barberos</h1>
          <p className="text-gray-600 mt-1">Administra la información de tus barberos</p>
        </div>
        <button
          onClick={handleNewBarber}
          className="flex items-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Nuevo Barbero
        </button>
      </div>

      {/* Tarjetas de estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total de barberos */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Barberos</p>
              <p className="text-xl font-bold text-dark">{barbers.length}</p>
            </div>
          </div>
        </div>
        
        {/* Barberos activos (simulado) */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Barberos Activos</p>
              <p className="text-xl font-bold text-dark">{barbers.length}</p>
            </div>
          </div>
        </div>
        
        {/* Calificación promedio */}
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Promedio Rating</p>
              <p className="text-xl font-bold text-dark">
                {barbers.length > 0 
                  ? (barbers.reduce((sum, barber) => sum + barber.rating, 0) / barbers.length).toFixed(1)
                  : "0.0"
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar barberos por nombre o especialidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={20} />
            Filtros
          </button>
        </div>
      </div>

      {/* Contenido principal: Lista y Formulario */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Columna de la lista de barberos */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-dark">
                Lista de Barberos ({filteredBarbers.length})
              </h2>
            </div>
            <div className="p-4">
              {filteredBarbers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm ? "No se encontraron barberos con ese criterio" : "No hay barberos registrados"}
                  </p>
                </div>
              ) : (
                <BarberList 
                  barbers={filteredBarbers} 
                  onEdit={handleEditBarber} 
                />
              )}
            </div>
          </div>
        </div>

        {/* Columna del formulario de creación/edición */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-dark">
                {editingId ? "Editar Barbero" : "Nuevo Barbero"}
              </h2>
            </div>
            <div className="p-4">
              {showForm || editingId ? (
                <BarberForm 
                  editId={editingId} 
                  onFinished={handleFormFinished} 
                />
              ) : (
                <div className="text-center py-8">
                  <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Agrega un nuevo barbero</p>
                  <button
                    onClick={handleNewBarber}
                    className="bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Crear Barbero
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageBarbers;
