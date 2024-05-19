const { startStandaloneServer } = require('@apollo/server/standalone');

const createApolloServer = require('../src/app');
const { connectToDatabase } = require('../config');
const { verifyAccessToken, logger } = require('../utils');
const createDataLoaders = require('../src/loaders');
const { GraphQLError } = require('graphql');

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

      try {
        const accessToken = authorization
          ? authorization.split(' ')[1]
          : undefined;
        const dataLoaders = createDataLoaders();

        if (!accessToken) {
          throw new GraphQLError('Token is missing', {
            extensions: { code: 'UNAUTHORIZED', status: 401 },
          });
        }

        return {
          currentUser: verifyAccessToken(accessToken),
          dataLoaders,
        };
      } catch (error) {
        logger.error('Context creation failed:', error);
        throw new GraphQLError(error.message, {
          extensions: { code: 'UNAUTHORIZED', status: 401 },
        });
      }
    },
  });

  console.log(`Server ready at: ${url}`);
};

startServer();
