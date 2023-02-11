import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../styles/global";
import { AntDesign } from "@expo/vector-icons";

type AppProps = {
  title: string;
  onPress?: Function;
};

const BrandingText: React.FC<AppProps> = ({ title, onPress }) => {
  return (
    <>
      <View
        style={[styles.fdr, styles.jdsb, styles.mb2, styles.pr1, styles.aic]}
      >
        <Text style={[styles.bradingText]}>{title}</Text>
        {onPress && (
          <Text>
            <AntDesign
              name="arrowright"
              onPress={() => onPress()}
              on
              size={20}
              color="white"
            />
          </Text>
        )}
      </View>
    </>
  );
};

export default BrandingText;
