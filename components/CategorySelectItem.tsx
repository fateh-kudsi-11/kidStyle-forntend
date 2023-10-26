import {
  StyleSheet,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import CustomText from "./CustomText";
import Colors from "@/constants/Colors";
import { setDirectory } from "@/redux/slices/filteringSlice";

type CategorySelectItemProps = {
  title: string;
  image: ImageSourcePropType;
  gender: string;
};
const CategorySelectItem = (props: CategorySelectItemProps) => {
  const { title, image, gender } = props;
  const { container } = styles;
  const dispatch = useDispatch();

  const navigateHandler = () => {
    dispatch(setDirectory(title.toLowerCase()));
    router.push("/(tabs)/search/products");
  };
  return (
    <TouchableOpacity style={container} onPress={navigateHandler}>
      <CustomText
        fontFamily="Poppins_600SemiBold"
        color={
          gender == "boys"
            ? Colors.light.boysPrimary
            : Colors.light.girlsPrimary
        }
        fontSize={26}
      >
        {title}
      </CustomText>
      <Image source={image} />
    </TouchableOpacity>
  );
};

export default CategorySelectItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#EEEDE9",
    borderRadius: 15,
  },
});
