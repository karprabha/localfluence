const { merge } = require('lodash');

const me = require('./queries/me');
const user = require('./types/user');

const rootTypeDefs = `#graphql
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [rootTypeDefs, me.typeDefs, user.typeDefs];
const resolvers = merge(me.resolvers, user.resolvers);

module.exports = {
  typeDefs,
  resolvers,
};
