import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai"; // Icono para regresar
import { FcGoogle } from "react-icons/fc"; // Icono de Google
import { useNavigate } from "react-router-dom"; // Hook para la navegación
import Swal from "sweetalert2"; // Importar SweetAlert2

const RegisterPage = ({ onLoginClick, onRegister }) => {
  const navigate = useNavigate();
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [cedulaType, setCedulaType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [confirmIdNumber, setConfirmIdNumber] = useState(""); // Confirmación del número
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [idError, setIdError] = useState(""); // Error de confirmación de cédula
  const [errorMessage, setErrorMessage] = useState(""); // Error global de registro
  const [passwordError, setPasswordError] = useState(""); // Error de confirmación de contraseña

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos (excepto segundo nombre)
    if (!primerNombre || !primerApellido || !cedulaType || !idNumber || !email || !password || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos obligatorios.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
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

    // Validación de número de identificación
    if (idNumber !== confirmIdNumber) {
      setIdError("Los números de identificación no coinciden.");
      Swal.fire({
        icon: "error",
        title: "Error de identificación",
        text: "Los números de identificación no coinciden.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
      return;
    } else {
      setIdError("");
    }

    // Preparar los datos para el registro
    const userData = {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento: cedulaType, // Enviar tipo de documento como 'tipoDocumento'
      numeroDocumento: idNumber,
      email,
      password, // También enviar la contraseña
    };

    // Realizar la solicitud POST a la API
    try {
      const response = await fetch('http://localhost:5000/api/auth/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registro exitoso, redirigir al perfil
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "¡Tu cuenta ha sido creada exitosamente!",
          confirmButtonText: "Ir al perfil",
          confirmButtonColor: "#10b981",
        }).then(() => {
          navigate("/login");
        });
      } else {
        // Manejar errores de registro
        setErrorMessage(data.message || "Error al registrar el usuario.");
        Swal.fire({
          icon: "error",
          title: "Error de registro",
          text: data.message || "Error al registrar el usuario.",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#3b82f6",
        });
      }
    } catch (error) {
      setErrorMessage("Error de red. Por favor, inténtelo de nuevo más tarde.");
      Swal.fire({
        icon: "error",
        title: "Error de red",
        text: "Por favor, inténtelo de nuevo más tarde.",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3b82f6",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-2xl overflow-hidden w-full max-w-6xl">
        {/* Imagen lateral con altura ajustada */}
        <div className="hidden md:block md:w-1/2 relative">
          <img
            src="/no.jpeg" // Ruta a la imagen dentro de la carpeta public
            alt="Imagen usuario"
            className="h-[80%] w-full object-cover rounded-l-2xl transform transition-transform duration-300 ease-in-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-black opacity-30 rounded-l-2xl"></div> {/* Fondo oscuro para mejorar el contraste */}
        </div>

        {/* Formulario de registro */}
        <div className="w-full md:w-1/2 p-8 relative">
          {/* Botón para regresar */}
          <button
            onClick={() => navigate("/login")} // Navegar siempre a la página principal
            className="absolute top-4 left-4 p-2 text-gray-700 hover:text-gray-900 transition duration-300 ease-in-out rounded-full bg-white shadow-md"
          >
            <AiOutlineArrowLeft size={24} />
          </button>

          {/* Título de la página */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Registrarse
          </h2>

          {/* Formulario */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Sección de nombres */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Datos Personales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={primerNombre}
                  onChange={(e) => setPrimerNombre(e.target.value)}
                  placeholder="Primer nombre"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={segundoNombre}
                  onChange={(e) => setSegundoNombre(e.target.value)}
                  placeholder="Segundo nombre (opcional)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={primerApellido}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                  placeholder="Primer apellido"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={segundoApellido}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                  placeholder="Segundo apellido"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
            </div>

            {/* Sección de cédula */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Identificación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  value={cedulaType}
                  onChange={(e) => setCedulaType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Selecciona el tipo de cédula</option>
                  <option value="cc">Cédula de ciudadanía</option>
                  <option value="ce">Cédula de extranjería</option>
                </select>
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="Número de identificación"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <input
                  type="text"
                  value={confirmIdNumber}
                  onChange={(e) => setConfirmIdNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="Confirmar identificación"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              {idError && <p className="text-red-500 text-sm">{idError}</p>}
            </div>

            {/* Sección de correo electrónico */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-700">Correo electrónico</h3>
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
                  placeholder="Confirmar correo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            </div>

            {/* Sección de contraseña */}
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
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Registrarse
            </button>
          </form>

          {/* Opciones adicionales */}
          <div className="mt-6">
            <button className="w-full px-4 py-3 bg-white border text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none">
              <FcGoogle className="inline-block mr-2" />
              Continuar con Google
            </button>
          </div>

          <div className="mt-4 text-center">
            <p>
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={onLoginClick}
                className="text-blue-500 hover:underline"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;