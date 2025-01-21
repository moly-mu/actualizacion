import mongoose from 'mongoose';

const archivoEmpresaSchema = new mongoose.Schema({
    nombre: String,
    tipo: String,
    datos: Buffer,
    empresaId: Number,
});

const upEmpresa = mongoose.model('empresas', archivoEmpresaSchema);

export { upEmpresa };