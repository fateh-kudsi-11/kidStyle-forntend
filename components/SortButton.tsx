import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";

type SortButtonProps = {
  filtering: FilteringState;
  kind: string;
  title: string;
  handelSort: (sort: string) => void;
};

const SortButton = (props: SortButtonProps) => {
  const { buttonContainer } = styles;
  const { filtering, kind, title, handelSort } = props;
  const { gender, sort } = filtering;
  return (
    <TouchableOpacity
      style={[
        buttonContainer,
        sort === kind
          ? {
              backgroundColor: getBackgroundColor(gender),
            }
          : null,
      ]}
      onPress={() => {
        handelSort(kind);
      }}
    >
      <CustomText
        fontFamily="Poppins_500Medium"
        color={kind === sort ? "white" : "black"}
      >
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 42,
    backgroundColor: "#fff",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
});
