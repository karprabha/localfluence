const { GraphQLError } = require('graphql');
const { sequelize } = require('../../../config');
const { User, Influencer, CampaignManager } = require('../../models');
const Yup = require('yup');

const typeDefs = `#graphql
  extend type Mutation {
    updateUserType(userId: ID!, userType: String!, influencerData: InfluencerInput, campaignManagerData: CampaignManagerInput): User
  }

  input InfluencerInput {
    followersCount: Int!
    platform: String!
  }

  input CampaignManagerInput {
    companyName: String!
    campaignBudget: Float!
  }
`;

const resolvers = {
  Mutation: {
    updateUserType: async (
      _,
      { userId, userType, influencerData, campaignManagerData },
      { dataLoaders },
    ) => {
      const influencerSchema = Yup.object().shape({
        followersCount: Yup.number()
          .required('Followers count is required')
          .positive('Followers count must be a positive number'),
        platform: Yup.string().required('Platform is required'),
      });

      const campaignManagerSchema = Yup.object().shape({
        companyName: Yup.string().required('Company name is required'),
        campaignBudget: Yup.number()
          .required('Campaign budget is required')
          .positive('Campaign budget must be a positive number'),
      });

      try {
        if (userType === 'influencer' && influencerData) {
          await influencerSchema.validate(influencerData, {
            abortEarly: false,
          });
        } else if (userType === 'campaign_manager' && campaignManagerData) {
          await campaignManagerSchema.validate(campaignManagerData, {
            abortEarly: false,
          });
        }
      } catch (error) {
        throw new GraphQLError('Validation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            details: error.errors,
          },
        });
      }

      const user = await dataLoaders.userLoader.load(userId);

      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'USER_NOT_FOUND', status: 404 },
        });
      }

      if (user.userType && user.userType !== userType) {
        throw new GraphQLError('User type cannot be changed', {
          extensions: { code: 'USER_TYPE_CHANGE_NOT_ALLOWED', status: 400 },
        });
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
