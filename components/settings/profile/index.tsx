import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, RadioButton, Snackbar } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";
import { styles } from "../../../styles/global";
import { profileSt, singleStyle } from "../../../styles/parts";
import { calculateAge } from "../../provider/helper";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/client";
import {
  UPDATE_PROFILE_IMG,
  UPDATE_PROFILE_INFORMATION,
} from "../../../graphql/mutation/AppDispatch";
import { SetJwtToken } from "../../provider/_storage";
import { ActivityModelLoad } from "../../single/Loading";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { SelectorType } from "../helper";
import { config } from "../../../config";
import { Input } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  return (
    <ScrollView>
      <View style={[profileSt.container]}>
        <View>
          <View>
            <EditProfileImage />
          </View>
          <View>
            <EditInformation />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const EditProfileImage = () => {
  const [UpdateImg, { data, loading }] = useMutation(UPDATE_PROFILE_IMG);

  const [image, setImage] = useState<string>("");
  const [imageBase, setImageBase] = useState<ImagePicker.ImageInfo>();
  const [notifaction, setNotifaction] = React.useState<string>("");
  const [customLoading, setCustomLoading] = React.useState<boolean>(false);

  const { user }: SelectorType = useSelector((state: any) => state.main);

  const disaptch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (data) {
      if (data.updateProfileImg.success) {
        SetJwtToken(data.updateProfileImg.jwtToken).then(() => {
          return;
        });
        setImage("");
        setImageBase(undefined);
        disaptch({ type: "UPDATE__USER", payload: data.updateProfileImg.user });
        setCustomLoading(false);
      }
      if (!data.updateProfileImg.success) {
        setNotifaction(data.updateProfileImg.message);
      }
    }
  }, [data, disaptch]);

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     if (!imageBase) {
  //       return;
  //     }

  //     // Prevent default behavior of leaving the screen
  //     if (imageBase) {
  //       e.preventDefault();
  //       Alert.alert(
  //         "Discard changes?",
  //         "You have unsaved changes. Are you sure to discard them and leave the screen?",
  //         [
  //           { text: "Don't leave", style: "cancel", onPress: () => {} },
  //           {
  //             text: "Cancel",
  //             style: "destructive",
  //             // If the user confirmed, then we dispatch the action we blocked earlier
  //             // This will continue the action that had triggered the removal of the screen
  //             onPress: () => {
  //               if (!imageBase) {
  //                 navigation.dispatch(e.data.action);
  //               }
  //             },
  //           },
  //         ]
  //       );
  //     }
  //   });
  // }, [navigation, imageBase]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      setImageBase(result);
    }
  };

  // <- ------- sending graph request ----------->
  const handleUpdateImage = async () => {
    try {
      if (!imageBase) {
        return;
      }
      setCustomLoading(true);
      const formData = new FormData();
      const extension = imageBase.uri.split(".");
      const extensionType = extension[extension.length - 1];

      formData.append("file", imageBase.base64 as string | Blob);
      formData.append("useId", user._id);
      formData.append("type", extensionType);

      const response = await fetch(
        `${config.dev.uriRest}/cinetube/api/app/user/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      const resdata = await response.json();

      if (!resdata.success) {
        setNotifaction(resdata.message);
        return;
      }

      await UpdateImg({
        variables: {
          url: resdata.url,
          id: user._id,
        },
      });
    } catch (error: any) {
      setNotifaction(error.message);
    }
  };

  const EditImage = () => {
    return (
      <View style={[styles.posA, profileSt.editImageIcon]}>
        <View>
          <Ionicons
            name="md-camera-outline"
            size={22}
            color="white"
            onPress={pickImage}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={[styles._f]}>
        {!!image && (
          <View style={[styles.mb2]}>
            <SaveEditFloat
              title="Update photo"
              onPress={handleUpdateImage}
              disabled={loading || customLoading}
            />
          </View>
        )}
        <View style={[styles.aic, styles.jdc, profileSt.userImageBox]}>
          {user && (
            <>
              {user.information.profilePhoto || image ? (
                <View style={[styles.posR]}>
                  <Avatar.Image
                    size={110}
                    source={{
                      uri: image ? image : user.information.profilePhoto,
                    }}
                  />
                  <EditImage />
                </View>
              ) : (
                <View style={[styles.posR]}>
                  <Avatar.Text size={110} label="U" />
                  <EditImage />
                </View>
              )}
            </>
          )}
        </View>
        {(loading || customLoading) && (
          <ActivityModelLoad loading={loading || customLoading} />
        )}
      </View>
      <Snackbar
        visible={notifaction ? true : false}
        duration={2000}
        onDismiss={() => {
          setNotifaction("");
        }}
      >
        {notifaction}
      </Snackbar>
    </>
  );
};

type UserInfoType = {
  userName: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
};

const EditInformation = () => {
  const { user }: SelectorType = useSelector((state: any) => state.main);

  const [userInfo, setUserInfo] = useState<UserInfoType>({
    userName: "",
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
  });

  const [genderChecked, setGenderChecked] = useState<"male" | "female">();

  const [openToEdit, setOpenToEdit] = useState(false);

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);
  const disaptch = useDispatch();
  const [UpdateUser, { data, loading }] = useMutation(
    UPDATE_PROFILE_INFORMATION
  );

  useEffect(() => {
    if (user) {
      const { userName, information } = user;
      const { firstName, lastName, dateOfBirth, gender } = information;
      setUserInfo({
        firstName,
        lastName,
        dateOfBirth,
        gender,
        userName,
      });
      setGenderChecked(gender as "male" | "female");
    }
  }, [user]);

  useEffect(() => {
    if (
      userInfo.firstName &&
      userInfo.userName &&
      userInfo.lastName &&
      userInfo.gender &&
      userInfo.dateOfBirth
    ) {
      if (user) {
        const { userName, information } = user;
        const { firstName, lastName, dateOfBirth, gender } = information;
        if (
          userInfo.firstName !== firstName ||
          userInfo.userName !== userName ||
          userInfo.lastName !== lastName ||
          userInfo.gender !== gender ||
          userInfo.dateOfBirth !== dateOfBirth
        ) {
          setOpenToEdit(true);
        }
      }
    }
  }, [userInfo, user]);

  useEffect(() => {
    if (data) {
      if (data.updateProfile.success) {
        SetJwtToken(data.updateProfile.jwtToken).then(() => {
          return;
        });
        disaptch({ type: "UPDATE__USER", payload: data.updateProfile.user });
        setOpenToEdit(false);
      }
      if (!data.updateProfile.success) {
        setNotifaction([true, data.updateProfile.message]);
      }
    }
  }, [data, disaptch]);

  const HandleUpdate = async () => {
    if (userInfo.userName.length < 5) {
      setNotifaction([true, "User name should be more then 5 character"]);
      return;
    }

    try {
      await UpdateUser({
        variables: {
          input: userInfo,
          id: user._id,
        },
      });
    } catch (error: any) {
      setNotifaction([true, error.message]);
    }
  };

  const handleDateChange = (event: any, value: any) => {
    setOpenDatePicker(false);
    const age = calculateAge(new Date(value));
    if (age < 17) {
      setNotifaction([true, "user should be 18 plus"]);
      return;
    }
    setUserInfo((pre) => {
      return { ...pre, dateOfBirth: value };
    });
  };

  const SetStyle = () => {
    if (openToEdit) {
      return {
        paddingBottom: 70,
      };
    }
    return styles.py2;
  };

  return (
    <>
      <View style={[styles.mt3, styles.jdc, SetStyle()]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View>
                <Input
                  label="User name"
                  style={{ color: "white" }}
                  // placeholder="user name"
                  // mode="outlined"
                  // outlineColor="red"
                  value={userInfo.userName}
                  onChangeText={(text) =>
                    setUserInfo((pre) => {
                      return { ...pre, userName: text };
                    })
                  }
                />
              </View>
              <View>
                <Input
                  label="First name"
                  // mode="outlined"
                  style={{ color: "white" }}
                  // placeholder="first name"
                  value={userInfo.firstName}
                  onChangeText={(text) =>
                    setUserInfo((pre) => {
                      return { ...pre, firstName: text };
                    })
                  }
                />
              </View>
              <View>
                <Input
                  style={{ color: "white" }}
                  label="Last name"
                  // mode="outlined"
                  // placeholder="last name"
                  value={userInfo.lastName}
                  onChangeText={(text) =>
                    setUserInfo((pre) => {
                      return { ...pre, lastName: text };
                    })
                  }
                />
              </View>
              <View style={[styles.ml, styles.mb1]}>
                <View style={[styles.fdr, styles.aic]}>
                  <AntDesign
                    name="calendar"
                    size={24}
                    color="white"
                    onPress={() => setOpenDatePicker(true)}
                  />
                  <Text style={[styles.text2, styles.ml]}>
                    {userInfo.dateOfBirth
                      ? moment(userInfo.dateOfBirth).format("LL")
                      : "Select Date of birth"}
                  </Text>
                </View>
                {openDatePicker && (
                  <DateTimePicker
                    onChange={handleDateChange}
                    value={new Date()}
                  />
                )}
              </View>
              <View style={styles.mt}>
                <View style={[styles.fdr, styles.aic]}>
                  <RadioButton
                    value="Male"
                    uncheckedColor="white"
                    status={genderChecked === "male" ? "checked" : "unchecked"}
                    onPress={() => {
                      setGenderChecked("male");
                      setUserInfo((pre) => {
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
                    status={
                      genderChecked === "female" ? "checked" : "unchecked"
                    }
                    onPress={() => {
                      setGenderChecked("female");
                      setUserInfo((pre) => {
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
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
      {openToEdit && (
        <SaveEditFloat
          title="Keep changed"
          onPress={HandleUpdate}
          bottom={true}
        />
      )}
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

type SaveEditProps = {
  title: string;
  onPress: Function;
  bottom?: boolean;
  disabled?: boolean;
};
export const SaveEditFloat: React.FC<SaveEditProps> = ({
  title,
  onPress,
  bottom,
  disabled,
}) => {
  const SetTo = () => {
    if (bottom) {
      return {
        bottom: 0,
      };
    }
    return {
      top: 0,
    };
  };

  return (
    <View style={[styles._f]}>
      <View style={[profileSt.updateBox, SetTo(), styles._f]}>
        <View style={[styles.fdr, styles.aic, styles.jdsb, styles.padV1]}>
          <Text style={[styles.text3]}>{title}</Text>
          <View>
            <Button
              uppercase={false}
              mode="outlined"
              color="white"
              disabled={disabled ? true : false}
              onPress={() => onPress()}
            >
              Update
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export const ProfileRoute = () => {
  const { user }: SelectorType = useSelector((state: any) => state.main);

  return (
    <View style={[styles.padH2, styles.padV2, singleStyle.profileBox]}>
      <View style={[styles.fdr, styles.aic]}>
        <View>
          <View>
            {user.information.profilePhoto ? (
              <Avatar.Image
                size={50}
                source={{ uri: user.information.profilePhoto }}
              />
            ) : (
              <Avatar.Text size={50} label="U" />
            )}
          </View>
        </View>
        <View style={[styles.fdr, styles.jdsb, styles.fg, styles.ml1]}>
          <Text
            style={[styles.text1]}
          >{`${user.information.firstName} ${user.information.lastName}`}</Text>
          {user.verify && (
            <Text>
              <AntDesign name="checkcircleo" size={20} color="blue" />
            </Text>
          )}
        </View>
      </View>
      <View
        style={[
          styles.aic,
          styles.jce,
          singleStyle.viewRag,
          styles.mt1,
          styles.pt,
        ]}
      >
        <Text style={[styles.text2]}>View profile</Text>
      </View>
    </View>
  );
};
