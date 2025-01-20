import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import axios from "axios"; // Importar axios para hacer la solicitud

const CrearOferta = () => {
  const [offerDetails, setOfferDetails] = useState({
    title: "",
    description: "",
    salary: "",
    location: "",
    company: "", // Añadir el campo company
  });

  useEffect(() => {
    const fetchCompanyName = async () => {
      const token = localStorage.getItem("token"); // Obtener el token de autenticación desde el almacenamiento local
      try {
        const response = await axios.get("http://localhost:5000/api/company/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const companyName = response.data.nombreEmpresa;
        setOfferDetails((prevDetails) => ({
          ...prevDetails,
          company: companyName,
        }));
      } catch (error) {
        console.error("Error al obtener el nombre de la empresa:", error);
      }
    };

    fetchCompanyName();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfferDetails({
      ...offerDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Obtener el token de autenticación desde el almacenamiento local

    try {
      // Hacer la solicitud a la API para crear la oferta
      const response = await axios.post("http://localhost:5000/api/jobs/create", offerDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mostrar SweetAlert2 con el mensaje de éxito
      await Swal.fire({
        title: "¡Oferta creada con éxito!",
        text: "La oferta ha sido creada correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      // Limpiar el formulario después de mostrar la alerta
      setOfferDetails({
        title: "",
        description: "",
        salary: "",
        location: "",
        company: offerDetails.company, // Restablecer el nombre de la empresa
      });
    } catch (error) {
      console.error("Error al crear la oferta:", error);
      // Mostrar SweetAlert2 con el mensaje de error
      await Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear la oferta. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-gray-600 p-4 md:p-6 rounded-xl shadow-xl mt-12 ml-64">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-extrabold text-black dark:text-white">
          Crear Nueva Oferta
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
          Completa el formulario para crear una nueva oferta de trabajo.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 text-black dark:text-white">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={offerDetails.title}
            onChange={handleChange}
            className="w-full px-2 py-1 md:px-3 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
            placeholder="Ejemplo: Desarrollador Frontend"
            required
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 text-black dark:text-white">
            Descripción
          </label>
          <textarea
            name="description"
            value={offerDetails.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-2 py-1 md:px-3 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
            placeholder="Detalles sobre el puesto..."
            required
          ></textarea>
        </div>

        {/* Salario */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 text-black dark:text-white">
            Salario
          </label>
          <input
            type="text"
            name="salary"
            value={offerDetails.salary}
            onChange={handleChange}
            className="w-full px-2 py-1 md:px-3 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
            placeholder="Ejemplo: $2000 - $3000 USD"
            required
          />
        </div>

        {/* Ubicación */}
        <div>
          <label className="block text-sm md:text-base font-semibold mb-1 text-black dark:text-white">
            Ubicación
          </label>
          <input
            type="text"
            name="location"
            value={offerDetails.location}
            onChange={handleChange}
            className="w-full px-2 py-1 md:px-3 md:py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md transition duration-300"
            placeholder="Ejemplo: Ciudad de México, Remoto"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-4 md:mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Crear Oferta
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearOferta;