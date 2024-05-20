const typeDefs = `#graphql
  extend type Query {
    me: User
  }
`;

const resolvers = {
  Query: {
    me: (_, __, { currentUser, dataLoaders }) => {
      return dataLoaders.userLoader.load(currentUser.id);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
