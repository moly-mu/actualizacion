import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authModel } from '../../models/auth/authModel.js';

const saltRounds = 10;
const secretKey = process.env.SECRETKEY_USER;

class UserController {
    // Registrar un nuevo usuario
    static async registerUser(req, res) {
        const { email, password, primerNombre, primerApellido, tipoDocumento, numeroDocumento, ...extraData } = req.body;

        // Validación de los campos obligatorios
        if (!email || !password || !primerNombre || !primerApellido || !tipoDocumento || !numeroDocumento) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser completados.' });
        }

        try {
            // Verificar si el correo ya está registrado
            const existingUser = await authModel.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Crear el usuario en la base de datos
            const user = await authModel.createUser({
                correoElectronico: email,
                contrasena: hashedPassword,
                primerNombre,
                segundoNombre: extraData.segundoNombre || null,  // Segundo nombre puede ser opcional
                primerApellido,
                segundoApellido: extraData.segundoApellido || null,  // Segundo apellido puede ser opcional
                tipoDocumento,
                numeroDocumento,
                roleId: 1,  // 1 es el ID para 'usuario', puedes ajustarlo según el modelo de roles
                ...extraData,
            });

            return res.status(201).json({ message: 'Usuario registrado exitosamente', user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

    // Iniciar sesión para usuarios
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Buscar usuario por correo
            const user = await authModel.findUserByEmail(email);

            if (!user) {
                return res.status(400).json({ message: 'Credenciales incorrectas.' });
            }

            // Comparar contraseñas
            const isMatch = await bcrypt.compare(password, user.contrasena);

            if (!isMatch) {
                return res.status(400).json({ message: 'Credenciales incorrectas.' });
            }

            // Generar JWT
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.correoElectronico,
                    role: 'user',
                },
                secretKey,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }
}

export { UserController };
