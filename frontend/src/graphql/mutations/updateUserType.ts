import { gql } from "@apollo/client";

export const UPDATE_USER_TYPE = gql`
  mutation UpdateUserType(
    $userId: ID!
    $userType: UserType!
    $influencerData: InfluencerInput
    $campaignManagerData: CampaignManagerInput
  ) {
    updateUserType(
      userId: $userId
      userType: $userType
      influencerData: $influencerData
      campaignManagerData: $campaignManagerData
    ) {
      id
      email
      name
      avatarUrl
      userType
    }
  }
`;
