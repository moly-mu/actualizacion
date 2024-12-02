
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";


const Reg = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [firstLastName, setFirstLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [confirmDocumentNumber, setConfirmDocumentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (
      !firstName ||
      !firstLastName ||
      !documentNumber ||
      !email ||
      !password ||
      !termsAccepted
    ) {
      setError("Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (documentNumber !== confirmDocumentNumber) {
      setError("El número de documento no coincide.");
      return;
    }

    if (email !== confirmEmail) {
      setError("El correo electrónico no coincide.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    setSuccessMessage("¡Registro exitoso! Redirigiendo...");
    setTimeout(() => {
      navigate("/login");
      onClose();
    }, 2000);
  };


  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-4xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Primer nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />
          
          <input
            type="text"
            placeholder="Segundo nombre"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Primer apellido"
            value={firstLastName}
            onChange={(e) => setFirstLastName(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            placeholder="Segundo apellido"
            value={secondLastName}
            onChange={(e) => setSecondLastName(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          >
            <option value="">Seleccione el tipo de documento</option>
            <option value="RC">Registro civil</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="CE">Cédula de extranjería</option>
            <option value="NIT">NIT</option>
            <option value="PEP">Permiso especial de permanencia</option>
          </select>
          <div></div> 
          
          <input
            type="text"
            placeholder="Número de documento"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            placeholder="Confirmar número de documento"
            value={confirmDocumentNumber}
            onChange={(e) => setConfirmDocumentNumber(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="email"
            placeholder="Confirmar correo electrónico"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-lg px-4 py-2"
            required
          />

          <div className="col-span-2 flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
              required
            />

            <label className="text-sm text-gray-700">
              He leído y acepto los{" "}
              <a href="#" className="text-blue-800 underline">
                Términos y condiciones
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-[#00102D] text-white py-2 px-4 rounded hover:bg-blue-700">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

Reg.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Reg;

