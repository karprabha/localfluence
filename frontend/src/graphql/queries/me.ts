import { gql } from "@apollo/client";

const ME = gql`
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

export default ME;
