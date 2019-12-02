const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const models = require('../models');
const cors = require('cors');


const port = process.env.PORT || 4000;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});

const app = express();
app.use(cors());

server.applyMiddleware({ app, path: "/graphql"  });
models.sequelize.authenticate();
models.sequelize.sync();
app.listen({ port }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);