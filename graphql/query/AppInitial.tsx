import { gql } from "@apollo/client";

export const GET_BANNER_CONTENT = gql`
  query Collections {
    getAllBanner {
      message
      success
      banners {
        _id
        thumbnail
        movieId
        collectionName
        movieName
      }
    }
  }
`;

export const GET_ALL_MOVIES = gql`
  query Collections {
    getAllMovies {
      message
      success
      collections {
        name
        movies {
          language
          _id
          name
          thumbnail
          star
          subTitle
          quality
        }
      }
    }
  }
`;

export const GET_ALL_MOVIES_FOR_SEARCH = gql`
  query Query($all: Boolean) {
    getAllMovies(all: $all) {
      message
      success
      collections {
        name
        movies {
          _id
          name
          thumbnail
          tags
          subTitle
        }
      }
    }
  }
`;

export const GET_SINGLE_MOVIE = gql`
  query Query($name: String, $_id: ID, $userId: ID) {
    getSingleMovie(name: $name, _id: $_id, userId: $userId) {
      message
      success
      movie {
        _id
        name
        thumbnail
        movieUrl
        star
        subTitle
        quality
        trailerUrl
        company
        description
        duration
        language
        released
        # <- --------- single comment ---------- ->
        comment {
          _id
          star
          comment
          createdAt
          profilePhoto
          userName
          userId
        }
        commentsCount
        inputDisable
      }
    }
  }
`;

export const GET_POPULER_CONTENT = gql`
  query Query {
    getPopulerMovies {
      message
      success
      movies {
        _id
        thumbnail
        movieId
        collectionName
        movieName
      }
    }
  }
`;

export const GET_MOVIE_ALL_COMMENTS = gql`
  query Query($name: String, $id: ID) {
    getMovieAllComments(name: $name, _id: $id) {
      success
      message
      comments {
        _id
        star
        comment
        createdAt
        profilePhoto
        userName
        userId
      }
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout {
      success
      message
    }
  }
`;

export const GET_SPACIFIC_COLLECTION = gql`
  query ($collectionName: String, $page: Int) {
    getSpacificCollection(collectionName: $collectionName, page: $page) {
      success
      message
      pageCount
      movies {
        _id
        name
        thumbnail
        star
        subTitle
        quality
      }
    }
  }
`;
