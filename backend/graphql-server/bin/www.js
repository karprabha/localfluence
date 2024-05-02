const { startStandaloneServer } = require('@apollo/server/standalone');

const createApolloServer = require('../src/app');
const { connectToDatabase } = require('../config');

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
  });

  console.log(`Server ready at: ${url}`);
};

startServer();
