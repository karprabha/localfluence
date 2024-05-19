import { gql } from "@apollo/client";

const UPDATE_USER_TYPE = gql`
  mutation UpdateUserType(
    $userId: ID!
    $userType: String!
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

export default UPDATE_USER_TYPE;
