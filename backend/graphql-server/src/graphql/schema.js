const { merge } = require('lodash');

const me = require('./queries/me');
const user = require('./types/user');
const updateUser = require('./mutations/updateUser');

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
  updateUser.typeDefs,
];
const resolvers = merge(me.resolvers, user.resolvers, updateUser.resolvers);

module.exports = {
  typeDefs,
  resolvers,
};
