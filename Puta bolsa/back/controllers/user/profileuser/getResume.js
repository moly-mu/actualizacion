import { upUser } from '../../../models/usr/upUser.js';
import { userModel } from '../../../models/usr/userModel.js';

const getResume = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID de usuario no válido.' });
    }

    try {
        const user = await userModel.getUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (!user.hojaDeVida) {
            return res.status(404).json({ message: 'Hoja de vida no encontrada.' });
        }

        const archivo = await upUser.findById(user.hojaDeVida);

        if (!archivo) {
            return res.status(404).json({ message: 'Archivo no encontrado.' });
        }

        res.set('Content-Type', archivo.tipo);
        return res.send(archivo.datos);
    } catch (error) {
        console.error('Error al obtener la hoja de vida:', error);
        return res.status(500).json({ message: 'Error al obtener la hoja de vida.' });
    }
};

export { getResume };
