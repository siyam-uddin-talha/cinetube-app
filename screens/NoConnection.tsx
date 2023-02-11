import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/global";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onRefetch: () => void;
  message?: string;
};

const NoConnection: React.FC<Props> = ({ onRefetch, message }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container2]}>
        <View>
          <View style={[styles.aic]}>
            <Ionicons name="warning-outline" size={35} color="white" />
          </View>
          <View style={[styles.my1, styles.aic]}>
            <Text style={[styles.text1]}>No Internet connection</Text>
          </View>
          {message && (
            <View style={[styles.my1, styles.aic]}>
              <Text style={[styles.text1]}> {message} </Text>
            </View>
          )}
          <View style={[styles.mt]}>
            <Button
              icon="restore"
              mode="text"
              uppercase={false}
              onPress={onRefetch}
            >
              Retry
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoConnection;
