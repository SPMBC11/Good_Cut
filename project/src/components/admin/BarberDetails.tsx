import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Star, Phone, User } from "lucide-react";
import { useBarbers } from "../../context/BarberContext";
import type { Barber } from "../../types";

/**
 * @interface BarberDetailsProps
 * @property {Barber} barber - El objeto del barbero a mostrar.
 * @property {(barber: Barber) => void} [onEdit] - Callback para editar el barbero (modo admin).
 * @property {(id: string) => void} [onDelete] - Callback para eliminar el barbero (modo admin).
 * @property {(barber: Barber) => void} [onBook] - Callback para reservar una cita (modo usuario).
 * @property {boolean} [isAdmin] - Flag para determinar si la vista es de administrador.
 */
interface BarberDetailsProps {
  barber: Barber;
  onEdit?: (barber: Barber) => void;
  onDelete?: (id: string) => void;
  onBook?: (barber: Barber) => void;
  isAdmin?: boolean;
}

/**
 * @component BarberDetails
 * 
 * Muestra los detalles de un barbero en una tarjeta.
 * Tiene una vista para administradores con opciones de edición y borrado,
 * y una vista para usuarios con la opción de reservar.
 * 
 * @param {BarberDetailsProps} props - Propiedades del componente.
 * @returns {React.FC}
 */
const BarberDetails: React.FC<BarberDetailsProps> = ({
  barber,
  onEdit,
  onDelete,
  onBook,
  isAdmin = false,
}) => {
  // Hook para acceder a las reservas desde el contexto
  const { bookings } = useBarbers();

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg rounded-2xl overflow-hidden">
      {/* Imagen del barbero */}
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
        {/* Información del barbero */}
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

        {/* Sección de citas (solo visible para administradores) */}
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

        {/* Botones de acción dinámicos según el rol (admin/usuario) */}
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
