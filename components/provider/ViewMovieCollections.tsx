import { View, Text, FlatList, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import UsePaginator from "./UsePaginator";
import { useRoute } from "@react-navigation/native";
import { useLazyQuery } from "@apollo/client";
import { GET_SPACIFIC_COLLECTION } from "../../graphql/query/AppInitial";
import { IMovie } from "./helper";
import { ActivityLoading } from "../single/Loading";
import { SingleMovie } from "./DisplayMovieComponent";
import { styles } from "../../styles/global";
import Footer from "../single/Footer";

const ViewMovieCollections: React.FC = () => {
  const query: any = useRoute().params;

  const [GetCollection, { data, loading }] = useLazyQuery(
    GET_SPACIFIC_COLLECTION
  );

  const [pageCount, setPageCount] = useState<number>(1);

  const [collectionMovies, setCollectionMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    GetCollection({
      variables: {
        collectionName: query.collectionName as string,
        page: 1,
      },
    }).then(() => {
      return;
    });
  }, [query]);

  useEffect(() => {
    if (data) {
      if (data.getSpacificCollection.success) {
        setPageCount(data.getSpacificCollection.pageCount);
        setCollectionMovies(data.getSpacificCollection.movies);
      }
    }
  }, [data]);

  const HandlePageChange = async (page: number) => {
    // if (page === 1) {
    //   return;
    // }
    await GetCollection({
      variables: {
        collectionName: query.collectionName as string,
        page: page,
      },
    });
  };

  // if (loading) {
  //   return ;
  // }

  return (
    <>
      <ScrollView>
        {loading ? (
          <ActivityLoading />
        ) : (
          <View>
            <View
              style={[styles.fdr, styles.fww, styles.container6, styles.jdc]}
            >
              {collectionMovies.map((e) => (
                <SingleMovie
                  item={e}
                  name={query.collectionName as string}
                  key={e._id}
                  style={{ marginVertical: 15 }}
                />
              ))}
            </View>
          </View>
        )}
        <View>
          <View style={[styles.mt2]}>
            <UsePaginator maxCount={pageCount} onChange={HandlePageChange} />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
  );
};

export default ViewMovieCollections;
