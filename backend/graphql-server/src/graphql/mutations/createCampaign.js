const { GraphQLError } = require('graphql');

const { Campaign } = require('../../models');

const typeDefs = `#graphql
  extend type Mutation {
    createCampaign(
      name: String!
      description: String
      budget: Float!
      startDate: String!
      endDate: String!
    ): Campaign
  }
`;

const resolvers = {
  Mutation: {
    createCampaign: async (
      _,
      { name, description, budget, startDate, endDate },
      { currentUser, dataLoaders },
    ) => {
      const user = await dataLoaders.userLoader.load(currentUser.id);
      if (!user || user.userType !== 'campaign_manager') {
        throw new GraphQLError('Only campaign managers can create campaigns', {
          extensions: {
            code: 'FORBIDDEN',
            status: 403,
          },
        });
      }

      const campaign = await Campaign.create({
        userId: currentUser.id,
        name,
        description,
        budget,
        startDate,
        endDate,
      });

      return campaign;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
