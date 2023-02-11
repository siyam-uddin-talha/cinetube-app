import { gql } from "@apollo/client";

export const GET_USER = gql`
  query Query($jwtToken: String) {
    getUser(jwtToken: $jwtToken) {
      success
      message
      user {
        _id
        userName
        email
        verify
        information {
          firstName
          lastName
          profilePhoto
          dateOfBirth
          gender
        }
      }
    }
  }
`;
