// src/components/admin/ManageServices.tsx
import React, { useState } from "react";
import {
  Scissors,
  DollarSign,
  Clock,
  Plus,
  Edit,
  Trash2,
  Search,
  Save,
  X,
} from "lucide-react";
import { useServices } from "../../context/ServiceContext";
import type { Service } from "../../types";

/**
 * @component ManageServices
 * 
 * Componente para la gestión de servicios en el panel de administración.
 * Permite a los administradores ver, buscar, crear, editar y eliminar servicios.
 */
const ManageServices: React.FC = () => {
  // Hooks y estados del componente
  const { services: serviceList, addService, updateService, updateServiceStatus, deleteService } = useServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Omit<Service, "id">>({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    image: "",
    status: "active",
  });

  // Filtra los servicios basándose en el término de búsqueda
  const filteredServices = serviceList.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Manejadores de eventos para el formulario ---

  /**
   * Prepara el formulario para crear un nuevo servicio.
   */
  const handleNewService = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      duration: 0,
      image: "",
      status: "active",
    });
    setShowForm(true);
  };

  /**
   * Prepara el formulario para editar un servicio existente.
   * @param {Service} service - El servicio a editar.
   */
  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
      status: service.status,
    });
    setShowForm(true);
  };

  /**
   * Actualiza el estado del formulario cuando el usuario escribe.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e - Evento de cambio.
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'duration' ? Number(value) : value }));
  };

  /**
   * Maneja el envío del formulario para crear o actualizar un servicio.
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      const updatedService: Service = {
        ...editingService,
        ...formData,
      };
      updateService(updatedService);
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...formData,
      };
      addService(newService);
    }
    setShowForm(false);
    setEditingService(null);
  };

  /**
   * Elimina un servicio tras confirmación.
   * @param {string} serviceId - ID del servicio a eliminar.
   */
  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      deleteService(serviceId);
    }
  };

  /**
   * Cancela la edición o creación y oculta el formulario.
   */
  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
  };

  // --- Funciones de ayuda para la UI ---

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Activo";
      case "inactive": return "Inactivo";
      case "maintenance": return "Mantenimiento";
      default: return "Activo";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  /**
   * Cambia el estado de un servicio (activo, inactivo, etc.).
   * @param {string} serviceId - ID del servicio.
   * @param {'active' | 'inactive' | 'maintenance'} newStatus - Nuevo estado.
   */
  const handleStatusChange = (serviceId: string, newStatus: 'active' | 'inactive' | 'maintenance') => {
    updateServiceStatus(serviceId, newStatus);
  };

  // --- Cálculos para las tarjetas de estadísticas ---
  const totalRevenue = serviceList.reduce((sum, service) => sum + service.price, 0);
  const averagePrice = serviceList.length > 0 ? totalRevenue / serviceList.length : 0;

  return (
    <div className="space-y-6">
      {/* Encabezado de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Gestión de Servicios</h1>
          <p className="text-gray-600 mt-1">Administra los servicios ofrecidos por la barbería</p>
        </div>
        <button
          onClick={handleNewService}
          className="flex items-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Nuevo Servicio
        </button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Servicios</p>
              <p className="text-xl font-bold text-dark">{serviceList.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Precio Promedio</p>
              <p className="text-xl font-bold text-dark">${averagePrice.toFixed(0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Duración Promedio</p>
              <p className="text-xl font-bold text-dark">
                {serviceList.length > 0
                  ? (
                      serviceList.reduce(
                        (sum, service) => sum + service.duration,
                        0
                      ) / serviceList.length
                    ).toFixed(0)
                  : "0"} min
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
          />
        </div>
      </div>

      {/* Contenido Principal: Lista y Formulario */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Lista de Servicios */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-dark">
                Lista de Servicios ({filteredServices.length})
              </h2>
            </div>
            <div className="p-4">
              {filteredServices.length === 0 ? (
                <div className="text-center py-8">
                  <Scissors className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    {searchTerm ? "No se encontraron servicios con ese criterio" : "No hay servicios registrados"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-dark">{service.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                              {getStatusText(service.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <DollarSign size={14} className="text-green-600" />
                                <span className="font-medium">${service.price}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock size={14} className="text-orange-600" />
                                <span>{service.duration} min</span>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleEditService(service)}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                title="Editar servicio"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteService(service.id)}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                title="Eliminar servicio"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <button
                              onClick={() => handleStatusChange(service.id, 'active')}
                              className={`px-2 py-1 text-xs rounded ${service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600 hover:bg-green-50'}`}
                              title="Marcar como activo"
                            >
                              Activo
                            </button>
                            <button
                              onClick={() => handleStatusChange(service.id, 'inactive')}
                              className={`px-2 py-1 text-xs rounded ${service.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600 hover:bg-red-50'}`}
                              title="Marcar como inactivo"
                            >
                              Inactivo
                            </button>
                            <button
                              onClick={() => handleStatusChange(service.id, 'maintenance')}
                              className={`px-2 py-1 text-xs rounded ${service.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'}`}
                              title="Marcar en mantenimiento"
                            >
                              Mantenimiento
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formulario de Creación/Edición */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-dark">
                {editingService ? "Editar Servicio" : "Nuevo Servicio"}
              </h2>
            </div>
            <div className="p-4">
              {showForm ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Preview de la imagen */}
                  {formData.image && (
                    <div className="text-center">
                      <img
                        src={formData.image}
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
                    <label className="text-sm font-medium text-gray-700">Nombre del Servicio</label>
                    <input
                      type="text"
                      placeholder="Ej: Corte Clásico"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    />
                  </div>

                  {/* Descripción */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      placeholder="Describe el servicio..."
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Precio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Precio ($)</label>
                    <input
                      type="number"
                      placeholder="0"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    />
                  </div>

                  {/* Duración */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Duración (minutos)</label>
                    <input
                      type="number"
                      placeholder="0"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    />
                  </div>

                  {/* URL de Imagen */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">URL de Imagen</label>
                    <input
                      type="url"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    />
                  </div>

                  {/* Estado del Servicio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Estado del Servicio</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    >
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                      <option value="maintenance">En Mantenimiento</option>
                    </select>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      type="button"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      {editingService ? "Actualizar" : "Crear"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <Plus className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Agrega un nuevo servicio</p>
                  <button
                    onClick={handleNewService}
                    className="bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    Crear Servicio
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

export default ManageServices;