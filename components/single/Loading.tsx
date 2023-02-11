/**
 *
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, Dimensions, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import { styles } from "../../styles/global";
import { Skeleton } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("window");

export const PopulerMoviesLoading = () => {
  return (
    <View style={[styles.padV1, styles.padH1, styles.fdr]}>
      {[0, 1, 2].map((e) => (
        <View key={e} style={[styles.ml, styles.mr]}>
          <Skeleton width={width / 3 - 20} height={155} />
        </View>
      ))}
    </View>
  );
};

export const BannerLoading = () => {
  return (
    <View style={[styles.aic, styles.jdc, { paddingHorizontal: 15 }]}>
      <Skeleton style={[]} animation="pulse" width={width - 25} height={230} />
    </View>
  );
};

export const MoviesLoading = () => {
  return (
    <View style={[styles.padV1, styles.padH1, styles.fww, styles.fdr]}>
      {[0, 1, 2, 4].map((e) => (
        <View key={e} style={[{ margin: 5 }]}>
          <Skeleton width={width / 2 - 22} height={170} />
        </View>
      ))}
    </View>
  );
};

export const ActivityLoading = () => {
  return (
    <View style={[styles.jdc, styles.aic, { flex: 1 }]}>
      <View>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
};

export const ActivityModelLoad = ({ loading }: { loading: boolean }) => {
  return (
    <>
      <Modal isVisible={loading} coverScreen={false}>
        <View style={[styles.aic, styles.jdc, { zIndex: 100, flex: 1 }]}>
          <ActivityIndicator size="large" />
        </View>
      </Modal>
    </>
  );
};
