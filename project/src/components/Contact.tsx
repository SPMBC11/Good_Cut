import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular envío de formulario
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    alert('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-light">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
          <span className="text-golden font-pacifico">Contáctanos</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Información de contacto */}
        <div className="space-y-8">
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold text-dark mb-6">Información de Contacto</h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-golden mt-1" />
                <div>
                  <h4 className="font-semibold text-dark">Dirección</h4>
                  <p className="text-gray-600">
                    Cl. 138 #52a-2 a 52a-100<br />Bogotá, Colombia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-golden mt-1" />
                <div>
                  <h4 className="font-semibold text-dark">Teléfono</h4>
                  <p className="text-gray-600">+57 300 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-golden mt-1" />
                <div>
                  <h4 className="font-semibold text-dark">Email</h4>
                  <p className="text-gray-600">info@goodcut.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-golden mt-1" />
                <div>
                  <h4 className="font-semibold text-dark">Horarios</h4>
                  <div className="text-gray-600">
                    <p>Lun - Vie: 9:00 AM - 8:00 PM</p>
                    <p>Sáb: 9:00 AM - 6:00 PM</p>
                    <p>Dom: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div
            className="rounded-lg h-64 overflow-hidden animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.258821550891!2d-74.05871552603412!3d4.725045141448158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f853fcbc4d10f%3A0x375fea53ef831137!2sCl.%20138%20%2352a-2%20a%2052a-100%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1756394754942!5m2!1ses!2sco"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Good Cut"
            ></iframe>
          </div>
        </div>

        {/* Formulario */}
        <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-2xl font-bold text-dark mb-6">Envíanos un Mensaje</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full p-6 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden focus:border-transparent transition-all duration-300"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-golden hover:bg-golden-dark text-dark font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="small" color="text-dark" />
                  <span className="ml-2">Enviando...</span>
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
