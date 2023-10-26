import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { clearTokenFromStorage } from "@/utils/storageHelpers";
import { useDispatch, useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { logout } from "@/redux/slices/authSlice";

const LogoutButton = () => {
  const { container, textContainer, mainContainer, divider } = styles;

  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;
  const dispatch = useDispatch();

  const handelLogout = async () => {
    await clearTokenFromStorage();
    dispatch(logout());
  };

  const logoutHandler = () => {
    Alert.alert("", `Are you sure you want to Log out?`, [
      {
        text: "Logout",
        style: "destructive",
        onPress: () => handelLogout(),
      },
      { text: "Cancel" },
    ]);
  };
  return (
    <TouchableOpacity style={mainContainer} onPress={logoutHandler}>
      <View style={container}>
        <View style={textContainer}>
          <Entypo
            name="log-out"
            size={24}
            color={getBackgroundColor(gender)}
            style={{ marginRight: 20 }}
          />
          <CustomText styles={{ textAlign: "left", flex: 1 }}>
            Logout
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

export default LogoutButton;

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
