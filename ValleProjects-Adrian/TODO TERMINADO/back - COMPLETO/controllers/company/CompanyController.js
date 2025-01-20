import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authModel } from '../../models/auth/authModel.js';

const saltRounds = 10;
const secretKey = process.env.SECRETKEY_COMPANY;

class CompanyController {
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
            const hashedPassword = await bcrypt.hash(password, saltRounds);

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

    // Iniciar sesión para empresas
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

export { CompanyController };
