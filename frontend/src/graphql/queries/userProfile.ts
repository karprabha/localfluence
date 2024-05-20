import { gql } from "@apollo/client";

export const GET_USER_PROFILE = gql`
  query GetUserProfile {
    userProfile {
      id
      email
      name
      avatarUrl
      userType
      influencerData {
        followersCount
        platform
      }
      campaignManagerData {
        companyName
        campaignBudget
      }
    }
  }
`;
