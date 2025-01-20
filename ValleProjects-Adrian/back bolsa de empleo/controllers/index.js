const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');

const saltRounds = 10;
const secretKey = process.env.SECRETKEY;

class AuthController {
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


    // Registrar una nueva empresa
    static async registerCompany(req, res) {
        const { email, password, razonSocial, nit, sector, telefono, nombreEmpresa, ubicacion } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!email || !password || !razonSocial || !nit || !sector || !telefono || !nombreEmpresa || !ubicacion) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios para registrar una empresa.' });
        }

        try {
            // Verificar si el correo ya está registrado
            const existingCompany = await authModel.findCompanyByEmail(email);
            if (existingCompany) {
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear la empresa
            const newCompany = await authModel.createCompany({
                email: email,
                password: hashedPassword,
                razonSocial,
                nit,
                sector,
                telefono,
                nombreEmpresa,
                ubicacion,
            });

            return res.status(201).json({ message: 'Empresa registrada exitosamente.', data: newCompany });
        } catch (error) {
            console.error('Error al registrar la empresa:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }



    // Iniciar sesión
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
                    role: user.role.name,
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
    // empresa
    
    static async loginCompany(req, res) {
        const { email, password } = req.body;

        try {
            // Buscar empresa por correo
            const company = await authModel.findCompanyByEmail(email);

            if (!company) {
                return res.status(400).json({ message: 'Credenciales incorrectas.' });
            }

            // Comparar contraseñas
            const isMatch = await bcrypt.compare(password, company.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Credenciales incorrectas.' });
            }

            // Generar JWT
            const token = jwt.sign(
                {
                    id: company.id,
                    email: company.email,
                    role: 'empresa', // Asignar explícitamente el rol de empresa
                },
                secretKey,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
            return res.status(500).json({ message: 'Error interno del servidor.' });
        }
    }

}

module.exports = AuthController;
