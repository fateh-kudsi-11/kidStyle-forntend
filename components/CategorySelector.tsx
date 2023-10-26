import {
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import CustomText from "./CustomText";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { setDirectory } from "@/redux/slices/filteringSlice";
import { useDispatch } from "react-redux";

type CategorySelectorProps = {
  imageSource: ImageSourcePropType;
  textTitle: string;
  color?: string;
};

const IMAGE_HEIGHT = (Dimensions.get("window").height - 112) * 0.45;

const CategorySelector = (props: CategorySelectorProps) => {
  const { imageSource, textTitle, color = Colors.light.boysPrimary } = props;
  const dispatch = useDispatch();

  const navigateHandler = () => {
    dispatch(setDirectory(textTitle.toLowerCase()));
    router.push("/(tabs)/search/");
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        ,
        styles.container,
      ]}
      onPress={navigateHandler}
    >
      <Image
        source={imageSource}
        resizeMode="contain"
        style={{ width: IMAGE_HEIGHT, height: IMAGE_HEIGHT }}
      />
      <CustomText
        fontFamily="Poppins_600SemiBold"
        fontSize={18}
        color={color}
        styles={{ marginVertical: 10 }}
      >
        {textTitle}
      </CustomText>
    </Pressable>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  container: {
    width: "50%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEEDE9",
    overflow: "hidden",
  },
});
