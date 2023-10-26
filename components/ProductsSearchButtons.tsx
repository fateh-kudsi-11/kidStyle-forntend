import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import CustomText from "@/components/CustomText";
import Colors from "@/constants/Colors";

type ProductsSearchButtonsProps = {
  onSort: () => void;
};
const ProductsSearchButtons = (props: ProductsSearchButtonsProps) => {
  const { onSort } = props;
  const { container, buttonContainer, divider } = styles;
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;

  const buttonbackgroundColor =
    gender == "boys" ? "rgba(122, 131, 250,0.5)" : "rgba(250, 122, 173,0.5)";
  return (
    <View style={container}>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? buttonbackgroundColor : "white",
          },
          ,
          buttonContainer,
        ]}
        onPress={onSort}
      >
        <CustomText
          fontFamily="Poppins_500Medium"
          fontSize={16}
          color={
            gender == "boys"
              ? Colors.light.boysPrimary
              : Colors.light.girlsPrimary
          }
        >
          Sort by
        </CustomText>
        <FontAwesome5
          name="chevron-down"
          size={16}
          color={
            gender == "boys"
              ? Colors.light.boysPrimary
              : Colors.light.girlsPrimary
          }
        />
      </Pressable>
      <View
        style={[
          {
            backgroundColor:
              gender == "boys"
                ? Colors.light.boysPrimary
                : Colors.light.girlsPrimary,
          },
          divider,
        ]}
      />
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? buttonbackgroundColor : "white",
          },
          buttonContainer,
        ]}
      >
        <CustomText
          fontFamily="Poppins_500Medium"
          fontSize={16}
          color={
            gender == "boys"
              ? Colors.light.boysPrimary
              : Colors.light.girlsPrimary
          }
        >
          Filter
        </CustomText>
        <FontAwesome5
          name="chevron-down"
          size={16}
          color={
            gender == "boys"
              ? Colors.light.boysPrimary
              : Colors.light.girlsPrimary
          }
        />
      </Pressable>
    </View>
  );
};

export default ProductsSearchButtons;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 15,
    width: "45%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  divider: {
    width: 1.5,
    height: "60%",
  },
});
