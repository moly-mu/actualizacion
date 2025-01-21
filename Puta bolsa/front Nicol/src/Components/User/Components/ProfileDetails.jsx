import { useState, useEffect } from "react";
import { FaUserAlt, FaIdCard, FaEnvelope, FaUpload, FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import axios from 'axios';

const ProfileDetails = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");

  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    if (!token) throw new Error("No token found");

    try {
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };

  const fetchProfilePicture = async () => {
    if (!token) throw new Error("No token found");

    try {
      const response = await axios.get("http://localhost:5000/api/users/profilepic", {
        headers: { "Authorization": `Bearer ${token}` },
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
      return "";
    }
  };

  const fetchResume = async (userId) => {
    if (!token) throw new Error("No token found");

    try {
      const response = await axios.get(`http://localhost:5000/api/users/resumeu/${userId}`, {
        headers: { "Authorization": `Bearer ${token}` },
        responseType: 'blob',
      });
      return URL.createObjectURL(response.data);
    } catch (error) {
      console.error("Error fetching resume:", error);
      return "";
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await fetchUserProfile();
      setUser(userData);
      setFirstName(userData.primerNombre);
      setSecondName(userData.segundoNombre);
      setLastName(userData.primerApellido);
      setSecondLastName(userData.segundoApellido);

      const profilePictureUrl = await fetchProfilePicture();
      setProfilePictureUrl(profilePictureUrl);

      const resumeUrl = await fetchResume(userData.id);
      setResumeUrl(resumeUrl);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Swal.fire({
        title: '¿Deseas subir esta imagen de perfil?',
        showCancelButton: true,
        confirmButtonText: 'Subir',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          setProfileImage(file);
        }
      });
    }
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Swal.fire({
        title: '¿Deseas subir este archivo PDF?',
        showCancelButton: true,
        confirmButtonText: 'Subir',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          setResumeFile(file);
        }
      });
    }
  };

  const handleUpload = async () => {
    if (!profileImage && !resumeFile) {
      Swal.fire('No se seleccionaron archivos para subir.');
      return;
    }

    try {
      if (profileImage) {
        const formDataImage = new FormData();
        formDataImage.append("imagenPerfil", profileImage);

        const responseImage = await axios.put(
          `http://localhost:5000/api/users/update/picture/${user.id}`,
          formDataImage,
          {
            headers: { "Authorization": `Bearer ${token}` },
          }
        );

        if (responseImage.data) {
          setUser(responseImage.data.user);
        }
      }

      if (resumeFile) {
        const formDataCV = new FormData();
        formDataCV.append("hojaDeVida", resumeFile);

        const responseCV = await axios.put(
          `http://localhost:5000/api/users/update/cv/${user.id}`,
          formDataCV,
          {
            headers: { "Authorization": `Bearer ${token}` },
          }
        );

        if (responseCV.data) {
          setUser(responseCV.data.user);
        }
      }

      setProfileImage(null);
      setResumeFile(null);
      fetchUserData(); // Recarga los datos del usuario
      Swal.fire('Archivos subidos correctamente.');

    } catch (error) {
      console.error("Error uploading files:", error);
      Swal.fire('Hubo un error al subir los archivos.');
    }
  };


  const updateUserName = async (userId, updatedData) => {
    if (!token) throw new Error("No token found");

    try {
      const response = await axios.put(`http://localhost:5000/api/users/update/basic/${userId}`, updatedData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.user;
    } catch (error) {
      console.error("Error updating user name:", error);
      throw error;
    }
  };

  const handleNameSave = async () => {
    try {
      const updatedUser = await updateUserName(user.id, {
        primerNombre: firstName,
        segundoNombre: secondName,
        primerApellido: lastName,
        segundoApellido: secondLastName,
      });
      setUser(updatedUser);
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  if (!user) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 ml-40">
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Perfil</h2>

        {/* Imagen de Perfil */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {user.imagenPerfil ? (
              <img
                src={profilePictureUrl}
                alt="Imagen de Perfil"
                className="w-32 h-32 rounded-full mx-auto cursor-pointer"
                onClick={() => document.getElementById('profileImageInput').click()}
              />
            ) : (
              <div
                className="w-32 h-32 rounded-full mx-auto bg-gray-200 flex items-center justify-center cursor-pointer"
                onClick={() => document.getElementById('profileImageInput').click()}
              >
                <FaUserAlt className="text-gray-500 text-4xl" />
              </div>
            )}
            <input
              type="file"
              id="profileImageInput"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Sección de nombre */}
          <div className="text-center">
            {isEditingName ? (
              <div className="flex flex-col items-center gap-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Primer Nombre"
                />
                <input
                  type="text"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Segundo Nombre"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Primer Apellido"
                />
                <input
                  type="text"
                  value={secondLastName}
                  onChange={(e) => setSecondLastName(e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder="Segundo Apellido"
                />
                <button
                  onClick={handleNameSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <p className="text-xl font-medium text-gray-800 flex justify-center items-center gap-2">
                <FaUserAlt className="inline-block mr-2 text-blue-600" />
                {`${user.primerNombre} ${user.segundoNombre || ""} ${user.primerApellido} ${user.segundoApellido || ""}`}
                <FaEdit className="inline-block cursor-pointer" onClick={handleNameEdit} />
              </p>
            )}
          </div>

          {/* Sección de Tipo de Documento */}
          <div className="border-b border-gray-300 pb-4">
            <p className="text-lg text-gray-800">
              <strong className="text-[#00102D]">
                <FaIdCard className="inline-block mr-2 text-[#3B82F6]" />
                Tipo de Documento:
              </strong>
              {user.tipoDocumento || "No especificado"}
            </p>
          </div>

          {/* Sección de Número de Documento */}
          <div className="border-b border-gray-300 pb-4">
            <p className="text-lg text-gray-800">
              <strong className="text-[#00102D]">
                <FaIdCard className="inline-block mr-2 text-[#3B82F6]" />
                Número de Documento:
              </strong>
              {user.numeroDocumento || "No especificado"}
            </p>
          </div>

          {/* Sección de Correo Electrónico */}
          <div className="border-b border-gray-300 pb-4">
            <p className="text-lg text-gray-800">
              <strong className="text-[#00102D]">
                <FaEnvelope className="inline-block mr-2 text-[#3B82F6]" />
                Correo Electrónico:
              </strong>
              {user.correoElectronico || "No especificado"}
            </p>
          </div>

          {/* Sección de Hoja de Vida */}
          <div className="border-b border-gray-300 pb-4">
            <p className="text-lg text-gray-800">
              <strong className="text-[#00102D]">
                <FaUpload className="inline-block mr-2 text-[#3B82F6]" />
                Hoja de Vida:
              </strong>
            </p>
            {resumeUrl ? (
              <div className="relative">
                <iframe
                  src={resumeUrl}
                  title="Hoja de Vida"
                  className="w-full h-64 border rounded-lg"
                ></iframe>
                <button
                  onClick={() => window.open(resumeUrl, '_blank')}
                  className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Ampliar
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No hay hoja de vida</p>
            )}
            <input
              type="file"
              id="resumeFileInput"
              accept="application/pdf"
              onChange={handleResumeFileChange}
              className="hidden"
            />
            <div className="flex gap-4 mt-4">
            <button
              onClick={() => document.getElementById('resumeFileInput').click()}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#1c345c] transition duration-300 shadow-md">
              <FaUpload />
              {user.hojaDeVida ? "Actualizar Hoja de Vida" : "Subir Hoja de Vida"}
            </button>
            <button
              onClick={handleUpload}
              className="mt-4 flex items-center justify-end gap-2 px-9 py-2 border-4 border-[#EAB308] text-[#EAB308] rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300 shadow-md">
              Actualizar Datos
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
