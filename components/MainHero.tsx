import { Pressable, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import Colors from "@/constants/Colors";
import { router } from "expo-router";

const CONTAINER_WIDTH = Dimensions.get("window").width - 40;
const CONTAINER_HEIGHT = (Dimensions.get("window").height - 112) * 0.25;
const IMAGE_SIZE = CONTAINER_HEIGHT;

const MainHero = () => {
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;
  const { container } = styles;
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        ,
        container,
      ]}
      onPress={() => router.push("/(tabs)/search/")}
    >
      <CustomText
        fontFamily="Poppins_600SemiBold"
        fontSize={28}
        color={
          gender == "boys"
            ? Colors.light.boysPrimary
            : Colors.light.girlsPrimary
        }
      >
        New Arrivale
      </CustomText>
      <Image
        source={
          gender == "boys"
            ? require("@/assets/images/boy.png")
            : require("@/assets/images/girls1.png")
        }
        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEEDE9",
    flexDirection: "row",
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
    borderRadius: 15,
    paddingLeft: 20,
    marginBottom: 10,
  },
});

export default MainHero;
