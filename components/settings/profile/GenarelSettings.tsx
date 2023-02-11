import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../../styles/global";
// import { Input } from "";
import { SelectorType } from "../helper";
import { useSelector } from "react-redux";
import { SaveEditFloat } from ".";
import { Button, Snackbar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../../../graphql/mutation/Auth";
import { ActivityModelLoad } from "../../single/Loading";
import { Input } from "@rneui/themed";

type FildValue = {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

const GenarelSettings = () => {
  const [value, setValue] = useState<FildValue>({
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { user }: SelectorType = useSelector((state: any) => state.main);

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);

  const [openToEdit, setOpenToEdit] = useState(false);

  const [UpdatePassword, { data, loading }] = useMutation(CHANGE_PASSWORD);

  useEffect(() => {
    if (value.confirmPassword) {
      setOpenToEdit(true);
    }
    if (!value.confirmPassword) {
      setOpenToEdit(false);
    }
  }, [value]);

  useEffect(() => {
    if (user) {
      const { email } = user;
      setValue((pre) => {
        return {
          ...pre,
          email,
        };
      });
    }
  }, [user]);

  useEffect(() => {
    if (data) {
      if (data.changePassword.success) {
        setNotifaction([true, data.changePassword.message]);
        setValue((pre) => {
          return {
            ...pre,
            password: "",
            newPassword: "",
            confirmPassword: "",
          };
        });
      }
      if (!data.changePassword.success) {
        setNotifaction([true, data.changePassword.message]);
      }
    }
  }, [data]);

  const HandlePasswordChange = async () => {
    const { password, confirmPassword, newPassword } = value;
    if (newPassword.length < 8) {
      setNotifaction([true, "Password should be more then 8 character"]);
      return;
    }
    if (newPassword !== confirmPassword) {
      setNotifaction([true, "Password dosen't match"]);
      return;
    }
    try {
      await UpdatePassword({
        variables: {
          password,
          id: user._id,
          newPassword,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={[styles.container5, styles.py2, styles.my2]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <View>
                  <Input
                    placeholder="Email"
                    label="Email (currently disabled)"
                    disabled
                    style={[styles.textInput]}
                    inputContainerStyle={{ borderBottomColor: "transparent" }}
                    selectionColor="white"
                    value={value.email}
                    placeholderTextColor="white"
                  />
                </View>
                <View>
                  <Input
                    placeholder="password"
                    label="Password"
                    secureTextEntry
                    style={[styles.textInput]}
                    inputContainerStyle={{ borderBottomColor: "transparent" }}
                    selectionColor="white"
                    value={value.password}
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
                <View>
                  <Input
                    placeholder="new password"
                    label="New password"
                    secureTextEntry
                    disabled={value.password ? false : true}
                    style={[styles.textInput]}
                    inputContainerStyle={{ borderBottomColor: "transparent" }}
                    selectionColor="white"
                    value={value.newPassword}
                    onChangeText={(text) =>
                      setValue((pre) => {
                        return {
                          ...pre,
                          newPassword: text,
                        };
                      })
                    }
                  />
                </View>
                <View>
                  <Input
                    placeholder="confirm password"
                    label="Confirm password"
                    secureTextEntry
                    disabled={value.newPassword ? false : true}
                    style={[styles.textInput]}
                    inputContainerStyle={{ borderBottomColor: "transparent" }}
                    selectionColor="white"
                    value={value.confirmPassword}
                    onChangeText={(text) =>
                      setValue((pre) => {
                        return {
                          ...pre,
                          confirmPassword: text,
                        };
                      })
                    }
                  />
                </View>
                {openToEdit && (
                  <View style={[styles.aie]}>
                    <Button
                      uppercase={false}
                      color="white"
                      mode="contained"
                      onPress={HandlePasswordChange}
                    >
                      Change
                    </Button>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
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

      {loading && <ActivityModelLoad loading={loading} />}
    </>
  );
};

export default GenarelSettings;
