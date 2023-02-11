import { View, Text, Dimensions, Image, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BANNER_CONTENT } from "../../graphql/query/AppInitial";
import Carousel from "react-native-snap-carousel";
import { animatedStyles, scrollInterpolator } from "../utils/animation";
import { homeStyle, singleStyle } from "../../styles/parts";
import { Button } from "react-native-paper";
import { styles } from "../../styles/global";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { ContentType } from "../provider/helper";
import { useNavigation } from "@react-navigation/native";
import { BannerLoading } from "../single/Loading";

const SLIDER_WIDTH = Dimensions.get("window").width;

const Banner = () => {
  const { data, refetch, error, loading } = useQuery(GET_BANNER_CONTENT);
  const { globalLoading } = useSelector((state: any) => state.main);
  const dispatch = useDispatch();

  const [banerContent, setbanerContent] = useState<ContentType[]>([]);

  useEffect(() => {
    if (data) {
      if (data.getAllBanner.success) {
        setbanerContent(data.getAllBanner.banners);
      }
    }
  }, [data]);

  useEffect(() => {
    if (globalLoading) {
      refetch();
    }
  }, [globalLoading, refetch]);

  useEffect(() => {
    if (globalLoading) {
      if (data) {
        if (data.getAllBanner.success) {
          setbanerContent(data.getAllBanner.banners);
          dispatch({ type: "GLOBALlOADING__END" });
        }
      }
    }
  }, [globalLoading, data]);

  if (loading) {
    return <BannerLoading />;
  }
  return (
    <View>
      <View>
        <Carousel
          data={banerContent}
          renderItem={({ item }) => <RenderItem item={item} />}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={SLIDER_WIDTH - 10}
          keyExtractor={(item) => item._id}
          autoplay
          layout="stack"
          inactiveSlideShift={0}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
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
    <LinearGradient
      // start={{ x: 0.0, y: 0.25 }}
      // end={{ x: 0.5, y: 1.0 }}
      locations={[0, 0.3]}
      // colors={["red", "#0d1824e6", "#0d1824d4"]}
      colors={["transparent", "#0d1824d4"]}
    >
      <View style={[homeStyle.bannerParents]}>
        <View>
          <Image
            source={{
              uri: item.thumbnail,
            }}
            style={[singleStyle.img1]}
          />
        </View>
        <View style={[homeStyle.bannerContentContainer]}>
          <Button
            onPress={() => handleNavigateToView(item)}
            color="white"
            style={styles.btn4}
            icon="movie-play-outline"
          >
            Watch now
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Banner;
