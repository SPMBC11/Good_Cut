import { useBarbers } from "../../context/BarberContext";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Clock, Users, Star, DollarSign } from "lucide-react";

export default function BarberDashboard() {
  const { barbers, bookings } = useBarbers();
  const userEmail = localStorage.getItem("userEmail");

  // Barbero logueado
  const currentBarber = barbers.find(b => (b as any).email === userEmail);

  if (!currentBarber) {
    return <div>Cargando datos del barbero...</div>;
  }

  // --- Estadísticas ---
  const today = new Date().toDateString();
  const barberBookings = bookings.filter(b => b.barberId === currentBarber.id);
  const todayBookings = barberBookings.filter(
    b => new Date(b.date).toDateString() === today
  );

  const totalClientsToday = todayBookings.length;
  const averageRating = currentBarber.rating;
  const estimatedIncome = todayBookings.length * 25000; // Precio simulado
  const recurringClients = Math.floor(Math.random() * 10) + 5; // Simulado

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Bienvenido, {currentBarber.name} 👋
      </h1>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Citas Hoy */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Citas Hoy</p>
              <p className="text-3xl font-bold text-dark">{totalClientsToday}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Clientes Recurrentes */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Clientes Recurrentes
              </p>
              <p className="text-3xl font-bold text-dark">{recurringClients}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Calificación */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Calificación Promedio
              </p>
              <p className="text-3xl font-bold text-dark">{averageRating}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Ingresos */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Ingresos de Hoy
              </p>
              <p className="text-3xl font-bold text-dark">
                ${estimatedIncome.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Próximas citas y actividad */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Citas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {todayBookings.slice(0, 5).map(booking => (
                <li
                  key={booking.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {booking.customerName} - {booking.serviceId}
                  </span>
                  <span className="font-semibold">{booking.time}</span>
                </li>
              ))}
              {todayBookings.length === 0 && (
                <p className="text-gray-500">No tienes citas para hoy.</p>
              )}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">
              Aún no hay actividad reciente para mostrar.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}