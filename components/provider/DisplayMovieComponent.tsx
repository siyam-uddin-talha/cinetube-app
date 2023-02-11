/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { IMovie, MovieContentsType } from "./helper";
import BrandingText from "./BrandingText";
import { singleStyle } from "../../styles/parts";
import { Rating, AirbnbRating } from "react-native-ratings";
import { styles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { Entypo } from "@expo/vector-icons";

type AppProps = {
  props: MovieContentsType[];
};

const DisplayMovieComponent: React.FC<AppProps> = ({ props }) => {
  return (
    <View style={[styles.padV1]}>
      {props.map((e, i) => (
        <RenderItems name={e.name} movies={e.movies} key={`${e.name}${i}`} />
      ))}
    </View>
  );
};

const RenderItems: React.FC<MovieContentsType> = ({ name, movies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const NavigateToAllCollections = () => {
    dispatch({ type: "VIEW_ALL_MOVIE_COLLECTION", payload: name });

    navigate.navigate(
      "Watch collections" as never,
      {
        collectionName: name,
      } as never
    );
  };

  return (
    <View style={[styles.movieContainer]}>
      <View>
        <BrandingText title={name} onPress={NavigateToAllCollections} />
      </View>
      <View>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {movies.map((e) => (
            <SingleMovie item={e} key={e._id} name={name} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

type SinglePropsType = {
  item: IMovie;
  name: string;
  style?: StyleProp<ViewStyle>;
};

export const SingleMovie: React.FC<SinglePropsType> = ({
  item,
  name,
  style,
}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const handleNavigateToView = (_id: string) => {
    dispatch({ type: "CURRENT__MOVIE", payload: item.name });

    dispatch({ type: "MOVIE__&__SUGGESTION", payload: name });

    navigate.navigate(
      "View Movie" as never,
      {
        _id,
        name,
      } as never
    );
  };

  return (
    <View style={[singleStyle.parent2, style]}>
      <TouchableOpacity onPress={() => handleNavigateToView(item._id)}>
        <View>
          <View style={[styles.posR]}>
            <Image
              source={{
                uri: item.thumbnail,
              }}
              style={[singleStyle.singleShowImg]}
            />
          </View>
          <View style={[styles.posA, singleStyle.imgQuality]}>
            <Text style={[singleStyle.qualityText]}>{item.quality}</Text>
          </View>
        </View>
        <View style={[singleStyle.infoParents]}>
          <View>
            <Text style={[singleStyle.singleText]}>
              {item.name.length > 23
                ? `${item.name.substr(0, 23)}...`
                : item.name}
            </Text>
          </View>
          <View>
            <Text
              style={[singleStyle.singleText2, styles.mt, styles.capitalize]}
            >
              {item.subTitle}
            </Text>
          </View>
          <View style={[styles.fdr, styles.aic]}>
            <Text>
              <Entypo name="dot-single" size={20} color="white" />
            </Text>
            <Text style={[singleStyle.singleText2]}>{item.language}</Text>
          </View>

          <View style={[styles.fdr, styles.aic, styles.jdsb]}>
            <Text style={[styles.mt]}>
              {item.star === 0 ? (
                <AirbnbRating
                  showRating={false}
                  isDisabled={true}
                  count={1}
                  size={10}
                  selectedColor="#5e5e5e"
                  reviewSize={5}
                />
              ) : (
                <AirbnbRating
                  showRating={false}
                  isDisabled={true}
                  count={item.star / 2}
                  size={10}
                  reviewSize={5}
                  defaultRating={10}
                />
              )}
            </Text>
            <Text style={[styles.text3]}>{item.star}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DisplayMovieComponent;
