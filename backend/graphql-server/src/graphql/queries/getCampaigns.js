const { Campaign } = require('../../models');

const typeDefs = `#graphql
  extend type Query {
    campaigns: [Campaign]
  }
`;

const resolvers = {
  Query: {
    campaigns: async (_, __, { dataLoaders }) => {
      const campaigns = await Campaign.findAll();
      const campaignIds = campaigns.map((campaign) => campaign.id);
      return dataLoaders.campaignLoader.loadMany(campaignIds);
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
