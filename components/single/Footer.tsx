import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { singleStyle } from "../../styles/parts";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const { collectionNames } = useSelector((state: any) => state.secondary);

  const dispatch = useDispatch();
  const navigate = useNavigation();

  const NavigateToAllCollections = (name: string) => {
    dispatch({ type: "VIEW_ALL_MOVIE_COLLECTION", payload: name });

    navigate.navigate(
      "Watch collections" as never,
      {
        collectionName: name,
      } as never
    );
  };

  return (
    <View style={[styles.mt1]}>
      <View style={[singleStyle.footerRouteParents]}>
        <View style={[styles.padV1]}>
          <Text style={[styles.text1]}>Watch more</Text>
        </View>

        <View style={[styles.aic]}>
          <View>
            {collectionNames.map((e: string, i: number) => {
              return (
                <View key={i}>
                  <Text
                    style={[singleStyle.footerRouteText]}
                    onPress={() => NavigateToAllCollections(e)}
                  >{`${e}`}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={[styles.padV1, styles.mt]}>
          <Text style={[styles.text1]}>More</Text>
        </View>
        <View>
          <Text
            style={[singleStyle.footerRouteText]}
            onPress={() => navigate.navigate("Terms & Conditions" as never)}
          >
            Terms & condition
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.padH2,
          styles.padV2,
          {
            backgroundColor: "#0d131a",
            borderTopColor: "#0d1824",
            borderTopWidth: 1,
          },
        ]}
      >
        <View style={[styles.aic, styles.jdc]}>
          <Text style={[styles.text3]}>
            Copyright © 2022 All Rights Reserved by CineTube.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;
