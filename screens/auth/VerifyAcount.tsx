import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Button, Snackbar } from "react-native-paper";

import { styles } from "../../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { VERIFY_ACCOUNT } from "../../graphql/mutation/Auth";
import { useMutation } from "@apollo/client";
import { SetJwtToken, SetUser } from "../../components/provider/_storage";
import { useNavigation } from "@react-navigation/native";

const VerifyAccount = ({ navigation }: any) => {
  const [value, setValue] = useState<number | string>();
  const { user, nextRoute } = useSelector((state: any) => state.main);

  const dispatch = useDispatch();

  const [VerifyAccount, { data, loading }] = useMutation(VERIFY_ACCOUNT);

  const [notifaction, setNotifaction] = React.useState<
    [boolean, string, number?]
  >([false, ""]);

  useEffect(() => {
    setNotifaction([true, "We send verification PIN to your email", 5000]);
  }, []);

  useEffect(() => {
    if (data) {
      if (data.verifyAccount.success) {
        setNotifaction([true, "Account verify success"]);
        dispatch({
          type: "VERIFY__SUCCESS",
          payload: data.verifyAccount.user,
        });

        SetJwtToken(data.verifyAccount.jwtToken).then(() => {
          return;
        });
        if (nextRoute) {
          if (nextRoute.route) {
            navigation.navigate(nextRoute.route, {
              _id: nextRoute.movieId,
              name: nextRoute.name,
            });
          }
        } else {
          navigation.navigate("Home" as never);
        }
      }
      if (!data.verifyAccount.success) {
        setNotifaction([true, data.verifyAccount.message]);
      }
    }
  }, [data, dispatch, navigation, nextRoute]);

  const handleLogin = async () => {
    if (!value) {
      setNotifaction([true, "Please fill the input"]);
      return;
    }
    const converIt = Number(value);

    if (!converIt) {
      setNotifaction([true, "Make sure you entered only PIN"]);
      return;
    }
    if (!user) {
      setNotifaction([true, "Something wrong! please try to login & verify"]);
      return;
    }

    VerifyAccount({
      variables: {
        id: user._id,
        pin: converIt,
      },
    });
    try {
    } catch (error: any) {
      setNotifaction([true, error.message]);
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "center",
      }}
    >
      <View>
        <View style={{ padding: 15, marginTop: 10 }}>
          <Text style={styles.text1}>Verify Account</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View>
                <TextInput
                  placeholder="PIN"
                  style={styles.textInput}
                  selectionColor="white"
                  keyboardType="numeric"
                  value={value as string}
                  onChangeText={(text) => setValue(text)}
                  placeholderTextColor="white"
                />
              </View>

              <View style={styles.mt3}>
                <TouchableOpacity>
                  <Button
                    onPress={handleLogin}
                    color="white"
                    loading={loading}
                    disabled={loading}
                    style={styles.btn1}
                  >
                    Verify
                  </Button>
                </TouchableOpacity>
              </View>

              <View style={styles.mt2}>
                <Text style={styles.text2}>
                  <Text
                    style={styles.color1}
                    onPress={() => navigation.navigate("Login")}
                  >
                    Login
                  </Text>
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>

      <Snackbar
        visible={notifaction[0]}
        duration={notifaction[2] ? notifaction[2] : 2000}
        onDismiss={() => {
          setNotifaction([false, ""]);
        }}
      >
        {notifaction[1]}
      </Snackbar>
    </View>
  );
};

export default VerifyAccount;
