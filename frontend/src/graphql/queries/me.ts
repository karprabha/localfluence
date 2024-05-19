import { gql } from "@apollo/client";

export const ME = gql`
  query ME {
    me {
      avatarUrl
      email
      id
      name
      userType
    }
  }
`;
