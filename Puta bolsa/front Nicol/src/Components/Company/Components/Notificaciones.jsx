import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaEnvelope, FaUserAlt, FaEye } from "react-icons/fa";

const Notificaciones = () => {
  const [applications, setApplications] = useState([]);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No se encontró token en localStorage.");
        return;
      }

      try {
        // Suponiendo que tienes una lista de IDs para recorrer
        const ids = [1, 2, 3]; // Ejemplo de IDs

        const requests = ids.map(id =>
          axios.get(`http://localhost:5000/api/jobs/${id}/applications/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        );

        const responses = await Promise.all(requests);
        const applications = responses.flatMap(response => response.data);

        setApplications(applications);
        setPendingApplications(applications.filter(app => app.status === "pendiente"));
        setAcceptedApplications(applications.filter(app => app.status === "aceptado"));
        setRejectedApplications(applications.filter(app => app.status === "rechazado"));
      } catch (error) {
        console.error("Error al obtener las aplicaciones:", error.message || error);
        if (error.response) {
          console.error("Detalles del error:", error.response.data);
        }
      }
    };

    fetchApplications();
  }, []);

  const createApplication = async (newApplication) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:5000/api/jobs/applications/", newApplication, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const createdApplication = response.data;
        setApplications([...applications, createdApplication]);
        setPendingApplications([...pendingApplications, createdApplication]);
      }
    } catch (error) {
      console.error("Error al crear la aplicación:", error);
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:5000/api/jobs/applications/${applicationId}/status`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPendingApplications(pendingApplications.filter(app => app.id !== applicationId));
      const updatedApp = pendingApplications.find(app => app.id === applicationId);

      if (status === "aceptado") {
        setAcceptedApplications([...acceptedApplications, { ...updatedApp, status }]);
      } else if (status === "rechazado") {
        setRejectedApplications([...rejectedApplications, { ...updatedApp, status }]);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de la aplicación:", error);
    }
  };

  const confirmUpdateStatus = (id, status) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres ${status === "aceptado" ? "aceptar" : "rechazar"} esta solicitud?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        updateApplicationStatus(id, status);
      }
    });
  };

  const viewResume = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`http://localhost:5000/api/users/resumee/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const fileURL = URL.createObjectURL(new Blob([response.data]));
      window.open(fileURL);
    } catch (error) {
      console.error("Error al obtener el resumen:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener el resumen. Por favor, inténtalo de nuevo.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const renderApplications = (title, applications) => (
    <>
      <h3 className="text-xl font-bold mb-4 text-gray-100 dark:text-white">{title}</h3>
      {applications.length > 0 ? (
        <table className="min-w-full bg-white dark:bg-gray-100">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Correo</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Fecha</th>
              {title === "Solicitantes Pendientes" && (
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">{app.user.primerNombre} {app.user.primerApellido}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">{app.user.correoElectronico}</td>
                <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">{new Date(app.fecha).toLocaleString()}</td>
                {title === "Solicitantes Pendientes" && (
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                    <button
                      onClick={() => app.id && confirmUpdateStatus(app.id, "aceptado")}
                      className="px-3 py-1 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition duration-300 mr-2"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={() => app.id && confirmUpdateStatus(app.id, "rechazado")}
                      className="px-3 py-1 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300 mr-2"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => app.userId && viewResume(app.userId)}
                      className="px-3 py-1 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300"
                    >
                      Ver Resumen
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No hay solicitudes en esta categoría.</p>
      )}
    </>
  );
  

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-white dark:bg-gray-700 rounded-xl shadow-xl mt-12 ml-64">
      <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
        Notificaciones
      </h2>
      <div className="space-y-8">
        {renderApplications("Solicitantes Pendientes", pendingApplications)}
        {renderApplications("Solicitantes Aceptados", acceptedApplications)}
        {renderApplications("Solicitantes Rechazados", rejectedApplications)}
      </div>
    </div>
  );
};

export default Notificaciones;