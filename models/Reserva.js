const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  cancha: { type: mongoose.Schema.Types.ObjectId, ref: 'Cancha', required: true },
  fecha: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }
});

module.exports = mongoose.model('Reserva', reservaSchema);
