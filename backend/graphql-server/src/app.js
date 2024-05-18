const { ApolloServer } = require('@apollo/server');
const {
  ApolloServerErrorCode,
  ApolloServerValidationErrorCode,
} = require('@apollo/server/errors');

const { logger } = require('../utils');
const { resolvers, typeDefs } = require('./graphql/schema');

const apolloErrorFormatter = (error) => {
  logger.error(error);

  const { originalError } = error;
  const isGraphQLError = !(originalError instanceof Error);

  let normalizedError = {
    message: 'Something went wrong',
    extensions: { code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR },
  };

  if (originalError && originalError.name === 'ValidationError') {
    normalizedError = {
      ...error,
      extensions: { code: ApolloServerValidationErrorCode.BAD_USER_INPUT },
    };
  } else if (
    originalError &&
    originalError.extensions &&
    originalError.extensions.code
  ) {
    normalizedError = error;
  } else if (isGraphQLError) {
    normalizedError = error;
  }

  return normalizedError;
};

const createApolloServer = () => {
  return new ApolloServer({
    resolvers,
    typeDefs,
    formatError: apolloErrorFormatter,
  });
};

module.exports = createApolloServer;
