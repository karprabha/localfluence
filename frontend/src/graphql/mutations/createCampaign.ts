import { gql } from "@apollo/client";

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign(
    $name: String!
    $description: String
    $budget: Float!
    $startDate: String!
    $endDate: String!
  ) {
    createCampaign(
      name: $name
      description: $description
      budget: $budget
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      name
      description
      budget
      startDate
      endDate
      userId
    }
  }
`;
