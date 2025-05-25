const mongoose = require('mongoose');

const canchaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoCancha', required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriaDeporte', required: true },
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Cancha', canchaSchema);
