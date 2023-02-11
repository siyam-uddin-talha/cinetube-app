import { View, Text, Dimensions, StyleSheet, StatusBar } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import VideoPlayer from "expo-video-player";

import { useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import { styles } from "../../../styles/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

const Index = ({ navigation }: any) => {
  const { movieUrl, currentMovieName } = useSelector(
    (state: any) => state.secondary
  );

  // const videoRef = React.useRef(null);

  const [inFullscreen, setInFullsreen] = useState<boolean>(true);

  // ----------- lock the screen to landscape -----------
  useLayoutEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    ).then((res) => {
      setInFullsreen(true);
    });
  }, []);

  // ----------- returning the screen to portrait -----------
  useEffect(() => {
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      ).then((res) => {
        return;
      });
    };
  }, []);

  // ---------- disable the header on rendering -----------
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // ---------- toggling the header when state change -----------
  useEffect(() => {
    navigation.setOptions({
      headerShown: inFullscreen ? false : true,
    });
  }, [navigation, inFullscreen]);

  const LOCAL_SYSTEM_IP_ADDRESS = "10.0.2.2";

  const PORT = "8080";

  // ---------- toggling the header to false -----------
  const FullScreenHeader = (
    <View style={[styles.padH2, styles.padV2]}>
      <View style={[styles.aic, styles.fdr]}>
        <View>
          <AntDesign
            name="arrowleft"
            size={20}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text style={[styles.txtBg1, styles.ml2]}>{currentMovieName}</Text>
      </View>
    </View>
  );

  return (
    <View>
      <View>
        <View>
          <StatusBar
            animated={true}
            showHideTransition={"fade"}
            hidden={inFullscreen}
          />
        </View>
        <View style={[inFullscreen ? style.landScope : style.potrait]}>
          <VideoPlayer
            videoProps={{
              shouldPlay: false,

              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: movieUrl,
              },
            }}
            defaultControlsVisible={true}
            autoHidePlayer={false}
            animation={{ fadeInDuration: 10 }}
            header={inFullscreen ? FullScreenHeader : <View></View>}
            fullscreen={{
              inFullscreen: inFullscreen,
              enterFullscreen: async () => {
                setInFullsreen(!inFullscreen);
                await ScreenOrientation.lockAsync(
                  ScreenOrientation.OrientationLock.LANDSCAPE
                );
              },
              exitFullscreen: async () => {
                setInFullsreen(!inFullscreen);
                await ScreenOrientation.lockAsync(
                  ScreenOrientation.OrientationLock.PORTRAIT
                );
              },
            }}
            style={{
              videoBackgroundColor: "black",
              height: inFullscreen ? Dimensions.get("window").width : 200,
              width: inFullscreen
                ? Dimensions.get("window").height
                : Dimensions.get("window").width,
            }}

            // icon={{play:true,pause:true,fullscreen:true,exitFullscreen:true}}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  landScope: {
    padding: 5,
  },
  potrait: {
    marginTop: "50%",
  },
});

export default Index;

// function HandleOrientation() {
//   if (Dimensions.get("window").height > Dimensions.get("window").width) {
//     //Device is in portrait mode, rotate to landscape mode.
//     setOrientation("LANDSCAPE");
//     ScreenOrientation.lockAsync(
//       ScreenOrientation.OrientationLock.LANDSCAPE
//     ).then((res) => {
//       return;
//     });
//   } else {
//     setOrientation("PORTRAIT");
//     //Device is in landscape mode, rotate to portrait mode.
//     ScreenOrientation.lockAsync(
//       ScreenOrientation.OrientationLock.PORTRAIT
//     ).then((res) => {
//       return;
//     });
//   }
// }
