const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarios = [
  { id: 1, username: 'admin', passwordHash: bcrypt.hashSync('admin123', 10) },
];

let loginAttempts = {}; // Objeto para almacenar intentos fallidos

const MAX_ATTEMPTS = 2;
const ATTEMPT_WINDOW = 10 * 60 * 1000; // 10 minutos en milisegundos

const login = (req, res) => {
  const { username, password } = req.body;
  const userIp = req.ip;

  // Inicializar o incrementar el contador de intentos
  if (!loginAttempts[userIp]) {
    loginAttempts[userIp] = { count: 1, firstAttempt: Date.now() };
  } else {
    const attempts = loginAttempts[userIp];
    if (Date.now() - attempts.firstAttempt < ATTEMPT_WINDOW) {
      attempts.count++;
    } else {
      attempts.count = 1;
      attempts.firstAttempt = Date.now();
    }
  }

  // Comprobar si excede los intentos permitidos
  if (loginAttempts[userIp].count > MAX_ATTEMPTS) {
    return res.status(429).json({ redirect: "/verify-phone.html", message: "Demasiados intentos fallidos. Verificación requerida." });
  }

  // Buscar el usuario en la base de datos (aquí está en memoria como ejemplo)
  const usuario = usuarios.find(u => u.username === username);

  if (!usuario) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  // Comparar la contraseña con bcrypt
  bcrypt.compare(password, usuario.passwordHash, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear el token JWT con los datos del usuario
    const token = jwt.sign({ id: usuario.id, username: usuario.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Limpiar intentos fallidos al iniciar sesión exitosamente
    loginAttempts[userIp] = { count: 0, firstAttempt: Date.now() };

    // Enviar el token como cookie HTTP-only (segura)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600 * 1000,
    });

    res.json({ message: 'Inicio de sesión exitoso' });
  });
};

// Función para resetear los intentos fallidos después de la verificación del teléfono
const resetLoginAttempts = (req, res) => {
  const userIp = req.ip;
  loginAttempts[userIp] = { count: 0, firstAttempt: Date.now() };  // Resetear intentos
  res.json({ message: 'Intentos fallidos reseteados' });
};

const autenticarToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ error: 'Acceso denegado, no se encontró el token' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = { login, autenticarToken, logout, resetLoginAttempts };