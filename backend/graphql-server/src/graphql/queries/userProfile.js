const typeDefs = `#graphql
  extend type Query {
    userProfile: User
  }
`;

const resolvers = {
  Query: {
    userProfile: async (_, __, { currentUser, dataLoaders }) => {
      return await dataLoaders.userLoader.load(currentUser.id);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
