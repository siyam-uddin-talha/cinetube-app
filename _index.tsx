/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { Provider as ReduxProvider, useSelector } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import RootReducer from "./redux/provider";
import { Provider as PaperProvider } from "react-native-paper";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// <- custom imports ->

import SubApp from "./_app";
import Home from "./screens/Home";
import Login from "./screens/auth/Login";
import SignUp from "./screens/auth/SignUp";
import VerifyAcount from "./screens/auth/VerifyAcount";
import ForgetPassword from "./screens/auth/ForgetPassword";
import ResetPassword from "./screens/auth/ResetPassword";

import Settings from "./screens/Setting";
import ProfileComponent from "./components/settings/profile";
import RequestForMovie from "./components/settings/RequestForMovie";
import History from "./components/settings/History";
import GenarelSettings from "./components/settings/profile/GenarelSettings";
import TearmAndConditions from "./components/single/Tearm&Conditions";

import SearchMovie from "./screens/SearchMovie";
import Watchlist from "./screens/Watchlist";
import ViewSingleMovie from "./components/provider/ViewSingleMovie";
import StreamMovie from "./components/provider/player";
import ViewMovieCollections from "./components/provider/ViewMovieCollections";
import MovieHeader from "./components/headers/MovieHeader";
import AllCollectionHeader from "./components/headers/AllCollectionHeader";
// <- custom imports ->

// <- Icons imports ->
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { config } from "./config";
// <- Icons imports ->

const store = createStore(RootReducer);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const httpLink = createHttpLink({
  uri: `${config.dev.uri}`,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const Index = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <SubApp>
            <PaperProvider>
              <NavigationContainer theme={DarkTheme}>
                <>
                  <ScreenNavigator />
                </>
              </NavigationContainer>
            </PaperProvider>
          </SubApp>
        </ApolloProvider>
      </ReduxProvider>
    </>
  );
};

const ScreenNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Feed">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign up" component={SignUp} />
        <Stack.Screen name="Verify Account" component={VerifyAcount} />
        <Stack.Screen name="Forget password" component={ForgetPassword} />
        <Stack.Screen name="Reset password" component={ResetPassword} />
        <Stack.Screen
          name="Feed"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="View Movie"
          component={ViewSingleMovie}
          options={{
            headerTitle: () => <MovieHeader />,
            // headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="Watch movie"
          component={StreamMovie}
          options={{
            headerTransparent: true,
            headerTitle: () => <MovieHeader />,
          }}
        />
        <Stack.Screen
          name="Watch collections"
          component={ViewMovieCollections}
          options={{
            headerTitle: () => <AllCollectionHeader />,
          }}
        />

        <Stack.Screen name="Profile" component={ProfileComponent} />
        <Stack.Screen name="Request for movie" component={RequestForMovie} />
        <Stack.Screen name="General settings" component={GenarelSettings} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen
          name="Terms & Conditions"
          component={TearmAndConditions}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

// const MovieStack = createNativeStackNavigator();

// const MovieScreen = () => {
//   return (
//     <>
//       <Stack.Navigator></Stack.Navigator>
//     </>
//   );
// };

function HomeScreen() {
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchMovie}
          options={{
            tabBarIcon: ({ color, size }) => (
              <EvilIcons name="search" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Watch later"
          component={Watchlist}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-checks"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="cog" size={19} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default Index;
