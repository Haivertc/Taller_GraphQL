require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const startServer = async () => {
  const app = express();

  try {
    await mongoose.connect(process.env.MONGODB_URI, {

    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,  
  });

  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Servidor GraphQL corriendo en http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
