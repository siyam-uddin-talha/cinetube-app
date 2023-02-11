import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { GET_ALL_MOVIES_FOR_SEARCH } from "../../graphql/query/AppInitial";
import { styles } from "../../styles/global";
import { singleStyle } from "../../styles/parts";
import { IMovie } from "../provider/helper";
import { ActivityLoading } from "../single/Loading";
import SearchBar from "react-native-dynamic-search-bar";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

type MovieContentsType = {
  name: string;
  movies: IMovie[];
};

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [searchMovies, setSearchMovies] = useState<IMovie[]>([]);

  const { data, loading } = useQuery(GET_ALL_MOVIES_FOR_SEARCH, {
    variables: {
      all: true,
    },
  });

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      const container: IMovie[] = [];

      if (data) {
        if (data.getAllMovies.success) {
          for (const element of data.getAllMovies.collections) {
            if (element) {
              const filtered = element.movies.filter((e: IMovie) => {
                const regex = new RegExp(query, "gi");
                var wordInLine = "";
                e.tags.map((e: string) => (wordInLine = wordInLine + " " + e));
                return wordInLine.match(regex) || e.name.match(regex);
              });
              container.push(...filtered);

              setSearchMovies(container);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchMovies([]);
    }
  }, [searchQuery]);

  const GetCollections = (): MovieContentsType[] => {
    if (data) {
      if (data.getAllMovies.success) {
        return data.getAllMovies.collections;
      }
    }
    return [];
  };

  return (
    <>
      <View>
        <SearchBar
          placeholder="e.g Avenger's end game"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onClearPress={() => setSearchQuery("")}
          // style={[singleStyle.searchBar]}
          // placeholderTextColor="white"
          focusable={true}
        />
      </View>
      <View>
        <DisplaySearchItem
          movies={searchMovies}
          collections={GetCollections()}
        />
      </View>
      {loading && <ActivityLoading />}
    </>
  );
};

export default MyComponent;

type SearchItemProps = {
  movies: IMovie[];
  collections: MovieContentsType[];
};
const DisplaySearchItem: React.FC<SearchItemProps> = ({
  movies,
  collections,
}) => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const handleNavigateToView = (item: IMovie) => {
    // for (let i = 0; i < collections.length; i++) {
    //   const element = collections[i];
    //   const movieList = element.movies.find((e)=>{

    //   })
    const getIt = collections.find((e) => {
      return e.movies.find((e) => e._id === item._id);
    });
    if (!getIt) return;

    dispatch({ type: "CURRENT__MOVIE", payload: item.name });
    dispatch({ type: "MOVIE__&__SUGGESTION", payload: getIt.name });

    navigate.navigate(
      "View Movie" as never,
      {
        _id: item._id,
        name: getIt.name,
      } as never
    );
  };

  return (
    // <ScrollView>
    <View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item._id}
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
    // </ScrollView>
  );
};
