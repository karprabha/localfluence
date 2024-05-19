const typeDefs = `#graphql
  type Campaign {
    id: ID!
    userId: ID!
    name: String!
    description: String
    budget: Float!
    startDate: String!
    endDate: String!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers,
};
