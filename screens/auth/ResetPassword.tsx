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
import { RESET_PASSWORD } from "../../graphql/mutation/Auth";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

type ResetValue = {
  pin: number | string;
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ navigation }: any) => {
  const [value, setValue] = useState<ResetValue>({
    pin: 0,
    password: "",
    confirmPassword: "",
  });

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);
  const [ResetPassword, { data, loading }] = useMutation(RESET_PASSWORD);

  const dispatch = useDispatch();
  const { resetEmail } = useSelector((state: any) => state.main);

  useEffect(() => {}, [data, dispatch]);

  console.log(data, "reset");

  const handleResetPassword = async () => {
    try {
      const { pin, password, confirmPassword } = value;
      const converIt = Number(pin);

      if (!converIt) {
        setNotifaction([true, "Make sure you entered only PIN"]);
        return;
      }
      if (!pin && !password && !confirmPassword) {
        setNotifaction([true, "Please fill the input"]);
        return;
      }
      if (password.length < 8) {
        setNotifaction([true, "Password should be more then 8 character"]);
        return;
      }
      if (password !== confirmPassword) {
        setNotifaction([true, "Password dosen't match"]);
        return;
      }

      ResetPassword({
        variables: {
          email: resetEmail,
          resetPIN: converIt,
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
          <Text style={styles.text1}>Reset Password</Text>
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
                  value={value.pin as string}
                  onChangeText={(text) =>
                    setValue((pre) => {
                      return {
                        ...pre,
                        pin: text,
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
                />
              </View>

              <View style={styles.mt2}>
                <TextInput
                  placeholder="confirm password"
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
                        confirmPassword: text,
                      };
                    })
                  }
                  onSubmitEditing={handleResetPassword}
                />
              </View>

              <View style={styles.mt3}>
                <TouchableOpacity>
                  <Button
                    onPress={handleResetPassword}
                    color="white"
                    loading={loading}
                    disabled={loading}
                    uppercase={false}
                    style={styles.btn1}
                  >
                    Reset
                  </Button>
                </TouchableOpacity>
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

export default ResetPassword;
