/*
author:'Arnob Islam'
created date:'19-7-22'
description:''
github:'https://github.com/arnob-islam'
*/

import {
  View,
  Text,
  Image,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Platform,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_MOVIE_ALL_COMMENTS,
  GET_SINGLE_MOVIE,
} from "../../graphql/query/AppInitial";
import { Avatar, Button, IconButton, Menu, Snackbar } from "react-native-paper";
import { ICommentType, IMovie, SelectorType } from "./helper";
import { singleStyle } from "../../styles/parts";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../../styles/global";
import { AirbnbRating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";

import { GET_VERIFY_PIN } from "../../graphql/mutation/Auth";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../../graphql/mutation/AppDispatch";
import moment, { lang } from "moment";
import { ActivityLoading, ActivityModelLoad } from "../single/Loading";
import CustomMovies from "./CustomMovies";
import {
  GetMovieFromCollection,
  SetMovieToWatchLater,
  SetToHistory,
} from "./_storage";

const ViewSingleMovie: React.FC = () => {
  const query: any = useRoute().params;

  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);

  const [singleMovie, setSingleMovie] = useState<IMovie>();
  const { user }: SelectorType = useSelector((state: any) => state.main);

  const [GetSingleMove, { data, error, loading, refetch }] =
    useLazyQuery(GET_SINGLE_MOVIE);

  const dispatch = useDispatch();

  // ---------- set the movie url ----------
  useEffect(() => {
    if (singleMovie) {
      dispatch({ type: "__MOVIE__URL__", payload: singleMovie.movieUrl });
    }
  }, [dispatch, singleMovie]);

  // -------- get the movie -----------
  useEffect(() => {
    if (user) {
      GetSingleMove({
        variables: {
          ...query,
          userId: user._id,
        },
      });
      return;
    }
    GetSingleMove({
      variables: {
        ...query,
      },
    });
  }, [query, user]);

  // -------- Set the movie state -----------
  useEffect(() => {
    if (data) {
      if (data.getSingleMovie.success) {
        setSingleMovie(data.getSingleMovie.movie);
      }
      if (!data.getSingleMovie.success) {
        setNotifaction([true, data.getSingleMovie.message]);
      }
    }
    if (error) {
      setNotifaction([true, error.message]);
    }
  }, [data, error]);
  // -------- Set the movie state -----------

  if (loading) {
    return (
      <>
        <ActivityLoading />
      </>
    );
  }
  if (!singleMovie) {
    return (
      <>
        <ActivityLoading />
      </>
    );
  }

  return (
    <>
      <View>
        <RenderSingleMovie
          onRefreshing={refetch}
          loading={loading}
          props={singleMovie}
          collectionName={query.name as string}
        />
      </View>

      <View>
        <Snackbar
          visible={notifaction[0]}
          duration={2000}
          onDismiss={() => {
            setNotifaction([false, ""]);
          }}
        >
          {notifaction[1]}
        </Snackbar>
      </View>
    </>
  );
};
type CommentType = {
  comment: string;
  star: number;
};

type AppProps = {
  props: IMovie;
  collectionName: string;
  onRefreshing: Function;
  loading: boolean;
};

export const RenderSingleMovie: React.FC<AppProps> = ({
  props,
  collectionName,
  onRefreshing,
  loading,
}) => {
  const [notifaction, setNotifaction] = React.useState<[boolean, string]>([
    false,
    "",
  ]);
  // login confirm model state
  const [modelOpen, setModelOpen] = useState<boolean>(false);

  const [isInWatchList, setisInWatchList] = useState<boolean>(false);

  const { user } = useSelector((state: any) => state.main);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { suggestion } = useSelector((state: any) => state.secondary);

  const [GetVerifyPin, { data, loading: verifyLoading }] =
    useMutation(GET_VERIFY_PIN);

  useEffect(() => {
    if (data) {
      if (data.getVerifyPin.success) {
        navigate.navigate("Verify Account" as never);
      }
      if (!data.getVerifyPin.success) {
        setNotifaction([true, data.getVerifyPin.message]);
      }
    }
  }, [data, navigate]);

  // --------- check the movie exist on the watch list -------------
  useEffect(() => {
    const CheckWatchLater = async () => {
      const check = await GetMovieFromCollection(props, collectionName);
      setisInWatchList(check ? true : false);
    };
    CheckWatchLater();
  }, []);

  // ----------------- handlers ----------------
  // when press to watch trailer
  const handleTrailerPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      setNotifaction([true, "Unable to view trailer"]);
    }
  };

  // when user click ok to login
  const navigateToLoginPage = async () => {
    dispatch({
      type: "NEXT_ROUTE_AFTER_AUTH",
      payload: {
        _id: props._id,
        name: collectionName,
        route: "View Movie",
      },
    });
    setModelOpen(false);

    if (user) {
      if (!user.verify) {
        GetVerifyPin({
          variables: {
            id: user._id,
          },
        });
        return;
      }
      return;
    }

    navigate.navigate("Login" as never);
  };

  const AddToWatchLater = async (movie: IMovie) => {
    await SetMovieToWatchLater(movie, collectionName);
    const check = await GetMovieFromCollection(movie, collectionName);
    setisInWatchList(check ? true : false);
  };

  // ------- navigate to stream movie -----------
  const navigateToViewMovie = () => {
    if (!user) {
      setModelOpen(true);
      return;
    }
    // -------- Set History -----------
    SetToHistory(props, collectionName).then(() => {
      return;
    });
    navigate.navigate(
      "Watch movie" as never,
      {
        uri: props.movieUrl,
      } as never
    );
  };

  const {
    thumbnail,
    name,
    star,
    trailerUrl,
    company,
    description,
    duration,
    released,
    subTitle,
    // this is a single comment
    comment,
    commentsCount,
    inputDisable,
    language,
  } = props;

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => onRefreshing()}
          />
        }
      >
        <View>
          {/* --------- thumnail ----------  */}
          <View>
            <View style={[styles.posR]}>
              <View style={[singleStyle.imgSize]}>
                <Image
                  source={{
                    uri: thumbnail,
                  }}
                  style={[singleStyle.imgShow]}
                />
              </View>
              <LinearGradient
                colors={["rgba(255,255,255,0)", "#000000bf"]}
                style={[styles.posA, styles.setToAll, { zIndex: 10 }]}
              />

              <View
                style={[
                  styles.posA,
                  singleStyle.viewPlayButton,
                  { zIndex: 20 },
                ]}
              >
                <Text>
                  <IconButton
                    size={35}
                    icon={"play"}
                    style={[styles.btnRound]}
                    color="white"
                    onPress={navigateToViewMovie}
                  />
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.padV2, styles.padH2]}>
            {/* ------------ released & duration & subtitle ----------- */}

            <View style={[styles.fdr, styles.aic, styles.jdc, styles.mb1]}>
              <View style={[styles.fdr, styles.aic]}>
                <AntDesign name="calendar" size={16} color="#1890ff" />
                <Text style={[styles.text2, styles.ml]}>{released}</Text>
              </View>

              <View style={[styles.fdr, styles.aic, styles.ml]}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color="#1890ff"
                />
                <Text style={[styles.text2, styles.ml]}>{duration}</Text>
              </View>
              <View style={[styles.fdr, styles.aic, styles.ml]}>
                <MaterialCommunityIcons
                  name="filmstrip-box"
                  size={16}
                  color="#1890ff"
                />
                <Text style={[styles.text2, styles.ml]}>
                  {subTitle && subTitle.split(" ").join(" | ")}
                </Text>
              </View>
            </View>

            {/* -------------- name & rating -------- */}
            <View style={[styles.fdr, styles.jdsb]}>
              <View>
                <Text style={[styles.pr2, singleStyle.singleText3]}>
                  {name}
                </Text>
              </View>

              <View>
                <Text style={[styles.mt]}>
                  {
                    <>
                      {star === 0 ? (
                        <AirbnbRating
                          showRating={false}
                          isDisabled={true}
                          count={1}
                          size={10}
                          selectedColor="#5e5e5e"
                          reviewSize={8}
                          defaultRating={10}
                        />
                      ) : (
                        <AirbnbRating
                          showRating={false}
                          isDisabled={true}
                          count={star / 2}
                          size={10}
                          reviewSize={8}
                          defaultRating={10}
                        />
                      )}
                    </>
                  }
                </Text>
              </View>
            </View>
            {/* -------------- language -------- */}

            <View style={[styles.mt]}>
              <View style={styles.fdr}>
                <Text style={[singleStyle.singleText]}>{`Language : `}</Text>
                <Text style={[singleStyle.singleText, singleStyle.txtBlue]}>
                  {language}
                </Text>
              </View>
            </View>

            {/* ---------------- trailer & add button ------------  */}
            <View style={[styles.fdr, styles.padV3, styles.aic]}>
              <View>
                <Button
                  icon={"youtube"}
                  uppercase={false}
                  color="white"
                  style={[styles.btn1, styles.w100]}
                  onPress={() => handleTrailerPress(trailerUrl)}
                >
                  Watch trailler
                </Button>
              </View>
              <View style={[styles.ml1]}>
                <Button
                  color="white"
                  uppercase={false}
                  icon={"play-box-multiple-outline"}
                  onPress={() => AddToWatchLater(props)}
                  style={[styles.btn1]}
                >
                  {isInWatchList ? "Remove" : "Add"}
                </Button>
              </View>
            </View>
            {/* --------------- description & company  --------------- */}
            <View>
              <View>
                <Text style={[singleStyle.singleText3]}>{"Story Line"}</Text>
                <Text style={[styles.text2, styles.mt]}>{description}</Text>
              </View>

              <View style={[styles.mt1]}>
                <Text style={[singleStyle.singleText3]}>{"Cast"}</Text>
                <View style={[styles.fdr, styles.mt]}>
                  <Text style={[singleStyle.singleText]}>{`Industry :`}</Text>
                  <Text style={[singleStyle.companyText]}>{` ${company}`}</Text>
                </View>
              </View>
            </View>

            {/* --------------- comment section  --------------- */}
            <CommentSector
              _id={props._id}
              collectionName={collectionName}
              commentsCount={commentsCount}
              setModelOpen={setModelOpen}
              singleComment={comment}
              inputDisable={inputDisable}
            />
            <View>
              <CustomMovies
                movies={suggestion}
                collectionName={collectionName}
                title="suggestion"
              />
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

      <Modal isVisible={modelOpen} coverScreen={false}>
        <View style={[singleStyle.modalContent]}>
          <View>
            <View style={[styles.aic]}>
              <AntDesign name="warning" size={24} color="white" />
              <Text style={[styles.text1, styles.mt2]}>
                {user ? (
                  <>{!user.verify && "Verify your account"}</>
                ) : (
                  <>Login required</>
                )}
              </Text>
            </View>
            <View style={[styles.fdr, styles.jce, styles.mt2]}>
              <Button
                uppercase={false}
                color="white"
                mode="contained"
                onPress={() => setModelOpen(false)}
              >
                Cancle
              </Button>
              <Button
                uppercase={false}
                color="white"
                mode="contained"
                style={[styles.ml1]}
                onPress={() => navigateToLoginPage()}
              >
                Click to continue
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      {/*--------------- loading model ---------- */}
      <ActivityModelLoad loading={verifyLoading} />
    </>
  );
};

type CommentProps = {
  setModelOpen: Function;
  _id: string;
  collectionName: string;
  commentsCount: number;
  singleComment: ICommentType;
  inputDisable: boolean;
};

const CommentSector: React.FC<CommentProps> = ({
  setModelOpen,
  _id,
  collectionName,
  commentsCount,
  singleComment,
  inputDisable,
}) => {
  const [ratingModel, setRatingModel] = useState<boolean>(false);
  const [switchInput, setSwitchInput] = useState<boolean>(true);

  const [value, setvalue] = useState<CommentType>({
    comment: "",
    star: 10,
  });
  const [notifaction, setNotifaction] = useState<string>("");

  const [movieComments, setMovieComments] = useState<ICommentType[]>([]);
  // <- --------- this hooks for storing all comments ------- ->
  const [commentStore, setCommentStore] = useState<ICommentType[]>([]);

  const [AddComment, { data, loading: addCommentLoad }] =
    useMutation(ADD_COMMENT);

  const [GetAllComments, { data: commentsData, loading: getCommentLoad }] =
    useLazyQuery(GET_MOVIE_ALL_COMMENTS);

  const [DeleteComment, { data: deleteData, loading: deleteCommentLoad }] =
    useMutation(DELETE_COMMENT);

  const { user } = useSelector((state: any) => state.main);

  useEffect(() => {
    if (singleComment) {
      setMovieComments([singleComment]);
      setCommentStore([singleComment]);
    }
  }, [singleComment]);
  // <- ----------------- setting input --------------- ->
  useEffect(() => {
    setSwitchInput(inputDisable);
  }, [inputDisable]);

  // <- ---------------- when add a new comment ----------------- ->
  useEffect(() => {
    if (data) {
      if (data.addComment.success) {
        setMovieComments((pre) => {
          if (pre.length !== 1) {
            return [data.addComment.comment, ...pre];
          }
          return [data.addComment.comment];
        });
        setCommentStore([data.addComment.comment]);
        setRatingModel(false);
        setSwitchInput(true);
      }
      if (!data.addComment.success) {
        setNotifaction(data.addComment.message);
      }
    }
  }, [data]);

  useEffect(() => {
    if (commentsData) {
      if (commentsData.getMovieAllComments.success) {
        if (commentsData.getMovieAllComments.comments.length > 6) {
          setMovieComments(
            commentsData.getMovieAllComments.comments.slice(0, 6)
          );
          setCommentStore(commentsData.getMovieAllComments.comments);
          return;
        }
        setMovieComments(commentsData.getMovieAllComments.comments);
        setCommentStore(commentsData.getMovieAllComments.comments);
      }
      if (!commentsData.getMovieAllComments.success) {
        setNotifaction(commentsData.getMovieAllComments.message);
      }
    }
  }, [commentsData]);

  // <- ---------------- delete a comment ----------------- ->
  useEffect(() => {
    if (deleteData) {
      if (deleteData.deleteComment.success) {
        setMovieComments((pre) => {
          return pre.filter(
            (e) => e._id !== deleteData.deleteComment.comment._id
          );
        });
        setSwitchInput(false);
        setCommentStore((pre) => {
          return pre.filter(
            (e) => e._id !== deleteData.deleteComment.comment._id
          );
        });
      }
      if (!deleteData.deleteComment.success) {
        setNotifaction(deleteData.deleteComment.message);
      }
    }
  }, [deleteData]);

  const handleToViewMore = async () => {
    if (commentStore.length !== movieComments.length) {
      setMovieComments(commentStore.slice(0, movieComments.length + 5));
      return;
    }
    await GetAllComments({
      variables: {
        name: collectionName,
        id: _id,
      },
    });
  };

  const HandleCommentSubmit = async () => {
    try {
      if (!user) {
        setModelOpen(true);
        return;
      }
      if (user) {
        if (!user.verify) {
          setModelOpen(true);
          return;
        }
      }
      const { comment, star } = value;
      if (!comment) {
        return;
      }

      await AddComment({
        variables: {
          input: {
            movieId: _id,
            name: collectionName,
            userId: user._id,
            comment,
            star,
          },
        },
      });
      setRatingModel(false);
      setvalue({
        comment: "",
        star: 10,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      <View style={[styles.pb1]}>
        <View style={[styles.fdr, styles.aic, styles.my2]}>
          <View>
            <Text
              style={[singleStyle.singleText4]}
            >{`${commentsCount} comments`}</Text>
          </View>
          <View style={[singleStyle.commentRag, styles.ml1]} />
        </View>
        {/* ------------- input -------- */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View pointerEvents={switchInput ? "none" : "auto"}>
                <TextInput
                  placeholder="Add comment.."
                  style={[
                    switchInput ? styles.textInputDisable : styles.textInput2,
                  ]}
                  placeholderTextColor={switchInput ? "#464646" : "white"}
                  value={value.comment}
                  onChangeText={(text) =>
                    setvalue((pre) => {
                      return {
                        ...pre,
                        comment: text,
                      };
                    })
                  }
                  selectionColor="white"
                  onSubmitEditing={() => setRatingModel(true)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {/* ------------- Show comments -------- */}
        <View style={[styles.mt2]}>
          {movieComments.map((e) => (
            <RenderSingleComment
              item={e}
              key={e._id}
              movieId={_id}
              name={collectionName}
              handleDelete={DeleteComment}
            />
          ))}

          <>
            {commentsCount > 1 && (
              <>
                {movieComments.length !== commentsCount && (
                  <View style={[styles.mt2]}>
                    <Text
                      style={[singleStyle.viewMoreComment]}
                      onPress={handleToViewMore}
                    >
                      view more comment
                    </Text>
                  </View>
                )}
              </>
            )}
          </>
        </View>
      </View>

      <Modal isVisible={ratingModel} coverScreen={false}>
        <View style={[singleStyle.modalContent]}>
          <View style={[styles.aic, styles.jdc]}>
            <AntDesign name="staro" size={38} color="#1890ff" />
          </View>
          <View style={[styles.aic, styles.jdc]}>
            <Text style={[styles.text1]}>Rate this</Text>
          </View>

          <View style={[styles.mt]}>
            <AirbnbRating
              showRating={false}
              count={10}
              defaultRating={10}
              size={20}
              onFinishRating={(rating) =>
                setvalue((pre) => {
                  return {
                    ...pre,
                    star: rating,
                  };
                })
              }
            />
          </View>
          <View style={[styles.mt2]}>
            <View style={[styles.fdr, styles.jce]}>
              <Button
                uppercase={false}
                color="white"
                mode="contained"
                onPress={() => setRatingModel(false)}
              >
                Cancle
              </Button>
              <Button
                uppercase={false}
                color="white"
                mode="contained"
                style={[styles.ml1]}
                onPress={HandleCommentSubmit}
              >
                Submit rate & comment
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <ActivityModelLoad
        loading={addCommentLoad || getCommentLoad || deleteCommentLoad}
      />
      <Snackbar
        visible={notifaction ? true : false}
        duration={2000}
        onDismiss={() => {
          setNotifaction("");
        }}
      >
        {notifaction}
      </Snackbar>
    </>
  );
};

type SingleCommentProps = {
  item: ICommentType;
  // for delete the movie
  movieId: string;
  name: string;
  handleDelete: Function;
};

const RenderSingleComment: React.FC<SingleCommentProps> = ({
  item,
  movieId,
  name,
  handleDelete,
}) => {
  const { user } = useSelector((state: any) => state.main);

  const [deleteMenu, setDeleteMenu] = useState(false);

  const { profilePhoto, userName, comment, star, createdAt, userId, _id } =
    item;

  const handleCommentDelete = async () => {
    try {
      await handleDelete({
        variables: {
          movieId,
          name,
          commentId: _id,
        },
      });
      // setDeleteMenu(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getParentsStyle = () => {
    if (user) {
      if (user._id === userId) {
        return {
          ...singleStyle.singleComment,
          paddingTop: 0,
          paddingRight: 0,
        };
      }
      return singleStyle.singleComment;
    }
    return singleStyle.singleComment;
  };

  return (
    <View style={[styles.fdr, styles.mt2, styles.pr1]}>
      <View>
        {profilePhoto ? (
          <Avatar.Image size={40} source={{ uri: profilePhoto }} />
        ) : (
          <Avatar.Text size={40} label="U" />
        )}
      </View>
      <View style={{ flexGrow: 1 }}>
        <View style={[getParentsStyle()]}>
          <View style={[styles.fdr, styles.aic, styles.jdsb]}>
            <View>
              <Text style={[singleStyle.commentUser]}>{userName}</Text>
            </View>
            <View style={[styles.ml2, styles.fdr, styles.aic]}>
              <View>
                <AirbnbRating
                  showRating={false}
                  isDisabled={true}
                  defaultRating={10}
                  count={star}
                  size={8}
                />
              </View>

              {user && (
                <>
                  {user._id === userId && (
                    <View>
                      <Menu
                        visible={deleteMenu}
                        onDismiss={() => setDeleteMenu(false)}
                        anchor={
                          <IconButton
                            icon="dots-vertical"
                            size={20}
                            color="white"
                            onPress={() => setDeleteMenu(true)}
                          />
                        }
                      >
                        <Menu.Item
                          icon={"delete-forever"}
                          onPress={() => handleCommentDelete()}
                          title="Delete"
                        />
                      </Menu>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
          <View style={[{ flex: 1 }, singleStyle.commentText]}>
            <Text style={[styles.text2, styles.fdr]}>{`${comment}`}</Text>
          </View>
        </View>
        <View style={[styles.jce, styles.aie, styles.mt, styles.mr1]}>
          <Text style={[styles.text3]}>
            {moment(new Date(createdAt)).fromNow(false)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ViewSingleMovie;
