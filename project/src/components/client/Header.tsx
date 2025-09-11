import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext'; // Importar useSettings

/**
 * @interface HeaderProps
 * @property {(section: string) => void} onNavigate - Callback para navegar a una sección específica de la página.
 */
interface HeaderProps {
  onNavigate: (section: string) => void;
}

/**
 * @component Header
 * 
 * Encabezado de la aplicación con navegación adaptable.
 * Cambia de apariencia al hacer scroll y tiene un menú móvil.
 * 
 * @param {HeaderProps} props - Propiedades del componente.
 * @returns {React.FC}
 */
const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  // Estado para controlar el menú móvil
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para detectar si el usuario ha hecho scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Acceder a la configuración global
  const { settings } = useSettings();

  // Efecto para manejar el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Limpia el event listener al desmontar el componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Array con los enlaces de navegación
  const navigation = [
    { name: 'Inicio', href: 'hero' },
    { name: 'Servicios', href: 'services' },
    { name: 'Barberos', href: 'barbers' },
    { name: 'Reservar', href: 'booking' },
    { name: 'Contacto', href: 'contact' }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark/95 backdrop-blur-md shadow-lg' // Estilo cuando se hace scroll
          : 'bg-transparent' // Estilo inicial
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo y Nombre de la Barbería (dinámico) */}
          <div className="flex items-center space-x-2">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.barberiaName} className="h-8 w-auto" />
            ) : (
              <Scissors className="w-8 h-8 text-golden" />
            )}
            <span className="text-golden font-pacifico">{settings.barberiaName}</span>
          </div>

          {/* Navegación para Escritorio */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => onNavigate(item.href)}
                className="text-white hover:text-golden transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Botón del Menú Móvil */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-golden transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Panel de Navegación Móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark/95 backdrop-blur-md rounded-lg mb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 p-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.href);
                    setIsMenuOpen(false); // Cierra el menú al seleccionar una opción
                  }}
                  className="text-white hover:text-golden transition-colors duration-300 font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;