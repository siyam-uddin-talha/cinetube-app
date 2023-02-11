import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Button, Snackbar } from "react-native-paper";
import { LoginValue } from "./Types";

import { styles } from "../../styles/global";
import { GET_VERIFY_PIN, LOGIN } from "../../graphql/mutation/Auth";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { SetJwtToken } from "../../components/provider/_storage";

const Login = ({ navigation }: any) => {
  const [value, setvalue] = useState<LoginValue>({
    email: "",
    password: "",
  });
  const { nextRoute } = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

  const [Login, { data, loading }] = useMutation(LOGIN);

  const [GetVerifyPin, { data: reqVerify }] = useMutation(GET_VERIFY_PIN);

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);

  useEffect(() => {
    if (reqVerify) {
      if (reqVerify.getVerifyPin.success) {
        navigation.navigate("Verify Account" as never);
      }
      if (!reqVerify.getVerifyPin.success) {
        setNotifaction([true, reqVerify.getVerifyPin.message]);
      }
    }
  }, [reqVerify, navigation]);

  useEffect(() => {
    if (data) {
      if (data.login.success) {
        setNotifaction([true, "Login success"]);
        dispatch({
          type: "LOGIN__USER",
          payload: data.login.user,
        });
        SetJwtToken(data.login.jwtToken).then(() => {
          return;
        });
        if (!data.login.user.verify) {
          Alert.alert(
            "Account verification",
            "You need to  verify your account",
            [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                  if (nextRoute) {
                    if (nextRoute.route) {
                      navigation.navigate(nextRoute.route, nextRoute);
                      return;
                    }
                    navigation.goBack();
                  } else {
                    navigation.goBack();
                  }
                },
              },
              {
                text: "Get verified",
                onPress: () =>
                  GetVerifyPin({
                    variables: {
                      id: data.login.user._id,
                    },
                  }),
              },
            ]
          );
        } else {
          if (nextRoute) {
            if (nextRoute.route) {
              navigation.navigate(nextRoute.route, nextRoute);
              return;
            }
            navigation.goBack();
          } else {
            navigation.goBack();
          }
        }
      }
      if (!data.login.success) {
        setNotifaction([true, data.login.message]);
      }
    }
  }, [data, nextRoute, GetVerifyPin]);

  const handleLogin = async () => {
    const { email, password } = value;

    if (!email || !password) {
      setNotifaction([true, "Please fill the input"]);
      return;
    }
    if (password.length < 8) {
      setNotifaction([true, "Password should be more then 8 character"]);
      return;
    }

    try {
      Login({
        variables: {
          email,
          password,
        },
      });
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
          <Text style={styles.text1}>Login with Email</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View>
                <TextInput
                  placeholder="Email"
                  style={styles.textInput}
                  selectionColor="white"
                  value={value.email}
                  onChangeText={(text) =>
                    setvalue((pre) => {
                      return {
                        ...pre,
                        email: text,
                      };
                    })
                  }
                  placeholderTextColor="white"
                />
              </View>
              <View style={styles.mt2}>
                <TextInput
                  placeholder="password"
                  style={styles.textInput}
                  selectionColor="white"
                  placeholderTextColor="white"
                  value={value.password}
                  passwordRules={"8"}
                  secureTextEntry
                  onChangeText={(text) =>
                    setvalue((pre) => {
                      return {
                        ...pre,
                        password: text,
                      };
                    })
                  }
                  onSubmitEditing={handleLogin}
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
                    Continue
                  </Button>
                </TouchableOpacity>
              </View>
              <View style={styles.mt2}>
                {/* <Text style={styles.text2}>
                  Not Signin yet?{" "}
                  <Text
                    style={styles.color1}
                    onPress={() => navigation.navigate("Sign up")}
                  >
                    Sign up
                  </Text>
                </Text> */}
                <View style={[styles.mt2, styles.fdr, styles.jdsb]}>
                  <Text style={styles.text2}>
                    Not sign up ?{" "}
                    <Text
                      style={styles.color1}
                      onPress={() => navigation.navigate("Sign up")}
                    >
                      Sign up
                    </Text>
                  </Text>
                  <Text style={styles.text2}>
                    <Text
                      style={styles.color1}
                      onPress={() => navigation.navigate("Forget password")}
                    >
                      Forget password!
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>

      <Snackbar
        visible={notifaction[0]}
        duration={2000}
        onDismiss={() => {
          setNotifaction([false, ""]);
        }}
      >
        {notifaction[1]}
      </Snackbar>
    </View>
  );
};

export default Login;
