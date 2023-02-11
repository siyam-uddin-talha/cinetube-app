/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import { IMovie } from "../../components/provider/helper";

type ReducerAction = {
  type: string;
  payload: any;
};
type MovieContentsType = {
  name: string;
  movies: IMovie[];
};

type State = {
  appMovies: MovieContentsType[];
  suggestion: IMovie[];
  collectionName: string;
  movieUrl: string;
  collectionNames: string[];
  currentMovieName: string;
};

const initialState: State = {
  appMovies: [],
  suggestion: [],
  collectionName: "",
  currentMovieName: "",

  movieUrl: "",
  collectionNames: [],
};

const Reducer = (state = initialState, { type, payload }: ReducerAction) => {
  if (type === "APP__MOVIES") {
    let filtered: string[] = payload
      .map((e: MovieContentsType) => e.name)
      .reverse();
    if (filtered.length > 6) {
      filtered = filtered.slice(0, 6);
    }
    return {
      ...state,
      appMovies: payload,
      collectionNames: filtered,
    };
  }
  if (type === "MOVIE__&__SUGGESTION") {
    const findCollection = state.appMovies.find((e) => e.name === payload);

    if (!findCollection) {
      return { ...state, suggestion: [] };
    }
    const randomSuggestions: IMovie[] = [];

    for (let i = 0; i < findCollection.movies.length; i++) {
      if (randomSuggestions.length === findCollection.movies.length / 2) {
        break;
      }
      var random =
        findCollection.movies[
          Math.floor(Math.random() * findCollection.movies.length)
        ];

      const isExist = randomSuggestions.find((e) => e._id === random._id);
      if (!isExist) randomSuggestions.push(random);
    }

    return {
      ...state,
      suggestion: randomSuggestions,
    };
  }
  if (type === "VIEW_ALL_MOVIE_COLLECTION") {
    return {
      ...state,
      collectionName: payload,
    };
  }
  if (type === "__MOVIE__URL__") {
    return {
      ...state,
      movieUrl: payload,
    };
  }
  if (type === "CURRENT__MOVIE") {
    return {
      ...state,
      currentMovieName: payload,
    };
  }
  return state;
};

export default Reducer;
