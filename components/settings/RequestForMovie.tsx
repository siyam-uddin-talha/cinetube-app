import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../styles/global";
import { Input } from "@rneui/base";

import { AntDesign } from "@expo/vector-icons";
import { Button, Snackbar } from "react-native-paper";
import { useMutation } from "@apollo/client";
import { REQUEST_FOR_MOVIE } from "../../graphql/mutation/AppDispatch";
import { ActivityModelLoad } from "../single/Loading";
import { useSelector } from "react-redux";
import { SelectorType } from "./helper";

type ReqValueType = {
  movieName: string;
  company: string;
  country: string;
  actors: string;
};

const RequestForMovie = () => {
  const [reqValue, setReqValue] = useState<ReqValueType>({
    movieName: "",
    company: "",
    country: "",
    actors: "",
  });

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);

  const [RequestForMovie, { data, loading }] = useMutation(REQUEST_FOR_MOVIE);
  const { user }: SelectorType = useSelector((state: any) => state.main);

  useEffect(() => {
    if (data) {
      if (data.requestForMovie.success) {
        setNotifaction([true, data.requestForMovie.message]);
        setReqValue({
          movieName: "",
          company: "",
          country: "",
          actors: "",
        });
      }
      if (!data.requestForMovie.success) {
        setNotifaction([true, data.requestForMovie.message]);
      }
    }
  }, [data]);

  const handleSumbit = async () => {
    const { movieName, company, country, actors } = reqValue;
    if (!movieName || !country || !actors) {
      setNotifaction([true, "please fill the inputs"]);
      return;
    }
    await RequestForMovie({
      variables: {
        input: {
          movieName,
          company,
          country,
          actors,
          userId: user._id,
        },
      },
    });
  };

  return (
    <>
      <ScrollView>
        <View style={[styles.container4]}>
          <View>
            <Text style={[styles.txtBg2, { textDecorationLine: "underline" }]}>
              Attention
            </Text>
            <Text style={[styles.txtBg1, styles.py1]}>
              In today's world, there are tons of ton movies. So it is
              impossible to collect all movies and publish them. But we are
              trying to collect all movies. But sometimes we miss publishing
              your favorite movie. But your need to watch it. So we can help you
              to find your favorite movie & make you pleasure
            </Text>
            <Text
              style={[
                styles.txtBg2,
                styles.py1,
                { textDecorationLine: "underline" },
              ]}
            >
              Make a Request
            </Text>
          </View>

          <View>
            <View style={[styles.padV2]}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View>
                    <View>
                      <Input
                        label="Movie name"
                        style={{ color: "white" }}
                        placeholder="e.g Avater"
                        value={reqValue.movieName}
                        onChangeText={(text) =>
                          setReqValue((pre) => {
                            return { ...pre, movieName: text };
                          })
                        }
                      />
                    </View>
                    <View>
                      <Input
                        label="Industry (optional)"
                        // mode="outlined"

                        style={{ color: "white" }}
                        placeholder="e.g DC"
                        value={reqValue.company}
                        onChangeText={(text) =>
                          setReqValue((pre) => {
                            return { ...pre, company: text };
                          })
                        }
                      />
                    </View>
                    <View>
                      <Input
                        style={{ color: "white" }}
                        label="Where the movie released (country)"
                        placeholder="e.g USA"
                        value={reqValue.country}
                        onChangeText={(text) =>
                          setReqValue((pre) => {
                            return { ...pre, country: text };
                          })
                        }
                      />
                    </View>
                    <View>
                      <Input
                        style={{ color: "white" }}
                        label="Some actors name"
                        placeholder="e.g Tom cruise, Rock"
                        value={reqValue.actors}
                        onChangeText={(text) =>
                          setReqValue((pre) => {
                            return { ...pre, actors: text };
                          })
                        }
                      />
                    </View>
                    <View style={[styles.py1, styles.aic]}>
                      <Button
                        uppercase={false}
                        mode="contained"
                        onPress={handleSumbit}
                      >
                        Submit
                      </Button>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
            </View>
          </View>
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

export default RequestForMovie;
