const { sequelize } = require('../../../config');
const { User, Influencer, CampaignManager } = require('../../models');

const typeDefs = `#graphql
  extend type Mutation {
    updateUserType(userId: ID!, userType: String!, influencerData: InfluencerInput, campaignManagerData: CampaignManagerInput): User
  }

  input InfluencerInput {
    followersCount: Int
    platform: String
  }

  input CampaignManagerInput {
    companyName: String
    campaignBudget: Float
  }
`;

const resolvers = {
  Mutation: {
    updateUserType: async (
      _,
      { userId, userType, influencerData, campaignManagerData },
      { dataLoaders },
    ) => {
      const user = await dataLoaders.userLoader.load(userId);

      if (!user) {
        throw new Error('User not found');
      }

      return sequelize.transaction(async (t) => {
        user.userType = userType;
        await user.save({ transaction: t });

        if (userType === 'influencer' && influencerData) {
          await Influencer.upsert(
            { userId: user.id, ...influencerData },
            { transaction: t },
          );
          dataLoaders.influencerLoader.clear(user.id);
        } else if (userType === 'campaign_manager' && campaignManagerData) {
          await CampaignManager.upsert(
            { userId: user.id, ...campaignManagerData },
            { transaction: t },
          );
          dataLoaders.campaignManagerLoader.clear(user.id);
        }

        return user;
      });
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
