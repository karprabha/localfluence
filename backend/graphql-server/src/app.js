const { ApolloServer } = require('@apollo/server');

const { logger } = require('../utils');
const { resolvers, typeDefs } = require('./graphql/schema');

const apolloErrorFormatter = (formattedError) => {
  logger.error('Formatted Error:', formattedError);

  let normalizedError = {
    message: 'Something went wrong',
    extensions: { code: 'INTERNAL_SERVER_ERROR', status: 500 },
  };

  const error = formattedError.originalError || formattedError;

  switch (error.extensions.code) {
    case 'BAD_USER_INPUT':
      normalizedError = {
        message: error.message,
        extensions: { code: 'BAD_USER_INPUT', status: 400 },
      };
      break;
    case 'UNAUTHORIZED':
      normalizedError = {
        message: error.message || 'Unauthorized access',
        extensions: { code: 'UNAUTHORIZED', status: 401 },
      };
      break;
    default:
      break;
  }

  return { ...normalizedError, path: formattedError.path };
};

const createApolloServer = () => {
  return new ApolloServer({
    resolvers,
    typeDefs,
    formatError: apolloErrorFormatter,
  });
};

module.exports = createApolloServer;
