import mongoose from 'mongoose';

const archivoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  datos: {
    type: Buffer,
    required: true
  },
  usuarioId: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const upEmpresa = mongoose.model('empresa', archivoSchema);

export { upEmpresa };