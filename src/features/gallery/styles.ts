import { colors } from "@/src/core/constant/colors";
import { CARD_WIDTH, PADDING_H } from "@/src/core/constant/constant";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    paddingHorizontal: PADDING_H,
    flex: 1,
  },
  cardContainer: {
    rowGap: 10,
    paddingBottom: CARD_WIDTH + 30,
    },
  containerDetails: {
    paddingTop: 30,
    paddingHorizontal: PADDING_H,
    flex: 1,
  },
  content: {
    justifyContent: "center",
    flex: 1,
    rowGap: 30,
    marginTop: -50,
  },
  imgBody: {
    overflow: "hidden",
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    fontSize: 20,
    color: colors.dark[900],
  },
})