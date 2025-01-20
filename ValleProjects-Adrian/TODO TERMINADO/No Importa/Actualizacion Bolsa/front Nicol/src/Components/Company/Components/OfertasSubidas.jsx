import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const OfertasSubidas = () => {
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [formDetails, setFormDetails] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
  });

  useEffect(() => {
    const fetchOffers = async () => {
      const token = localStorage.getItem("token"); // Obtener el token de autenticación desde el almacenamiento local
      try {
        const response = await axios.get("http://localhost:5000/api/jobs/empresa/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOffers(response.data);
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
      }
    };

    fetchOffers();
  }, []);

  const handleDelete = async (jobId) => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación desde el almacenamiento local
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOffers(offers.filter((offer) => offer.id !== jobId));
      Swal.fire({
        title: "¡Oferta eliminada!",
        text: "La oferta ha sido eliminada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al eliminar la oferta:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al eliminar la oferta. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleUpdate = async (jobId) => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación desde el almacenamiento local
    try {
      const response = await axios.put(`http://localhost:5000/api/jobs/${jobId}`, formDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOffers(offers.map((offer) => (offer.id === jobId ? response.data : offer)));
      Swal.fire({
        title: "¡Oferta actualizada!",
        text: "La oferta ha sido actualizada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      setSelectedOffer(null); // Cerrar el formulario modal
    } catch (error) {
      console.error("Error al actualizar la oferta:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar la oferta. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const openUpdateForm = (offer) => {
    setSelectedOffer(offer);
    setFormDetails({
      title: offer.title,
      description: offer.description,
      salary: offer.salary,
      location: offer.location,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-500 rounded-xl shadow-xl mt-12 ml-64">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
        Ofertas Subidas
      </h2>
      <div className="space-y-4 md:space-y-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-3 md:p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-gray-50 dark:bg-gray-800"
          >
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
              {offer.title}
            </h3>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2">
              {offer.description}
            </p>
            <div className="flex justify-between items-center text-xs md:text-sm text-gray-600 dark:text-gray-400">
              <p>
                💰 <strong>Salario:</strong> {offer.salary}
              </p>
              <p>
                📍 <strong>Ubicación:</strong> {offer.location}
              </p>
            </div>
            <div className="text-right mt-2">
              <button
                onClick={() => handleDelete(offer.id)}
                className="px-3 py-1 md:px-4 md:py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300"
              >
                Eliminar
              </button>
              <button
                onClick={() => openUpdateForm(offer)}
                className="ml-2 px-3 py-1 md:px-4 md:py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300"
              >
                Actualizar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOffer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Actualizar Oferta</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(selectedOffer.id);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900 dark:text-white">Título</label>
                <input
                  type="text"
                  name="title"
                  value={formDetails.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900 dark:text-white">Descripción</label>
                <textarea
                  name="description"
                  value={formDetails.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900 dark:text-white">Salario</label>
                <input
                  type="text"
                  name="salary"
                  value={formDetails.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-900 dark:text-white">Ubicación</label>
                <input
                  type="text"
                  name="location"
                  value={formDetails.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
                  required
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => setSelectedOffer(null)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition duration-300 mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertasSubidas;