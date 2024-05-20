const typeDefs = `#graphql
  type Campaign {
    id: ID!
    userId: ID!
    name: String!
    description: String
    budget: Float!
    startDate: String!
    endDate: String!
    user: User
  }
`;

const resolvers = {
  Campaign: {
    user: async (campaign, _, { dataLoaders }) => {
      return dataLoaders.userLoader.load(campaign.userId);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
