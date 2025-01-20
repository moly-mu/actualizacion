import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import Swal from "sweetalert2"; // Importar SweetAlert2
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { FcGoogle } from "react-icons/fc"; // Importar ícono de Google

const RegisterEmpresaPage = ({ onRegisterEmpresa }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nit, setNit] = useState("");
  const [sector, setSector] = useState("");
  const [telefono, setTelefono] = useState("");
  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState(""); // Error de contraseñas

  const handleRegister = async (e) => {
    e.preventDefault(); // Evitar la validación predeterminada del navegador

    // Validación de campos vacíos
    if (!email || !confirmEmail || !password || !confirmPassword || !razonSocial || !nit || !sector || !telefono || !nombreEmpresa || !ubicacion) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos del formulario.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return; // Detener la ejecución si hay campos vacíos
    }

    // Validación de correos electrónicos
    if (email !== confirmEmail) {
      setEmailError("Los correos electrónicos no coinciden.");
      Swal.fire({
        icon: "error",
        title: "Error de correo",
        text: "Los correos electrónicos no coinciden.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) { // Validación del formato del correo
      setEmailError("El correo electrónico no es válido.");
      Swal.fire({
        icon: "error",
        title: "Error de correo",
        text: "Por favor, ingresa un correo electrónico válido.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else {
      setEmailError("");
    }

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      Swal.fire({
        icon: "error",
        title: "Error de contraseña",
        text: "Las contraseñas no coinciden.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else if (password.length < 6) { // Validación de la longitud mínima de la contraseña
      setPasswordError("La contraseña debe tener al menos 6 caracteres.");
      Swal.fire({
        icon: "error",
        title: "Error de contraseña",
        text: "La contraseña debe tener al menos 6 caracteres.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else if (!/[A-Z]/.test(password)) { // Validación de al menos una mayúscula
      setPasswordError("La contraseña debe contener al menos una letra mayúscula.");
      Swal.fire({
        icon: "error",
        title: "Error de contraseña",
        text: "La contraseña debe contener al menos una letra mayúscula.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else if (!/\d/.test(password)) { // Validación de al menos un número
      setPasswordError("La contraseña debe contener al menos un número.");
      Swal.fire({
        icon: "error",
        title: "Error de contraseña",
        text: "La contraseña debe contener al menos un número.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else {
      setPasswordError("");
    }

    // Datos del formulario para el registro
    const empresaData = {
      email,
      password,
      razonSocial,
      nit,
      sector,
      telefono,
      nombreEmpresa,
      ubicacion,
    };

    try {
      // Hacer la solicitud al backend para registrar la empresa
      const response = await fetch("http://localhost:5000/api/auth/register/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empresaData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir al perfil de la empresa después de registrarse
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡La empresa ha sido registrada exitosamente!",
          confirmButtonText: "Ir al perfil",
          confirmButtonColor: "#10b981",
        }).then(() => {
          navigate("/login-empresa");
        });
      } else {
        setEmailError(data.message || "Error al registrar la empresa.");
        Swal.fire({
          icon: "error",
          title: "Error de registro",
          text: data.message || "Error al registrar la empresa.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      console.error("Error de red:", error);
      setEmailError("Hubo un problema al intentar registrar la empresa.");
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "Hubo un problema al intentar registrar la empresa.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-4xl">
        {/* Imagen lateral con altura ajustada */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/si.jpeg"
            alt="Imagen empresa"
            className="h-[80%] w-full object-cover rounded-l-2xl transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-l-2xl"></div> {/* Fondo oscuro para mejorar el contraste */}
        </div>

        {/* Formulario de registro */}
        <div className="w-full md:w-1/2 p-8 relative">
          {/* Botón para regresar */}
          <button
            onClick={() => navigate("/login-empresa")} // Navegar siempre a la página principal
            className="absolute top-4 left-4 p-2 text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out rounded-full bg-white shadow-md"
          >
            <ChevronLeftIcon className="h-6 w-6" /> {/* Icono de flecha */}
          </button>

          {/* Título de la página */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Registrarse
          </h2>

          {/* Formulario */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Sección de Información de la Empresa */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Información de la Empresa</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={razonSocial}
                  onChange={(e) => setRazonSocial(e.target.value)}
                  placeholder="Razón social"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={nit}
                  onChange={(e) => setNit(e.target.value.replace(/\D/g, ""))}
                  placeholder="NIT"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="Sector"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
                  placeholder="Teléfono"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={nombreEmpresa}
                  onChange={(e) => setNombreEmpresa(e.target.value)}
                  placeholder="Nombre de la empresa"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Ubicación"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Sección de Información de Contacto */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Información de Contacto</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  placeholder="Confirmar correo electrónico"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Sección de Contraseña */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Contraseña</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmar contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Botón de registro */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Registrarse
            </button>

            {/* Botón para continuar con Google */}
            <button
              type="button"
              className="w-full py-3 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 mt-4"
            >
              <FcGoogle className="text-2xl mr-3" />
              Continuar con Google
            </button>

            {/* Enlace a la página de inicio de sesión */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Iniciar sesión
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmpresaPage;