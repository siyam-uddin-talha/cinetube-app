/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../../graphql/query/AppInitial";
import { MovieContentsType } from "../provider/helper";
import DisplayMovieComponent from "../provider/DisplayMovieComponent";
import { useDispatch, useSelector } from "react-redux";
import { MoviesLoading } from "../single/Loading";

const DisplayMovies = () => {
  const { data, loading, refetch, error } = useQuery(GET_ALL_MOVIES);

  const [movieContent, setMovieContent] = useState<MovieContentsType[]>([]);
  const { globalLoading } = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      if (data.getAllMovies.success) {
        setMovieContent(data.getAllMovies.collections);
        dispatch({
          type: "APP__MOVIES",
          payload: data.getAllMovies.collections,
        });
      }
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (globalLoading) {
      refetch();
    }
  }, [globalLoading, refetch]);

  if (loading) {
    return <MoviesLoading />;
  }

  return <>{<DisplayMovieComponent props={movieContent} />}</>;
};

export default DisplayMovies;
