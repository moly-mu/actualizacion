import React, { useState } from "react";
import { FaCode, FaPaintBrush, FaLanguage, FaChartLine, FaClipboard, FaBalanceScale, FaDollarSign, FaCogs } from "react-icons/fa";

const Main = () => {
  const [selectedOffer, setSelectedOffer] = useState(null); // Estado para manejar la oferta seleccionada

  // Información de las ofertas
  const offers = [
    { id: 1, title: "IT y programación", description: "Ofertas relacionadas con desarrollo de software y tecnología.", icon: <FaCode /> },
    { id: 2, title: "Diseño y multimedia", description: "Ofertas de diseño gráfico, diseño UX/UI, y multimedia.", icon: <FaPaintBrush /> },
    { id: 3, title: "Traducción y contenidos", description: "Trabajos relacionados con escritura, traducción y edición.", icon: <FaLanguage /> },
    { id: 4, title: "Marketing y ventas", description: "Vacantes en marketing digital, ventas y estrategias de mercado.", icon: <FaChartLine /> },
    { id: 5, title: "Soporte administrativo", description: "Ofertas para asistentes administrativos y soporte de oficina.", icon: <FaClipboard /> },
    { id: 6, title: "Legales", description: "Trabajos para abogados y consultores legales.", icon: <FaBalanceScale /> },
    { id: 7, title: "Finanzas y administración", description: "Oportunidades en finanzas, contabilidad y administración.", icon: <FaDollarSign /> },
    { id: 8, title: "Ingeniería y manufactura", description: "Vacantes para ingenieros y expertos en manufactura.", icon: <FaCogs /> },
  ];

  return (
    <main>
      {/* Imagen principal */}
      <div className="relative">
        <img
          src="public/Imagen de WhatsApp 2024-12-05 a las 16.58.47_958f3855.jpg"
          alt="Personas en reunión"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "340px",
            objectFit: "cover",
          }}
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl md:text-4xl font-bold bg-black bg-opacity-50 p-4 rounded text-center">
          Encuentra tu lugar en el mundo laboral
        </h1>
      </div>

      {/* Ofertas */}
      <section className="py-8 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Ofertas</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-5xl mx-auto">
          {offers.map((offer) => (
            <li
              key={offer.id}
              className={`cursor-pointer bg-gray-100 border border-gray-300 p-4 rounded text-center transition-transform duration-300 hover:scale-105 hover:bg-gray-200 hover:shadow-lg ${
                selectedOffer === offer.id ? "bg-gray-300" : ""
              }`}
              onClick={() => setSelectedOffer(offer.id)} // Establecer oferta seleccionada
            >
              <div className="text-4xl mb-2 text-blue-500">{offer.icon}</div>
              <p className="font-bold text-lg">{offer.title}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Detalles de la oferta seleccionada */}
      {selectedOffer && (
        <section className="py-8 bg-gray-50 border-t border-gray-300">
          <div className="max-w-4xl mx-auto px-4">
            <h3 className="text-xl font-bold mb-2">{offers.find((offer) => offer.id === selectedOffer).title}</h3>
            <p className="text-gray-700">
              {offers.find((offer) => offer.id === selectedOffer).description}
            </p>
          </div>
        </section>
      )}
    </main>
  );
};

export default Main;
