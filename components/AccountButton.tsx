import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import { getBackgroundColor } from "@/utils/componentsHelpers";

type AccountButtonProps = {
  text: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  action: () => void;
};

const AccountButton = (props: AccountButtonProps) => {
  const { container, textContainer, mainContainer, divider } = styles;
  const { icon, text, action } = props;

  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;
  return (
    <TouchableOpacity style={mainContainer} onPress={action}>
      <View style={container}>
        <View style={textContainer}>
          <FontAwesome
            name={icon}
            size={24}
            color={getBackgroundColor(gender)}
            style={{ marginRight: 20 }}
          />
          <CustomText styles={{ textAlign: "left", flex: 1 }}>
            {text}
          </CustomText>
        </View>
        <Entypo
          name="chevron-thin-right"
          size={16}
          color={getBackgroundColor(gender)}
        />
      </View>
      <View style={divider} />
    </TouchableOpacity>
  );
};

export default AccountButton;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 20,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
  },
  divider: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
    marginTop: 10,
  },
});
