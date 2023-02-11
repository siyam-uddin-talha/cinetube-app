/*
author:'Arnob Islam'
created date:'22-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser, IMovie, MovieContentsType, IHistoryMovie, uid } from "./helper";

export const AddNextRouteAfterLogin = async (route: string, data?: any) => {
  try {
    const isRoute = await GetNextRouteAfterLogin();
    if (isRoute) {
      await AsyncStorage.removeItem("@--login--next--route");
      await AsyncStorage.setItem(
        "@--login--next--route",
        JSON.stringify({
          data,
          route,
        })
      );
      return await GetNextRouteAfterLogin();
    }
    await AsyncStorage.setItem(
      "@--login--next--route",
      JSON.stringify({
        data,
        route,
      })
    );
    return await GetNextRouteAfterLogin();
  } catch (error: any) {
    console.log(`----- error at adding route after login --------`);
    console.log(error.message);
  }
};

export const GetNextRouteAfterLogin = async () => {
  try {
    const route = await AsyncStorage.getItem("@--login--next--route");
    const perser = route ? JSON.parse(route) : null;
    return perser;
  } catch (error: any) {
    console.log(`----- error at geting route after login --------`);
    console.log(error.message);
  }
};

export const SetUser = async (user: IUser) => {
  const _user = await GetUser();
  if (_user) {
    await AsyncStorage.removeItem("@--user--movie-flix--");
    await AsyncStorage.setItem("@--user--movie-flix--", JSON.stringify(_user));
    return (await GetUser()) as IUser;
  }
  await AsyncStorage.setItem("@--user--movie-flix--", JSON.stringify(user));
  return (await GetUser()) as IUser;
};

export const GetUser = async (): Promise<IUser | undefined> => {
  const user = await AsyncStorage.getItem("@--user--movie-flix--");
  const perser = user ? JSON.parse(user) : undefined;
  return perser;
};

export const SetJwtToken = async (jwtToken: string) => {
  const isHad = await GetJwtToken();
  if (isHad) {
    await AsyncStorage.removeItem("@--JWT--TOKEN");
    await AsyncStorage.setItem("@--JWT--TOKEN", jwtToken);
    return await GetJwtToken();
  }
  await AsyncStorage.setItem("@--JWT--TOKEN", jwtToken);
  return await GetJwtToken();
};

export const RemoveJwtToken = async () => {
  await AsyncStorage.removeItem("@--JWT--TOKEN");
};

export const GetJwtToken = async () => {
  const token = await AsyncStorage.getItem("@--JWT--TOKEN");
  return token ? token : null;
};

// --------------- watch later -------------------

export const SetMovieToWatchLater = async (movie: IMovie, name: string) => {
  const isExist = await GetSingleCollection(name);

  const list = await GetWatchLaterMovies();

  const withOutThisCollection = list.filter((e) => e.name !== name);

  if (isExist) {
    const isThisMovieExist = await GetMovieFromCollection(movie, name);
    if (isThisMovieExist) {
      await RemoveMovieFromCollection(movie, name);
      return;
    }

    await AsyncStorage.setItem(
      `@--movie--watch--later`,
      JSON.stringify([
        { name: name, movies: [movie, ...isExist] },
        ...withOutThisCollection,
      ])
    );
    return;
  }
  AsyncStorage.setItem(
    "@--movie--watch--later",
    JSON.stringify([
      { name, movies: [movie, ...isExist, ...withOutThisCollection] },
    ])
  );
};

export const GetWatchLaterMovies = async (): Promise<MovieContentsType[]> => {
  const isExist = await AsyncStorage.getItem("@--movie--watch--later");
  return isExist ? JSON.parse(isExist) : [];
};

export const GetSingleCollection = async (name: string): Promise<IMovie[]> => {
  let getThisItem = await AsyncStorage.getItem(`@--movie--watch--later`);
  const list: MovieContentsType[] = getThisItem ? JSON.parse(getThisItem) : [];

  if (list.length !== 0) {
    const findSpacific = list.find((e) => e.name === name);
    if (findSpacific) {
      return findSpacific.movies;
    }
    return [];
  }
  return [];
};

const RemoveMovieFromCollection = async (movie: IMovie, name: string) => {
  const getMovie = await GetMovieFromCollection(movie, name);

  if (getMovie) {
    const getThisMovieCollection = await GetSingleCollection(name);
    const fullPlayList = await GetWatchLaterMovies();

    const thatListFilterd = getThisMovieCollection.filter(
      (e) => e._id !== movie._id
    );

    const wholeListFilterd = fullPlayList.map((e) => {
      if (e.name == name) {
        return {
          name: name,
          movies: thatListFilterd,
        };
      }
      return {
        ...e,
      };
    });

    await AsyncStorage.setItem(
      `@--movie--watch--later`,
      JSON.stringify(wholeListFilterd)
    );
  }
};

export const GetMovieFromCollection = async (movie: IMovie, name: string) => {
  const getAudio = await GetSingleCollection(name);
  if (getAudio.length !== 0) {
    return getAudio.find((e: IMovie) => e._id === movie._id);
  }
  return undefined;
};
// --------------- watch later -------------------

// --------------- history -------------------
export const SetToHistory = async (movie: IMovie, collectionName: string) => {
  const history = await GetHistory();
  AsyncStorage.setItem(
    "@--user--history",
    JSON.stringify([{ ...movie, collectionName, uid: uid() }, ...history])
  );
};

export const GetHistory = async (): Promise<IHistoryMovie[]> => {
  const history = await AsyncStorage.getItem("@--user--history");
  return history ? JSON.parse(history) : [];
};
export const ClearHistory = async () => {
  await AsyncStorage.removeItem("@--user--history");
};
