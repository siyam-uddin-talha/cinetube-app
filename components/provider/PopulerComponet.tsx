import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { homeStyle, singleStyle } from "../../styles/parts";
import { styles } from "../../styles/global";
import BrandingText from "./BrandingText";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { ContentType } from "./helper";

type AppProps = {
  data: ContentType[];
};

const PopulerComponet: React.FC<AppProps> = ({ data }) => {
  return (
    <View style={[styles.movieContainer]}>
      {data.length !== 0 && <BrandingText title="populer movies" />}

      <View>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {data.map((e) => (
            <RenderItem item={e} key={e._id} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

type PropsType = {
  item: ContentType;
};
const RenderItem = ({ item }: PropsType) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const handleNavigateToView = (item: ContentType) => {
    dispatch({ type: "CURRENT__MOVIE", payload: item.movieName });

    dispatch({ type: "MOVIE__&__SUGGESTION", payload: item.collectionName });
    navigate.navigate(
      "View Movie" as never,
      {
        _id: item.movieId,
        name: item.collectionName,
      } as never
    );
  };

  return (
    <View style={[singleStyle.parent1]}>
      <TouchableOpacity onPress={() => handleNavigateToView(item)}>
        <View>
          <Image
            source={{
              uri: item.thumbnail,
            }}
            style={[singleStyle.img2]}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PopulerComponet;
