import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation Mutation($input: AddCommentInput) {
    addComment(input: $input) {
      success
      message
      comment {
        _id
        userId
        userName
        profilePhoto
        comment
        star
        createdAt
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation Mutation($movieId: ID, $name: String, $commentId: ID) {
    deleteComment(movieId: $movieId, name: $name, commentId: $commentId) {
      success
      message
      comment {
        _id
      }
    }
  }
`;

export const UPDATE_PROFILE_IMG = gql`
  mutation Mutation($url: String, $id: ID) {
    updateProfileImg(url: $url, _id: $id) {
      success
      message
      user {
        _id
        email
        verify
        userName
        information {
          firstName
          lastName
          profilePhoto
          gender
          dateOfBirth
        }
      }
      jwtToken
    }
  }
`;

export const UPDATE_PROFILE_INFORMATION = gql`
  mutation Mutation($input: UpdateInput, $id: ID) {
    updateProfile(input: $input, _id: $id) {
      success
      message
      user {
        _id
        email
        verify
        userName
        information {
          firstName
          lastName
          profilePhoto
          gender
          dateOfBirth
        }
      }
      jwtToken
    }
  }
`;

export const REQUEST_FOR_MOVIE = gql`
  mutation Mutation($input: RequestInput) {
    requestForMovie(input: $input) {
      success
      message
    }
  }
`;
