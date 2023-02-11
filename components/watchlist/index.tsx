import { View, Text, FlatList, RefreshControl, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { GetWatchLaterMovies } from "../provider/_storage";
import { IMovie, MovieContentsType } from "../provider/helper";
import { styles } from "../../styles/global";
import { SingleMovie } from "../provider/DisplayMovieComponent";
import Empty from "../single/Empty";

const Index = () => {
  const [refresh, setRefresh] = useState(false);

  const [watchLater, setWatchLater] = useState<MovieContentsType[]>([]);

  useEffect(() => {
    const getTheList = async () => {
      const list = await GetWatchLaterMovies();
      setWatchLater(list);
      setRefresh(false);
    };
    getTheList();
  }, [GetWatchLaterMovies, refresh]);

  if (watchLater.length === 0) {
    return <Empty title="Your didn't save any movie" />;
  }

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
          />
        }
      >
        <View>
          <WatchLaterRender props={watchLater} />
        </View>
      </ScrollView>
    </>
  );
};

type AppProps = {
  props: MovieContentsType[];
};
const WatchLaterRender: React.FC<AppProps> = ({ props }) => {
  return (
    <View>
      <View style={[styles.padH1, styles.padV1]}>
        <View style={[styles.fww, styles.fdr]}>
          {props.map((e, i) => (
            <View key={`${e.name} ${i}`} style={[styles.fww, styles.fdr]}>
              {e.movies.map((a) => (
                <SingleMovie
                  item={a}
                  name={e.name}
                  key={a._id}
                  style={{ marginBottom: 15 }}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Index;
