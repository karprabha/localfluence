const { ApolloServer } = require('@apollo/server');

const typeDefs = `
  type Query {
    root: String
  }
`;

const resolvers = {
  Query: {
    root: () => 'Hello World',
  },
};

const createApolloServer = () => {
  return new ApolloServer({
    resolvers,
    typeDefs,
  });
};

module.exports = createApolloServer;
