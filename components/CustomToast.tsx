import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import { getBackgroundColor } from "@/utils/componentsHelpers";

const CustomToast = (props: ToastProps) => {
  const { container } = styles;
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );

  const { gender } = filtering;
  const message = props.message as string;
  const { type } = props;

  const [title, text] = message.split("-");

  return (
    <View style={container}>
      <CustomText
        color={type == "danger" ? "#FF6347" : getBackgroundColor(gender)}
        fontFamily="Poppins_600SemiBold"
      >
        {title}
      </CustomText>
      <CustomText
        color={type == "danger" ? "#FF6347" : getBackgroundColor(gender)}
        fontFamily="Poppins_300Light"
      >
        {text}
      </CustomText>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEEDE9",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    gap: 10,
    width: "90%",
    minHeight: 100,
    borderRadius: 15,
  },
});
