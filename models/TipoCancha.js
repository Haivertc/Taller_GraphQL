const mongoose = require('mongoose');

const tipoCanchaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: String
});

module.exports = mongoose.model('TipoCancha', tipoCanchaSchema);
