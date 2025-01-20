const crypto = require('crypto');

// Genera una clave secreta de 256 bits (32 bytes) codificada en hexadecimal
const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey);
