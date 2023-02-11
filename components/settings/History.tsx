import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { ClearHistory, GetHistory } from "../provider/_storage";
import { IHistoryMovie } from "../provider/helper";
import { ActivityLoading } from "../single/Loading";
import { singleStyle } from "../../styles/parts";
import { styles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import Empty from "../single/Empty";

const History = () => {
  const [loading, setLoading] = useState(true);

  const [historyContent, setHistoryContent] = useState<IHistoryMovie[]>([]);
  const navigate = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const GetUserHistory = async () => {
      const history = await GetHistory();
      setHistoryContent(history);
      setLoading(false);
    };
    GetUserHistory();
  }, []);

  const handleClearHistory = async () => {
    await ClearHistory();
  };

  const handleNavigateToView = (item: IHistoryMovie) => {
    dispatch({ type: "CURRENT__MOVIE", payload: item.name });
    dispatch({ type: "MOVIE__&__SUGGESTION", payload: item.collectionName });

    navigate.navigate(
      "View Movie" as never,
      {
        _id: item._id,
        name: item.collectionName,
      } as never
    );
  };

  if (loading) {
    return <ActivityLoading />;
  }

  if (historyContent.length === 0) {
    return <Empty title="Your didn't watch any movie" emoji />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={historyContent}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={singleStyle.searchResultBox}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNavigateToView(item)}>
              <View
                style={[
                  styles.padH2,
                  styles.padV1,
                  singleStyle.searchResultSingle,
                ]}
                key={item._id}
              >
                <View style={[styles.fdr, styles.aic]}>
                  <View>
                    <Image
                      source={{
                        uri: item.thumbnail,
                      }}
                      style={[singleStyle.searchItemImg]}
                    />
                  </View>
                  <View style={[styles.ml1]}>
                    <Text style={[styles.text2]}>{item.name}</Text>
                    <Text style={[styles.text3]}>
                      {item.subTitle && item.subTitle.split(" ").join(" | ")}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {historyContent.length > 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.posA,
              styles.setToBottom,
              { backgroundColor: "#141d26" },
            ]}
          >
            <Button
              icon={"delete-sweep-outline"}
              color="white"
              onPress={handleClearHistory}
            >
              Clear history
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default History;
