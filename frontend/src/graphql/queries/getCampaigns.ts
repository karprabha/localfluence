import { gql } from "@apollo/client";

export const GET_CAMPAIGNS = gql`
  query GetCampaigns {
    campaigns {
      id
      name
      description
      budget
      startDate
      endDate
      user {
        id
        name
      }
    }
  }
`;
