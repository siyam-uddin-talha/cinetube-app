import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SettingComponents } from "./helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "../../styles/global";
import { singleStyle } from "../../styles/parts";
import { RemoveJwtToken } from "../provider/_storage";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { ActivityLoading } from "../single/Loading";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { ProfileRoute } from "./profile";
import { Ionicons } from "@expo/vector-icons";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state: any) => state.main);
  const navigator = useNavigation();

  const HandleLogout = async () => {
    setRefreshing(true);
    await RemoveJwtToken();
    dispatch({ type: "USER__LOGED__OUT" });
    setRefreshing(false);
  };

  const goToProfile = () => {
    navigator.navigate("Profile" as never);
  };

  const settings: SettingComponents[] = [
    {
      component: <ProfileRoute />,
      key: 1,
      onPress: goToProfile,
    },
    {
      name: "Request for movie",
      icon: (
        <Ionicons name="git-pull-request-outline" size={24} color="white" />
      ),
      key: 2,
      onPress: () => navigator.navigate("Request for movie" as never),
    },
    {
      name: "General settings",
      icon: (
        <MaterialCommunityIcons
          name="account-cog-outline"
          size={24}
          color="white"
        />
      ),
      key: 3,
      onPress: () => navigator.navigate("General settings" as never),
    },
    {
      name: "History",
      icon: <MaterialCommunityIcons name="history" size={24} color="white" />,
      key: 4,
      onPress: () => navigator.navigate("History" as never),
    },
  ];

  const WhenUserIsNotLogin = () => {
    return (
      <View style={[styles.jdc, styles.aic, { flex: 1 }]}>
        <View>
          <FontAwesome5 name="user-cog" size={34} color="white" />
        </View>
        <View style={[styles.mt2]}>
          <View>
            <Button
              style={[styles.btn3]}
              color="white"
              onPress={() => navigator.navigate("Login" as never)}
              uppercase={false}
            >
              Click To Login
            </Button>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return <ActivityLoading />;
  }
  if (!user) {
    return <WhenUserIsNotLogin />;
  }

  return (
    <>
      <View style={[styles.movieContainer, styles._f]}>
        <FlatList
          data={settings}
          renderItem={({ item }) => <RanderItem {...item} />}
        />
        <View style={[styles.posA, styles.setToBottom, styles.padH1]}>
          <RanderItem
            name="Log out"
            icon={
              <MaterialCommunityIcons name="logout" size={24} color="white" />
            }
            key={6}
            onPress={HandleLogout}
          />
        </View>
      </View>
      {refreshing && <ActivityLoading />}
    </>
  );
};

const RanderItem: React.FC<SettingComponents> = ({
  name,
  icon,
  onPress,
  component,
}) => {
  const HandleOnPress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={() => HandleOnPress()}>
      {component ? (
        component
      ) : (
        <View
          style={[styles.fdr, styles.aic, singleStyle.settingBox, styles.mt1]}
        >
          <View>{icon}</View>
          <View style={[styles.ml1]}>
            <Text style={[styles.text1]}> {name}</Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Index;
