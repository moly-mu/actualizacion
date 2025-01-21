import mongoose from 'mongoose';

const archivoSchema = new mongoose.Schema({
  nombre: String,
  tipo: String,
  datos: Buffer,
  usuarioId: Number,
});

const upUser = mongoose.model('Usuarios', archivoSchema);

export { upUser };
