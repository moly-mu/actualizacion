import crypto from 'crypto';

// Genera una clave secreta de 256 bits (32 bytes) codificada en hexadecimal
// esta clave es para el .env SECRETKEY, uno para el usuario y otro para la empresa


const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);
