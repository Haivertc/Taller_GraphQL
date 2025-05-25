const Usuario = require('./models/Usuario');
const Cancha = require('./models/Cancha');
const Reserva = require('./models/Reserva');
const CategoriaDeporte = require('./models/CategoriaDeporte');
const TipoCancha = require('./models/TipoCancha');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    usuarios: async () => {
      return await Usuario.find();
    },

    usuario: async (_, { id }) => {
      return await Usuario.findById(id);
    },

    canchas: () => Cancha.find().populate('tipo categoria').lean(),

    cancha: async (_, { id }) => {
      const cancha = await Cancha.findById(id);
      return cancha;
    },

    reservas: async () => {
      return await Reserva.find().populate('usuario cancha');
    },
    reserva: (_, { id }) => Reserva.findById(id).populate('usuario cancha').lean(),

    categorias: () => CategoriaDeporte.find(),
    categoria: (_, { id }) => CategoriaDeporte.findById(id),

    tiposCancha: () => TipoCancha.find(),
    tipoCancha: (_, { id }) => TipoCancha.findById(id),
  },

  Mutation: {
    crearUsuario: async (_, { input }) => {
      const nuevoUsuario = new Usuario(input);
      return await nuevoUsuario.save();
    },

    crearCancha: async (_, { input }) => {
      const nuevaCancha = new Cancha({
        nombre: input.nombre,
        ubicacion: input.ubicacion,
        tipo: input.tipo,
        categoria: input.categoria,
      });

      const canchaGuardada = await nuevaCancha.save();
        return await canchaGuardada.populate(['tipo', 'categoria']);
    },

    crearReserva: async (_, { input }) => {
      const nuevaReserva = new Reserva({ ...input });
      await nuevaReserva.save();
      return await Reserva.findById(nuevaReserva._id)
      .populate('usuario')
      .populate('cancha');
    },

    crearCategoria: async (_, { input }) => {
      const nuevaCategoria = new CategoriaDeporte(input);
      return await nuevaCategoria.save();
    },

    crearTipoCancha: async (_, { input }) => {
      const nuevoTipo = new TipoCancha(input);
      return await nuevoTipo.save();
    },

    eliminarReserva: async (_, { id }) => {
      await Reserva.findByIdAndDelete(id);
      return 'Reserva eliminada correctamente';
    },

    cancelarReserva: async (_, { id }) => {
      const reserva = await Reserva.findById(id);
      if (!reserva) throw new Error('Reserva no encontrada');
      reserva.estado = 'cancelada';
      return await reserva.save();
    }
  }
};

module.exports = resolvers;
