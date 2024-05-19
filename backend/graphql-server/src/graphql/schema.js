const { merge } = require('lodash');

const me = require('./queries/me');
const user = require('./types/user');
const campaign = require('./types/campaign');
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
  campaign.typeDefs,
  updateUserType.typeDefs,
  createCampaign.typeDefs,
];
const resolvers = merge(
  me.resolvers,
  user.resolvers,
  campaign.resolvers,
  updateUserType.resolvers,
  createCampaign.resolvers,
);

module.exports = {
  typeDefs,
  resolvers,
};
