import React, { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USER } from "./graphql/query/UserInitial";
import { useDispatch, useSelector } from "react-redux";
import { GetJwtToken } from "./components/provider/_storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import NoConnection from "./screens/NoConnection";
import { io } from "socket.io-client";
import { config } from "./config";
import { SelectorType } from "./components/provider/helper";

type AppProps = {
  children: React.ReactNode;
};

type NetStateType = {
  connected: boolean | null;
  type: string;
  message?: string;
};

// <- ----------------------- socket connection ------------------>
const socket = io(config.dev.uriRest);
// <- ----------------------- socket connection ------------------>

const App = ({ children }: AppProps) => {
  const [Getuser, { data, loading, error }] = useLazyQuery(GET_USER);

  const [netInfo, setNetInfo] = useState<NetStateType>({
    connected: true,
    type: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const LetsGetUser = async () => {
      const token = await GetJwtToken();

      if (token) {
        Getuser({
          variables: {
            jwtToken: token,
          },
        });
      } else {
        dispatch({
          type: "USER__INITIAL",
          payload: {
            user: null,
            loading: false,
            error: undefined,
          },
        });
      }
    };
    LetsGetUser();
  }, [Getuser, dispatch]);

  // <- user dispatch ->
  useEffect(() => {
    if (data) {
      if (data.getUser) {
        dispatch({
          type: "USER__INITIAL",
          payload: {
            user: data.getUser.user,
            loading,
            error,
          },
        });

        socket.emit(
          "access-user",
          data.getUser.user ? data.getUser.user._id : ""
        );
      }
    }
  }, [data, loading, error, dispatch]);

  // useEffect(() => {
  //   AsyncStorage.clear().then(() => {
  //     return;
  //   });
  // }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo({
        connected: state.isInternetReachable,
        type: state.type,
      });
    });

    return unsubscribe;
  }, []);

  const HandleRetch = () => {
    NetInfo.fetch().then((state) => {
      setNetInfo({
        connected: state.isInternetReachable,
        type: state.type,
        message: state.isInternetReachable ? "" : "Try again",
      });
    });
  };
  return (
    <InitialChild>
      {netInfo.connected ? (
        children
      ) : (
        <NoConnection onRefetch={HandleRetch} message={netInfo.message} />
      )}
    </InitialChild>
  );
};

const InitialChild: React.FC<AppProps> = ({ children }) => {
  // const { user }: SelectorType = useSelector((state: any) => state.main);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);
  return <>{children}</>;
};

export default App;
