const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    avatarUrl: String!
    userType: UserType
    influencerData: Influencer
    campaignManagerData: CampaignManager
  }

  type Influencer {
    followersCount: Int
    platform: String
  }

  type CampaignManager {
    companyName: String
    campaignBudget: Float
  }
`;

const resolvers = {
  User: {
    influencerData: async (user, _, { dataLoaders }) => {
      if (user.userType === 'influencer') {
        return dataLoaders.influencerLoader.load(user.id);
      }
      return null;
    },
    campaignManagerData: async (user, _, { dataLoaders }) => {
      if (user.userType === 'campaign_manager') {
        return dataLoaders.campaignManagerLoader.load(user.id);
      }
      return null;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
