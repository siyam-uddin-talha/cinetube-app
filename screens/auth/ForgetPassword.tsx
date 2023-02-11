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
import { FORGET_PASSWORD } from "../../graphql/mutation/Auth";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

function emailValidate(text: string): boolean {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
}

const ForgetPassword = ({ navigation }: any) => {
  const [value, setValue] = useState<string>();

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);
  const dispatch = useDispatch();

  const [ForgetPassword, { data, loading }] = useMutation(FORGET_PASSWORD);

  useEffect(() => {
    if (data)
      if (data.forgetPassword.success) {
        setNotifaction([true, data.forgetPassword.message]);
        dispatch({
          type: "STORE__RESET__EMAIL",
          payload: data.forgetPassword.email,
        });
        navigation.navigate("Reset password");
      }
  }, [data, dispatch]);

  const handleLogin = async () => {
    if (!value) {
      setNotifaction([true, "Please fill the input"]);
      return;
    }
    if (!emailValidate(value)) {
      setNotifaction([true, "Your email is not currectly formated"]);
      return;
    }

    try {
      ForgetPassword({
        variables: {
          email: value,
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
                  placeholder="Email address"
                  style={styles.textInput}
                  selectionColor="white"
                  value={value}
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
                    uppercase={false}
                    style={styles.btn1}
                  >
                    Send reset pin
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

export default ForgetPassword;
