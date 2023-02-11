import { Dimensions, StyleSheet } from "react-native";
import {
  darkSecoundry,
  bgMainDark,
  colorGray,
  deepBlue,
  deepBlue1,
  skyBlue,
  transparent,
  colorPrimary,
  blueTransparent,
} from "./global";

export const windowWidth = Dimensions.get("window").width;

export const homeStyle = StyleSheet.create({
  bannerParents: {
    position: "relative",
  },
  contnetShadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowColor: "grey",
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: "white",
    width: 100,
    height: 100,
  },
  bannerContentContainer: {
    position: "absolute",
    bottom: 15,
    left: 15,
  },
});

export const singleStyle = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: "row",
  },
  img1: {
    flex: 1,
    width: windowWidth,
    height: 250,
    resizeMode: "cover",
  },
  img2: {
    flex: 1,
    width: windowWidth / 3,
    height: 160,
    borderRadius: 5,
    resizeMode: "cover",
  },
  img3: {
    width: windowWidth,
    height: 350,
  },
  imgFull: {
    width: "100%",
    height: 350,
  },
  imgShow: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imgSize: {
    width: "100%",
    height: 350,
  },
  parent1: {
    marginLeft: 15,
  },
  parent2: {
    marginRight: 10,
    width: windowWidth / 2 - 25,
  },

  singleShowImg: {
    flex: 1,
    width: "100%",
    height: 170,
    aspectRatio: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imgQuality: {
    top: 10,
    right: 10,
    borderRadius: 4,
    backgroundColor: colorGray,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  qualityText: {
    color: "white",
    textTransform: "uppercase",
  },
  infoParents: {
    backgroundColor: darkSecoundry,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  singleText: {
    color: "white",
    fontWeight: "500",
    letterSpacing: 1.5,
  },

  singleText2: {
    color: "white",
    fontSize: 10,
    letterSpacing: 1,
  },
  singleText3: {
    color: "white",
    fontSize: 18,
    letterSpacing: 1.5,
  },
  singleText4: {
    color: "white",
    fontSize: 16,
    letterSpacing: 1,
  },
  viewPlayButton: {
    bottom: 20,
    right: 20,
  },
  companyText: {
    color: colorPrimary,
    textDecorationLine: "underline",
    letterSpacing: 2,
    fontSize: 15,
  },
  txtBlue: {
    color: colorPrimary,
    // textDecorationLine: "underline",
    letterSpacing: 2,
    fontSize: 15,
  },
  commentRag: {
    flexGrow: 1,
    padding: 0.5,
    backgroundColor: colorPrimary,
  },
  modalContent: {
    backgroundColor: deepBlue1,
    padding: 15,
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 4,
    // borderColor: "rgba(0, 0, 0, 0.1)",
  },
  singleComment: {
    backgroundColor: deepBlue1,
    marginLeft: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  commentUser: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 0.5,
  },
  viewMoreComment: {
    color: "white",
    fontSize: 11,
    letterSpacing: 1,
    textDecorationLine: "underline",
    textDecorationColor: colorPrimary,
  },
  commentText: {
    maxWidth: "98%",
  },

  // ------------- settings ----------------------

  settingBox: {
    borderRadius: 5,
    backgroundColor: deepBlue,
    paddingHorizontal: 13,
    paddingVertical: 15,
  },
  profileBox: {
    backgroundColor: blueTransparent,
    borderRadius: 8,
  },
  viewRag: {
    borderTopColor: deepBlue1,
    borderTopWidth: 1,
  },

  // ------------- settings ----------------------

  // --------------- search sector --------------------
  searchConainer: {
    paddingBottom: 50,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  searchBar: {
    backgroundColor: colorPrimary,
    paddingVertical: 5,
    color: "white",
  },
  searchItemImg: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  searchResultBox: {
    paddingBottom: 50,
    paddingHorizontal: 15,
  },
  searchResultSingle: {
    backgroundColor: deepBlue,
    marginTop: 10,
    borderRadius: 5,
  },

  // --------------- footer --------------------
  footerRouteParents: {
    backgroundColor: deepBlue,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  footerRouteText: {
    color: "white",
    letterSpacing: 1.5,
    textDecorationColor: colorPrimary,
    textDecorationLine: "underline",
    fontWeight: "400",
    fontSize: 15,
  },
});

export const profileSt = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  userImageBox: {
    backgroundColor: blueTransparent,
    borderRadius: 10,
    paddingVertical: 40,
  },
  imageRound: {
    borderWidth: 3,
    borderColor: "white",
  },
  editImageIcon: {
    bottom: 0,
    right: 0,
    backgroundColor: deepBlue1,
    borderRadius: 50,
    padding: 5,
  },
  updateBox: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: deepBlue1,
    paddingLeft: 10,
    zIndex: 100,
  },
});
