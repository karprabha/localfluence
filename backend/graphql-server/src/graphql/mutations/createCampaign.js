const { GraphQLError } = require('graphql');
const { Campaign } = require('../../models');
const Yup = require('yup');

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
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().nullable(),
        budget: Yup.number()
          .required('Budget is required')
          .positive('Budget must be a positive number'),
        startDate: Yup.date().required('Start date is required'),
        endDate: Yup.date()
          .required('End date is required')
          .min(Yup.ref('startDate'), 'End date cannot be before start date'),
      });

      try {
        await schema.validate(
          { name, description, budget, startDate, endDate },
          { abortEarly: false },
        );
      } catch (error) {
        throw new GraphQLError('Validation failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            details: error.errors,
          },
        });
      }

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
