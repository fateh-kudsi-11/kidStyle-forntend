import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { router } from "expo-router";
import { useSelector } from "react-redux";

type EmptyBagType = {
  mode?: "bag" | "wishlist";
};

const EmptyBag = (props: EmptyBagType) => {
  const { mode = "bag" } = props;
  const { container, buttonContainer } = styles;
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;

  const handleNav = () => {
    router.push("/(tabs)/search/");
  };
  return (
    <View style={container}>
      <CustomText styles={{ padding: 10, textAlign: "center" }}>
        Your {mode == "bag" ? "shopping bag " : "favorit list"} is empty. Start
        adding items to fill it with your favorite products!
      </CustomText>
      <TouchableOpacity
        style={[
          buttonContainer,
          { backgroundColor: getBackgroundColor(gender) },
        ]}
        onPress={handleNav}
      >
        <CustomText color="white">Start Shopping</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyBag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height * 0.75,
  },
  buttonContainer: {
    width: "50%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 10,
  },
});
