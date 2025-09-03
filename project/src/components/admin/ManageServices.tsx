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
  Image,
  Save,
  X
} from "lucide-react";
import { services } from "../../data/mockData";
import { useBarbers } from "../../context/BarberContext";
import type { Service } from "../../types";

const ManageServices: React.FC = () => {
  const [serviceList, setServiceList] = useState<Service[]>(services);
  const [searchTerm, setSearchTerm] = useState("");
  const { services, addService, updateService, deleteService } = useBarbers();
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null); // El servicio que se está editando
  const [formData, setFormData] = useState<Omit<Service, "id">>({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    image: "",
  });

  // Filtrar servicios
  const filteredServices = serviceList.filter(service =>
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewService = () => {
    setEditingService(null);
    setFormData({
      name: "",
      description: "",
      price: 0,
      duration: 0,
      image: "",
    });
    setShowForm(true);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
    });
    setShowForm(true);
  };

  const handleSaveService = () => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'duration' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que el formulario recargue la página
    if (editingService) {
      // Actualizar servicio existente
      setServiceList(prev => 
        prev.map(service => 
          service.id === editingService.id 
            ? { ...editingService, ...formData }
            : service
        )
      );
      updateService({ ...editingService, ...formData });
    } else {
      // Crear nuevo servicio
      const newService: Service = {
        id: Date.now().toString(),
        ...formData,
      };
      setServiceList(prev => [...prev, newService]);
      addService(newService);
    }
    
    setShowForm(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      setServiceList(prev => prev.filter(service => service.id !== serviceId));
      deleteService(serviceId);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingService(null);
  };

  const totalRevenue = serviceList.reduce((sum, service) => sum + service.price, 0);
  const averagePrice = serviceList.length > 0 ? totalRevenue / serviceList.length : 0;
  const totalRevenue = services.reduce((sum, service) => sum + service.price, 0);
  const averagePrice = services.length > 0 ? totalRevenue / services.length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Scissors className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Servicios</p>
              <p className="text-xl font-bold text-dark">{serviceList.length}</p>
              <p className="text-xl font-bold text-dark">{services.length}</p>
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
                  ? (serviceList.reduce((sum, service) => sum + service.duration, 0) / serviceList.length).toFixed(0)
                {services.length > 0 
                  ? (services.reduce((sum, service) => sum + service.duration, 0) / services.length).toFixed(0)
                  : "0"
                } min
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Services List */}
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
                          <h3 className="font-semibold text-dark mb-1">{service.name}</h3>
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
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-dark">
                {editingService ? "Editar Servicio" : "Nuevo Servicio"}
              </h2>
            </div>
            <div className="p-4">
              {showForm ? (
                <div className="space-y-4">
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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
                      onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
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
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    />
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCancel}
                      type="button" // Evita que este botón envíe el formulario
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <X size={16} />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveService}
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-golden hover:bg-golden-dark text-dark font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <Save size={16} />
                      {editingService ? "Actualizar" : "Crear"}
                    </button>
                  </div>
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

