const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Enums
  enum EstadoReserva {
    PENDIENTE
    CONFIRMADA
    CANCELADA
    FINALIZADA
  }

  # Tipos base
  type Usuario {
    id: ID!
    nombre: String!
    correo: String!
    rol: String!
  }

  type Cancha {
    id: ID!
    nombre: String!
    ubicacion: String!
    tipo: TipoCancha!
    categoria: CategoriaDeporte!
    disponible: Boolean!
  }

  type FranjaHoraria {
    horaInicio: String!
    horaFin: String!
  }

  type Reserva {
  id: ID!
  usuario: Usuario!
  cancha: Cancha!
  fecha: String!
  horaInicio: String!
  horaFin: String!
  estado: String!
}

  type CategoriaDeporte {
    id: ID!
    nombre: String!
  }

  type TipoCancha {
    id: ID!
    nombre: String!
    descripcion: String
  }

  type AuthPayload {
    token: String!
    usuario: Usuario!
  }

  # Entradas
  input UsuarioInput {
    nombre: String!
    correo: String!
    contrasena: String!
    rol: String
  }

  input CanchaInput {
    nombre: String!
    ubicacion: String!
    tipo: ID!
    categoria: ID!
  }

  input ReservaInput {
    usuario: ID!
    cancha: ID!
    fecha: String!
    horaInicio: String!
    horaFin: String!
  }

  input CategoriaDeporteInput {
    nombre: String!
  }

  input TipoCanchaInput {
    nombre: String!
    descripcion: String
  }

  # Consultas
  type Query {
    usuarios: [Usuario]
    usuario(id: ID!): Usuario

    canchas: [Cancha]
    cancha(id: ID!): Cancha

    reservas: [Reserva]
    reserva(id: ID!): Reserva
    reservasPorUsuario(usuarioId: ID!): [Reserva]
    reservasPorFecha(fecha: String!): [Reserva]
    reservasPorEstado(estado: EstadoReserva!): [Reserva]

    categorias: [CategoriaDeporte]
    categoria(id: ID!): CategoriaDeporte

    tiposCancha: [TipoCancha]
    tipoCancha(id: ID!): TipoCancha
  }

  # Mutaciones
  type Mutation {
    login(correo: String!, contrasena: String!): AuthPayload

    crearUsuario(input: UsuarioInput!): Usuario
    crearCancha(input: CanchaInput!): Cancha
    crearReserva(input: ReservaInput!): Reserva
    crearCategoria(input: CategoriaDeporteInput!): CategoriaDeporte
    crearTipoCancha(input: TipoCanchaInput!): TipoCancha

    actualizarReserva(id: ID!, input: ReservaInput!): Reserva
    cancelarReserva(id: ID!): Reserva
    eliminarReserva(id: ID!): String

    actualizarCancha(id: ID!, input: CanchaInput!): Cancha
    eliminarCancha(id: ID!): String
  }
`;

module.exports = typeDefs;
