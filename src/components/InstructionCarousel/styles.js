import { Dimensions, StyleSheet, Platform } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
  item: {
    height: screenWidth,
  },

  title: {
    paddingTop: 20,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: "Inter-Regular",
    fontSize: 18,
  },

  imageContainer: {
    flex: 1,
    borderRadius: 15,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "#fff",
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "center",
  },

  dotContainer: {},
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#89BD21",
  },
  inactiveDotStyle: {
    backgroundColor: "#565656",
  },

  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  btnContainer: { flexDirection: "row", gap: 20 },

  skipBtn: {
    alignSelf: "center",
    backgroundColor: "#89BD21",
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
  },
  skipBtnTxt: {
    fontFamily: "Inter-Regular",
    fontSize: 20,
    color: "#fff",
  },
});
export default styles;
