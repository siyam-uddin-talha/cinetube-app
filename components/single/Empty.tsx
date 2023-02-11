import { View, Text } from "react-native";
import React from "react";
import { styles } from "../../styles/global";

type AppProps = {
  title: string;
  emoji?: boolean;
};

const Empty: React.FC<AppProps> = ({ title, emoji }) => {
  return (
    <View style={[styles.container2]}>
      <View style={[styles.aic]}>
        {emoji && (
          <Text
            style={{
              color: "white",
              fontSize: 25,
            }}
          >
            ¯\_(ツ)_/¯
          </Text>
        )}
        <Text style={[styles.mt, { color: "white", fontSize: 22 }]}>
          Opps...
        </Text>
        <Text style={[styles.text2, styles.mt]}>{title}</Text>
      </View>
    </View>
  );
};

export default Empty;
