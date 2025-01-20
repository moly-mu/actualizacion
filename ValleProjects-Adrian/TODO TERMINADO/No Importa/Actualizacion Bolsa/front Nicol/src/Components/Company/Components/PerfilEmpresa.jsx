import { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importar SweetAlert2
import axios from "axios";
import { FaBuilding, FaIdCard, FaIndustry, FaPhone, FaMapMarkerAlt } from "react-icons/fa"; // Importar iconos de react-icons

const PerfilEmpresa = () => {
  const [companyInfo, setCompanyInfo] = useState({
    razonSocial: "",
    nit: "",
    sector: "",
    telefono: "",
    nombreEmpresa: "",
    ubicacion: "",
  });

  const [logo, setLogo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtener el token de autenticación desde el almacenamiento local

    // Obtener la información de la empresa
    const fetchCompanyInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/company/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanyInfo(response.data);
      } catch (error) {
        console.error("Error al obtener la información de la empresa:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo obtener la información de la empresa.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    // Obtener la imagen de perfil de la empresa
    const fetchCompanyLogo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/company/per", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        });
        const imageUrl = URL.createObjectURL(response.data);
        setLogo(imageUrl);
      } catch (error) {
        console.error("Error al obtener la imagen de perfil de la empresa:", error);
      }
    };

    fetchCompanyInfo();
    fetchCompanyLogo();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    Swal.fire({
      title: '¿Deseas subir esta imagen de perfil?',
      showCancelButton: true,
      confirmButtonText: 'Subir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedFile(file);
      }
      const imageUrl = URL.createObjectURL(file);
      setLogo(imageUrl); 
    });
  };

  const handleEdit = () => {
    Swal.fire({
      title: "Editar Información de la Empresa",
      html: `
        <input type="text" id="razonSocial" class="swal2-input" placeholder="Razón Social" value="${companyInfo.razonSocial}">
        <input type="text" id="sector" class="swal2-input" placeholder="Sector" value="${companyInfo.sector}">
        <input type="text" id="telefono" class="swal2-input" placeholder="Teléfono" value="${companyInfo.telefono}" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
        <input type="text" id="nombreEmpresa" class="swal2-input" placeholder="Nombre de la Empresa" value="${companyInfo.nombreEmpresa}">
        <input type="text" id="ubicacion" class="swal2-input" placeholder="Ubicación" value="${companyInfo.ubicacion}">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {
        const razonSocial = Swal.getPopup().querySelector("#razonSocial").value;
        const sector = Swal.getPopup().querySelector("#sector").value;
        const telefono = Swal.getPopup().querySelector("#telefono").value;
        const nombreEmpresa = Swal.getPopup().querySelector("#nombreEmpresa").value;
        const ubicacion = Swal.getPopup().querySelector("#ubicacion").value;
        return { razonSocial, sector, telefono, nombreEmpresa, ubicacion };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        const updatedInfo = result.value;

        axios
          .put(
            "http://localhost:5000/api/company/perfil",
            updatedInfo,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            setCompanyInfo(updatedInfo);
            Swal.fire({
              title: "Éxito",
              text: "La información de la empresa ha sido actualizada.",
              icon: "success",
              confirmButtonText: "Aceptar",
            });
          })
          .catch((error) => {
            console.error("Error al actualizar la información de la empresa:", error);
            Swal.fire({
              title: "Error",
              text: "No se pudo actualizar la información de la empresa.",
              icon: "error",
              confirmButtonText: "Aceptar",
            });
          });
      }
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    try {
      // Actualizar la imagen de perfil de la empresa
      if (selectedFile) {
        const formData = new FormData();
        formData.append("imagenPerfil", selectedFile);

        await axios.put("http://localhost:5000/api/company/perfil/imagen", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        Swal.fire({
          title: "Éxito",
          text: "La imagen de perfil ha sido actualizada.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar la imagen de perfil.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleSubmit();
    }
  }, [selectedFile]);

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-gray-600 p-4 md:p-6 rounded-xl shadow-xl mt-12 ml-64 flex flex-col items-center space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white text-center mb-6">
        Perfil de la Empresa
      </h2>

      {/* Mostrar imagen de logotipo */}
      <div className="relative mb-6">
        <div className="w-48 h-48 md:w-64 md:h-64 bg-white dark:bg-gray-600 rounded-full overflow-hidden shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
          {logo ? (
            <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover rounded-full" onClick={() => document.getElementById('fileInput').click()} />
          ) : (
            <div
              className="w-48 h-48 md:w-64 md:h-64 bg-white dark:bg-gray-600 rounded-full overflow-hidden shadow-lg flex items-center justify-center cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <FaBuilding className="text-gray-500 dark:text-gray-300 text-4xl" />
            </div>
          )}
        </div>
        <input type="file" id="fileInput" onChange={handleFileChange} className="hidden" />
      </div>

      {/* Información de la empresa */}
      <div className="flex-grow space-y-4 md:space-y-6 w-full">
        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaBuilding className="text-blue-500 mr-2" />
            <label className="text-lg font-semibold text-black dark:text-white">
              Razón Social
            </label>
          </div>
          <p className="text-base text-black dark:text-white">{companyInfo.razonSocial}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaIdCard className="text-blue-500 mr-2" />
            <label className="text-lg font-semibold text-black dark:text-white">
              NIT
            </label>
          </div>
          <p className="text-base text-black dark:text-white">{companyInfo.nit}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaIndustry className="text-blue-500 mr-2" />
            <label className="text-lg font-semibold text-black dark:text-white">
              Sector
            </label>
          </div>
          <p className="text-base text-black dark:text-white">{companyInfo.sector}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaPhone className="text-blue-500 mr-2" />
            <label className="text-lg font-semibold text-black dark:text-white">
              Teléfono
            </label>
          </div>
          <p className="text-base text-black dark:text-white">{companyInfo.telefono}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaBuilding className="text-blue-500 mr-2" />
            <label className="text-lg font-semibold text-black dark:text-white">
              Nombre de la Empresa
            </label>
          </div>
          <p className="text-base text-black dark:text-white">{companyInfo.nombreEmpresa}</p>
        </div>

        <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <label className="text-lg font-semibold text-black dark:text-white">
              Ubicación
            </label>
          </div>
          <p className="text-base text-black dark:text-white">{companyInfo.ubicacion}</p>
        </div>

        <div className="text-right mt-4">
          <button
            onClick={handleEdit}
            className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Editar Información
          </button>
        </div>
      </div>
    </div>
  );
};
export default PerfilEmpresa;