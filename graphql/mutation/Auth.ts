import { gql } from "@apollo/client";

export const SIGNUP_NEW = gql`
  mutation Signup($input: SignupInput) {
    signup(input: $input) {
      success
      message
      jwtToken
      user {
        _id
        email
        userName
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

export const VERIFY_ACCOUNT = gql`
  mutation Mutation($id: ID, $pin: Int) {
    verifyAccount(_id: $id, pin: $pin) {
      success
      message
      jwtToken
      user {
        _id
        email
        userName
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

export const LOGIN = gql`
  mutation Mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      success
      message
      jwtToken
      user {
        _id
        email
        userName
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

export const GET_VERIFY_PIN = gql`
  mutation Mutation($id: ID) {
    getVerifyPin(_id: $id) {
      success
      message
    }
  }
`;
export const FORGET_PASSWORD = gql`
  mutation Mutation($email: String) {
    forgetPassword(email: $email) {
      success
      message
      email
    }
  }
`;
export const RESET_PASSWORD = gql`
  mutation Mutation($email: String, $resetPIN: Int, $password: String) {
    resetPassword(email: $email, resetPIN: $resetPIN, password: $password) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation Mutation($id: ID, $password: String, $newPassword: String) {
    changePassword(_id: $id, password: $password, newPassword: $newPassword) {
      success
      message
    }
  }
`;
