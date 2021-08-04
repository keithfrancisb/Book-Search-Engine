const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

//db connection
const db = require('./config/connection');

const routes = require('./routes');
const GoogleBooksAPI = require('./datasources/GoogleBooksAPI');

//express server
const app = express();
const PORT = process.env.PORT || 3001;

//apollo server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      googleBooksAPI: new GoogleBooksAPI()
    }),
    // context: authMiddleware
  });

  await server.start();

  //apply apollo server with express app
  server.applyMiddleware({ app });

  //middleware parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer();




// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }



