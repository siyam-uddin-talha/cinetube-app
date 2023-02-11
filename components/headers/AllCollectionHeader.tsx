import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const MovieHeader = () => {
  const { collectionName } = useSelector((state: any) => state.secondary);

  return (
    <View>
      <Text style={{ color: "white", letterSpacing: 1, fontSize: 16 }}>
        {`watch all ${collectionName} movies`}
      </Text>
    </View>
  );
};

export default MovieHeader;
