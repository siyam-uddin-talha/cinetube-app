import { View, Text } from "react-native";
import React from "react";
import { IMovie } from "./helper";
import { SingleMovie } from "./DisplayMovieComponent";
import { styles } from "../../styles/global";

type AppProps = {
  title: string;
  movies: IMovie[];
  collectionName: string;
};

const CustomMovies: React.FC<AppProps> = ({
  title,
  movies,
  collectionName,
}) => {
  return (
    <View>
      <View style={[styles.py2, styles.padH1]}>
        <Text style={{ color: "white" }}>{title}</Text>
      </View>
      <View>
        <View style={[styles.fww, styles.fdr, { flex: 1 }]}>
          {movies.map((e) => (
            <SingleMovie
              item={e}
              name={collectionName}
              key={e._id}
              style={{ marginBottom: 15 }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CustomMovies;
