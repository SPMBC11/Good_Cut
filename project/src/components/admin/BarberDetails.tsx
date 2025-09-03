import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Star, Phone, User } from "lucide-react";
import { useBarbers } from "../../context/BarberContext"; // 🔹 nuevo

interface Barber {
  id: string;
  name: string;
  specialty: string;
  experience: string; // <-- obligatorio aquí
  image: string;
  rating: number;
  phone: string;
}


interface BarberDetailsProps {
  barber: Barber;
  onEdit?: (barber: Barber) => void;
  onDelete?: (id: string) => void;
  onBook?: (barber: Barber) => void;
  isAdmin?: boolean;
}

const BarberDetails: React.FC<BarberDetailsProps> = ({
  barber,
  onEdit,
  onDelete,
  onBook,
  isAdmin = false,
}) => {
  const { bookings } = useBarbers(); // 🔹 accedemos a las reservas

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden">
      <img
        src={barber.image}
        alt={barber.name}
        className="w-full h-56 object-cover"
      />

      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-gray-600" />
          {barber.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-gray-700">
          <span className="font-semibold">Especialidad:</span>{" "}
          {barber.specialty}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Experiencia:</span>{" "}
          {barber.experience}
        </p>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-800">{barber.rating} / 5</span>
        </div>
        <p className="text-gray-700 flex items-center gap-2">
          <Phone className="w-5 h-5 text-gray-600" />
          {barber.phone}
        </p>

        {/* 🔹 Bloque de citas solo visible para admin */}
        {isAdmin && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Citas de este barbero:</h3>
            {bookings.filter((b) => b.barberId === barber.id).length === 0 ? (
              <p className="text-sm text-gray-500">Sin citas registradas</p>
            ) : (
              <ul className="text-sm text-gray-700 space-y-1">
                {bookings
                  .filter((b) => b.barberId === barber.id)
                  .map((b) => (
                    <li key={b.id} className="border-b pb-1">
                      <strong>{b.customerName}</strong> - {b.date} {b.time}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}

        {/* Botones dinámicos */}
        <div className="flex justify-between pt-4">
          {isAdmin ? (
            <>
              <Button
                variant="default"
                onClick={() => onEdit && onEdit(barber)}
              >
                Editar
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete && onDelete(barber.id)}
              >
                Eliminar
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={() => onBook && onBook(barber)}>
              Reservar cita
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BarberDetails;
