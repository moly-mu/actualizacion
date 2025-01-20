import { useState, useEffect } from "react";
import { FaUserAlt, FaUpload, FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';

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

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
      setFirstName(data.primerNombre);
      setSecondName(data.segundoNombre);
      setLastName(data.primerApellido);
      setSecondLastName(data.segundoApellido);

      const profilePictureResponse = await fetch("http://localhost:5000/api/users/profilepic", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!profilePictureResponse.ok) {
        throw new Error(`HTTP error! status: ${profilePictureResponse.status}`);
      }

      const profilePictureBlob = await profilePictureResponse.blob();
      const profilePictureUrl = URL.createObjectURL(profilePictureBlob);
      setProfilePictureUrl(profilePictureUrl);

      const resumeResponse = await fetch(`http://localhost:5000/api/users/resumeu/${data.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!resumeResponse.ok) {
        throw new Error(`HTTP error! status: ${resumeResponse.status}`);
      }

      const resumeBlob = await resumeResponse.blob();
      const resumeUrl = URL.createObjectURL(resumeBlob);
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
  };

  const handleResumeFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 100 * 1024 * 1024) { // 100 MB en bytes
      Swal.fire({
        title: 'Error',
        text: 'Su archivo no puede pesar más de 100 MB',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return; // Evita continuar con la carga del archivo
    }
    Swal.fire({
      title: '¿Deseas subir este archivo PDF?',
      showCancelButton: true,
      confirmButtonText: 'Subir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        setResumeFile(file);
        handleUpload(); 
      }
    });
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    if (profileImage) {
      formData.append("imagenPerfil", profileImage);
    }
    if (resumeFile) {
      formData.append("hojaDeVida", resumeFile);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
      setProfileImage(null);
      setResumeFile(null);
      fetchUserData(); // Refetch user data to update the profile picture and resume URL
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/users/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primerNombre: firstName,
          segundoNombre: secondName,
          primerApellido: lastName,
          segundoApellido: secondLastName,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data.user);
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleDeleteResume = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/users/deleteresume/${user.id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      Swal.fire({
        icon: 'success',
        title: '¡Hoja de Vida eliminada!',
        text: 'La hoja de vida se ha eliminado correctamente.',
      });
      setResumeUrl(null); // Elimina el enlace de la hoja de vida
      setResumeFile(null); // Limpia el archivo de la hoja de vida
    } catch (error) {
      console.error("Error eliminando la hoja de vida:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al intentar eliminar la hoja de vida.',
      });
    }
  };

  if (!user) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 ml-16">
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

          {/* Sección de Hoja de Vida */}
          <div className="border-b border-gray-300 pb-4">
            <p className="text-lg text-gray-800">
              <strong className="text-blue-600">
                <FaUpload className="inline-block mr-2 text-red-600" />
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
                  className="absolute top-2 right-2 px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
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
            <button
              onClick={() => document.getElementById('resumeFileInput').click()}
              className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
            >
              <FaUpload />
              {user.hojaDeVida ? "Actualizar Hoja de Vida" : "Subir Hoja de Vida"}
            </button>

            {/* Botón para eliminar la hoja de vida */}
            {user.hojaDeVida && (
              <button
                onClick={handleDeleteResume}
                className="mt-4 ml-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
              >
                Eliminar Hoja de Vida
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
