const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
    avatarUrl: String!
    userType: String
  }
`;

const resolvers = {
  User: {},
};

module.exports = {
  typeDefs,
  resolvers,
};
