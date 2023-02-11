import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const MovieHeader = () => {
  const { currentMovieName } = useSelector((state: any) => state.secondary);

  return (
    <View>
      <Text style={{ color: "white", letterSpacing: 1, fontSize: 16 }}>
        {currentMovieName.length > 27
          ? `${currentMovieName.substr(27)}...`
          : currentMovieName}
      </Text>
    </View>
  );
};

export default MovieHeader;
