import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POPULER_CONTENT } from "../../graphql/query/AppInitial";
import { PopulerMoviesLoading } from "../single/Loading";
import PopulerComponet from "../provider/PopulerComponet";
import { ContentType } from "../provider/helper";

const PopulerMovies = () => {
  const { data, loading } = useQuery(GET_POPULER_CONTENT);

  const [banerContent, setbanerContent] = useState<ContentType[]>([]);

  useEffect(() => {
    if (data) {
      if (data.getPopulerMovies.success) {
        setbanerContent(data.getPopulerMovies.movies);
      }
    }
  }, [data]);

  if (loading) {
    return <PopulerMoviesLoading />;
  }

  return (
    <>
      <PopulerComponet data={banerContent} />
    </>
  );
};

export default PopulerMovies;
