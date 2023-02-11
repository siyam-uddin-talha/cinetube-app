import { StyleSheet } from "react-native";

export const bgMainDark = "#0d131a";
// export const darkSecoundry = "#0d1824";
export const colorGray = "#404040";
export const deepBlue = "#110d28";
export const deepBlue1 = "#1b143d";
export const skyBlue = "#50b6cb";

export const darkMain: string = "#141d26";
export const darkSecoundry: string = "#0d1824";
export const colorPrimary: string = "#1890ff";
export const transparent: string = "#ffffff00";
export const blueTransparent: string = "#10162eb0";
export const blueTransparent2: string = "#ffffff19";
export const gray1: string = "#5e5e5e";
// export const gray2: string = "#07c013";
export const gray2: string = "#F7F858";
export const color2: string = "#00FFFF";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: bgMainDark,
  },
  flatBoxContainer: {
    paddingHorizontal: 20,
    backgroundColor: bgMainDark,
  },
  container2: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgMainDark,
  },
  container3: {
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: bgMainDark,
  },
  container4: {
    paddingHorizontal: 10,
    flex: 1,
  },

  container5: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    // alignItems: "center",
  },
  container6: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  movieContainer: {
    marginVertical: 20,
    paddingLeft: 10,
  },
  bradingText: {
    textTransform: "uppercase",
    letterSpacing: 4,
    color: "white",
    fontSize: 12,
  },
  padH1: {
    paddingHorizontal: 10,
  },
  padH2: {
    paddingHorizontal: 15,
  },
  padH3: {
    paddingHorizontal: 20,
  },
  padV1: {
    paddingVertical: 10,
  },
  padV2: {
    paddingVertical: 15,
  },
  padV3: {
    paddingVertical: 20,
  },

  pl1: {
    paddingLeft: 12,
  },
  pl2: {
    paddingLeft: 24,
  },
  pr1: {
    paddingRight: 12,
  },
  pr2: {
    paddingRight: 24,
  },
  text1: {
    color: "white",
    fontSize: 18,
  },
  text2: {
    color: "white",
    fontSize: 15,
  },
  text3: {
    color: "white",
    fontSize: 12,
  },
  txtBg1: {
    color: "white",
    fontSize: 22,
  },
  txtBg2: {
    color: "white",
    fontSize: 26,
  },
  textInput: {
    backgroundColor: transparent,
    borderColor: colorPrimary,
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInput2: {
    backgroundColor: transparent,
    borderColor: darkSecoundry,
    color: "white",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textInputDisable: {
    backgroundColor: blueTransparent2,
    borderColor: blueTransparent,
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btn1: {
    borderRadius: 10,
    backgroundColor: "#1890ff",
    paddingVertical: 5,
  },
  btn2: {
    borderRadius: 10,
    backgroundColor: transparent,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: colorPrimary,
  },
  btn3: {
    borderRadius: 10,
    backgroundColor: darkSecoundry,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: "#4a4a4a",
  },
  btn4: {
    borderRadius: 10,
    backgroundColor: "#1890ff",
  },
  btnRound: {
    backgroundColor: transparent,
    borderColor: colorPrimary,
    borderWidth: 2,
  },

  inner: {
    paddingVertical: 5,
    // flex: 1,
  },
  mt: {
    marginTop: 6,
  },
  mt1: {
    marginTop: 12,
  },
  mt2: {
    marginTop: 24,
  },
  mt3: {
    marginTop: 36,
  },
  ml: {
    marginLeft: 8,
  },
  ml1: {
    marginLeft: 12,
  },
  ml2: {
    marginLeft: 24,
  },
  ml3: {
    marginLeft: 36,
  },
  mr: {
    marginRight: 8,
  },
  mr1: {
    marginRight: 12,
  },
  mr2: {
    marginRight: 24,
  },
  mb1: {
    marginBottom: 12,
  },
  mb2: {
    marginBottom: 24,
  },
  mb3: {
    marginBottom: 36,
  },
  mx1: {
    marginHorizontal: 12,
  },
  mx2: {
    marginHorizontal: 24,
  },
  my1: {
    marginVertical: 12,
  },
  my2: {
    marginVertical: 24,
  },

  pb1: {
    paddingBottom: 12,
  },
  pb2: {
    paddingBottom: 24,
  },
  pt: {
    paddingTop: 8,
  },
  pt1: {
    paddingTop: 12,
  },
  pt2: {
    paddingTop: 24,
  },
  py1: {
    paddingVertical: 12,
  },
  py2: {
    paddingVertical: 24,
  },

  wfull: {
    flexGrow: 1,
  },
  _f: {
    flex: 1,
  },
  fdr: {
    flexDirection: "row",
  },
  fww: {
    flexWrap: "wrap",
  },
  fg: {
    flexGrow: 1,
  },
  jdsb: {
    justifyContent: "space-between",
  },
  jdc: {
    justifyContent: "center",
  },
  aic: {
    alignItems: "center",
  },
  aie: {
    alignItems: "flex-end",
  },
  color1: {
    color: colorPrimary,
  },
  posR: {
    position: "relative",
  },
  posA: {
    position: "absolute",
  },
  setToAll: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  setToBottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  max90: {
    maxWidth: "90%",
  },
  max100: {
    maxWidth: "100%",
  },
  w100: {
    width: "100%",
  },
  w90: {
    width: "90%",
  },
  fs1: {
    fontSize: 15,
  },
  jce: {
    justifyContent: "flex-end",
  },
  capitalize: {
    textTransform: "capitalize",
  },
});
