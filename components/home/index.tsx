/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import React, { useEffect } from "react";
import Banner from "./Banner";
import PopulerMovie from "./PopulerMovie";
import DisplayMovies from "./DisplayMovies";
import { RefreshControl, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../single/Footer";

const Index = () => {
  const dispatch = useDispatch();

  const { globalLoading, loading } = useSelector((state: any) => state.main);

  const onRefreshing = () => {
    dispatch({ type: "GLOBAL__LOADING__START" });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={globalLoading} onRefresh={onRefreshing} />
      }
    >
      <Banner />
      <PopulerMovie />
      <DisplayMovies />
      {!loading && <Footer />}
    </ScrollView>
  );
};

export default Index;
