import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import { Button, RadioButton, Snackbar } from "react-native-paper";
import { SignUpTypes } from "./Types";
import { styles } from "../../styles/global";
import { useMutation } from "@apollo/client";
import { GET_VERIFY_PIN, SIGNUP_NEW } from "../../graphql/mutation/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { SetJwtToken } from "../../components/provider/_storage";

function emailValidate(text: string): boolean {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
}

const Signup = ({ navigation }: any) => {
  const [value, setValue] = useState<SignUpTypes>({
    email: "",
    password: "",
    userName: "",
    firstName: "",
    lastName: "",
    gender: "",
  });
  const [genderChecked, setGenderChecked] = useState<"male" | "female">();

  const [notifaction, setNotifaction] = useState<[boolean, string]>([
    false,
    "",
  ]);
  const [nextForm, setNextForm] = useState(false);
  const [SignIn, { data, loading }] = useMutation(SIGNUP_NEW);
  const [GetVerifyPin, { data: reqVerify }] = useMutation(GET_VERIFY_PIN);

  const { nextRoute } = useSelector((state: any) => state.main);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  useEffect(() => {
    if (reqVerify) {
      if (reqVerify.getVerifyPin.success) {
        navigate.navigate("Verify Account" as never);
      }
      if (!reqVerify.getVerifyPin.success) {
        setNotifaction([true, reqVerify.getVerifyPin.message]);
      }
    }
  }, [reqVerify, navigate]);

  useEffect(() => {
    if (data) {
      if (data.signup.success) {
        dispatch({
          type: "SIGNUP__SUCCESS__NOT_VERIFIED",
          payload: data.signup.user,
        });
        SetJwtToken(data.signup.jwtToken).then(() => {
          return;
        });
        setNotifaction([true, "New account created"]);

        if (!data.signup.verify) {
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
                    navigation.navigate("Home");
                  } else {
                    navigation.navigate("Home");
                  }
                },
              },
              {
                text: "Get verified",
                onPress: () =>
                  GetVerifyPin({
                    variables: {
                      id: data.signup.user._id,
                    },
                  }),
              },
            ]
          );
        }
      }
      if (!data.signup.success) {
        setNotifaction([true, data.signup.message]);
      }
    }
  }, [data, dispatch, nextRoute]);

  const handleLogin = async () => {
    const { firstName, lastName, email, password, userName, gender } = value;

    if (firstName.length < 2) {
      setNotifaction([true, "User name should be more then 2 character"]);
      return;
    }
    if (lastName.length < 2) {
      setNotifaction([true, "User name should be more then 2 character"]);
      return;
    }

    try {
      await SignIn({
        variables: {
          input: {
            firstName,
            lastName,
            email,
            password,
            userName,
            gender,
          },
        },
      });
    } catch (error: any) {
      setNotifaction([true, error.message]);
    }
  };

  const handleFrontendLogin = () => {
    const { email, password, userName } = value;

    if (!email || !password || !userName) {
      setNotifaction([true, "Please fill the input"]);
      return;
    }

    if (!emailValidate(email)) {
      setNotifaction([true, "Your email is not correctly formated"]);
      return;
    }

    if (userName.length < 5) {
      setNotifaction([true, "User name should be more then 5 character"]);
      return;
    }

    if (password.length < 8) {
      setNotifaction([true, "Password should be more then 8 character"]);
      return;
    }
    setNextForm(true);
  };

  const SecoundryForm = () => {
    return (
      <View style={styles.inner}>
        <View style={styles.mt2}>
          <TextInput
            placeholder="First name"
            style={styles.textInput}
            selectionColor="white"
            placeholderTextColor="white"
            value={value.firstName}
            onChangeText={(text) =>
              setValue((pre) => {
                return {
                  ...pre,
                  firstName: text,
                };
              })
            }
          />
        </View>
        <View style={styles.mt2}>
          <TextInput
            placeholder="Last name"
            style={styles.textInput}
            selectionColor="white"
            value={value.lastName}
            onChangeText={(text) =>
              setValue((pre) => {
                return {
                  ...pre,
                  lastName: text,
                };
              })
            }
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.mt2}>
          <View style={[styles.fdr, styles.aic]}>
            <RadioButton
              value="Male"
              uncheckedColor="white"
              status={genderChecked === "male" ? "checked" : "unchecked"}
              onPress={() => {
                setGenderChecked("male");
                setValue((pre) => {
                  return {
                    ...pre,
                    gender: "male",
                  };
                });
              }}
            />
            <View>
              <Text style={[styles.text1]}>Male</Text>
            </View>
          </View>
          <View style={[styles.fdr, styles.aic]}>
            <RadioButton
              value="Female"
              uncheckedColor="white"
              status={genderChecked === "female" ? "checked" : "unchecked"}
              onPress={() => {
                setGenderChecked("female");
                setValue((pre) => {
                  return {
                    ...pre,
                    gender: "female",
                  };
                });
              }}
            />
            <View>
              <Text style={[styles.text1]}>Female</Text>
            </View>
          </View>
        </View>

        <View style={styles.mt3}>
          <TouchableOpacity>
            <Button
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              color="white"
              style={styles.btn1}
            >
              {"Signup"}
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <View style={{ padding: 15 }}>
          <Text style={styles.text1}>Signup with Email</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={[styles.pb2]}>
              <View style={[styles.inner]}>
                <View>
                  <TextInput
                    placeholder="User name"
                    style={styles.textInput}
                    selectionColor="white"
                    placeholderTextColor="white"
                    value={value.userName}
                    onChangeText={(text) =>
                      setValue((pre) => {
                        return {
                          ...pre,
                          userName: text,
                        };
                      })
                    }
                  />
                </View>
                <View style={styles.mt2}>
                  <TextInput
                    placeholder="Email"
                    style={styles.textInput}
                    selectionColor="white"
                    value={value.email}
                    onChangeText={(text) =>
                      setValue((pre) => {
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
                      setValue((pre) => {
                        return {
                          ...pre,
                          password: text,
                        };
                      })
                    }
                    onSubmitEditing={handleLogin}
                  />
                </View>
                {!nextForm && (
                  <View style={styles.mt3}>
                    <TouchableOpacity>
                      <Button
                        onPress={handleFrontendLogin}
                        color="white"
                        style={styles.btn1}
                      >
                        Next
                      </Button>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {nextForm && <SecoundryForm />}
              <View style={[styles.inner]}>
                <View style={[styles.mt2, styles.fdr, styles.jdsb]}>
                  <Text style={styles.text2}>
                    Already Login ?{" "}
                    <Text
                      style={styles.color1}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Login
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
      </ScrollView>
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

export default Signup;
