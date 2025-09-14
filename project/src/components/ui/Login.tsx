import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Scissors, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import bcrypt from "bcryptjs";
import { useBarbers } from "../../context/BarberContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { barbers } = useBarbers();

  // --- Credenciales de admin (hardcoded) ---
  const adminUser = {
    email: "admin@barber.com",
    password: "admin123", // ← texto plano solo para el admin
    role: "admin",
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("All barbers:", barbers);
    console.log("Attempting to log in with email:", email);
    // 1. Comprobar si es el admin
    if (email === adminUser.email && password === adminUser.password) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("isBarber", "false");
      localStorage.setItem("userEmail", email);
      navigate("/admin");
      setIsLoading(false);
      return;
    }

    // 2. Si no es admin, buscar en la lista de barberos
    const barberUser = barbers.find((b) => b.email === email);
    console.log("Found barberUser:", barberUser);
    console.log("Password from form:", password);
    console.log("Hashed password from barberUser:", barberUser?.password);

    if (
      barberUser &&
      barberUser.password &&
      bcrypt.compareSync(password, barberUser.password)
    ) {
      localStorage.setItem("isBarber", "true");
      localStorage.setItem("isAdmin", "false");
      localStorage.setItem("userEmail", email);
      navigate("/barber/dashboard");
    } else {
      setError("Correo o contraseña incorrectos");
    }

    setIsLoading(false);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-gray-900 to-dark flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Botón volver */}
      <button
        onClick={handleBackToHome}
        className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-golden transition-colors z-10"
      >
        <ArrowLeft size={20} />
        <span>Volver al sitio</span>
      </button>

      <div className="relative w-full max-w-md">
        {/* Tarjeta de Login */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-golden rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-dark" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Good Cut</h1>
            <p className="text-gray-600">Accede a tu portal</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input
                  type="email"
                  placeholder="usuario@barber.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-golden hover:bg-golden-dark text-dark font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Credenciales demo */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-600 text-center mb-2">
              Credenciales de demostración:
            </p>
            <div className="text-xs text-gray-700 space-y-1">
              <p>
                <span className="text-golden font-semibold">Admin:</span>{" "}
                admin@barber.com / admin123
              </p>
              <p>
                <span className="text-golden font-semibold">Barbero:</span>{" "}
                (crear uno desde el panel de admin)
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            © 2024 Good Cut. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
