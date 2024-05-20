const { merge } = require('lodash');

const me = require('./queries/me');
const user = require('./types/user');
const userType = require('./enums/userType');
const campaign = require('./types/campaign');
const userProfile = require('./queries/userProfile');
const getCampaigns = require('./queries/getCampaigns');
const updateUserType = require('./mutations/updateUserType');
const createCampaign = require('./mutations/createCampaign');

const rootTypeDefs = `#graphql
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  me.typeDefs,
  user.typeDefs,
  userType.typeDefs,
  campaign.typeDefs,
  userProfile.typeDefs,
  getCampaigns.typeDefs,
  updateUserType.typeDefs,
  createCampaign.typeDefs,
];
const resolvers = merge(
  me.resolvers,
  user.resolvers,
  userType.resolvers,
  campaign.resolvers,
  userProfile.resolvers,
  getCampaigns.resolvers,
  updateUserType.resolvers,
  createCampaign.resolvers,
);

module.exports = {
  typeDefs,
  resolvers,
};
