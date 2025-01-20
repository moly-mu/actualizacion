const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      tipoDocumento,
      numeroDocumento,
      correoElectronico,
      contrasena,
      
    } = req.body;

    // Validar que todos los campos obligatorios estén presentes
    if (
      !primerNombre ||
      !primerApellido ||
      !tipoDocumento ||
      !numeroDocumento ||
      !correoElectronico ||
      !contrasena
    ) {
      return res.status(400).json({
        error: "Todos los campos obligatorios deben estar llenos.",
      });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.usuarioInfo.create({
      data: {
        primerNombre,
        segundoNombre: segundoNombre || null, // Opcional
        primerApellido,
        segundoApellido: segundoApellido || null, // Opcional
        tipoDocumento,
        numeroDocumento,
        correoElectronico,
        contrasena: hashedPassword,
      },
    });

    // Responder con el usuario creado
    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({
      error: "Ocurrió un error al registrar el usuario.",
    });
  }
};

module.exports = { registerUser };