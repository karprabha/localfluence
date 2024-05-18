const { startStandaloneServer } = require('@apollo/server/standalone');

const createApolloServer = require('../src/app');
const { connectToDatabase } = require('../config');
const { verifyAccessToken } = require('../utils');
const createDataLoaders = require('../src/loaders');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const startServer = async () => {
  await connectToDatabase();

  const apolloServer = createApolloServer();
  const port = normalizePort(process.env.PORT || '4000');

  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
    context: ({ req, res }) => {
      const authorization = req.headers.authorization;

      const accessToken = authorization
        ? authorization.split(' ')[1]
        : undefined;
      const dataLoaders = createDataLoaders();

      return {
        currentUser: verifyAccessToken(accessToken),
        dataLoaders,
      };
    },
  });

  console.log(`Server ready at: ${url}`);
};

startServer();
