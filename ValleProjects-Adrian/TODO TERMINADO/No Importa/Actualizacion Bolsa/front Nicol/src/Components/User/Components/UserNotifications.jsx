import { useState, useEffect } from "react";
import { FaBriefcase } from "react-icons/fa";

const UserNotifications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch("http://localhost:5000/api/jobs/user/aply", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Response is not an array");
        }

        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "pendiente":
        return "text-yellow-600";
      case "aceptada":
        return "text-green-600";
      case "rechazada":
        return "text-red-600";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  const handleViewResume = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/resumeu/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/jobs/application/${applicationId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting application: ${response.status}`);
      }

      setApplications((prevApplications) =>
        prevApplications.filter((application) => application.id !== applicationId)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Notificaciones del Usuario</h1>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Ofertas a las que has Aplicado</h2>
        {applications.length === 0 ? (
          <p className="text-sm text-gray-500 mt-2">No has aplicado a ninguna oferta aún.</p>
        ) : (
          <ul className="space-y-4">
            {applications.map((application) => (
              <li
                key={application.id}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex justify-between items-center transition-all duration-300 hover:bg-blue-50"
              >
                <div className="flex items-center space-x-3">
                  <FaBriefcase className="text-blue-600 text-xl" />
                  <span className="text-gray-700 font-medium">{application.job.title}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm font-semibold ${getStatusClass(application.status)}`}>
                    {application.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    {application.hojaDeVida ? (
                      <button
                        onClick={() => handleViewResume(application.userId)}
                        className="text-blue-600 hover:underline"
                      >
                        Ver hoja de vida
                      </button>
                    ) : (
                      "Sin hoja de vida"
                    )}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteApplication(application.id)}
                  className="text-red-600 hover:text-red-800 font-semibold text-sm ml-4"
                >
                  Eliminar mi postulación
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserNotifications;
