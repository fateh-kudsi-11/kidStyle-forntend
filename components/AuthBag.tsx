import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { router } from "expo-router";

type AuthBagProps = {
  mode: "bag" | "wishlist" | "account";
};

const AuthBag = (props: AuthBagProps) => {
  const { mode } = props;
  const { container, buttonsContainer, buttonContainer } = styles;
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;

  const navigteHandler = (to: string) => {
    router.push({
      pathname: "/auth",
      params: {
        auth: to,
      },
    });
  };

  return (
    <View style={container}>
      {mode == "account" ? (
        <>
          <CustomText fontFamily="Poppins_600SemiBold">
            Please sign in to manage your account.
          </CustomText>
        </>
      ) : (
        <>
          <CustomText fontFamily="Poppins_600SemiBold">
            YOUR {`${mode == "bag" ? "BAG" : "WISHLIST"}`} IS EMPTY
          </CustomText>
          <CustomText fontFamily="Poppins_300Light">
            Sign in to see your {`${mode == "bag" ? "bag" : "wish list"}`}
          </CustomText>
        </>
      )}

      <View style={buttonsContainer}>
        <TouchableOpacity
          style={[
            buttonContainer,
            { backgroundColor: getBackgroundColor(gender) },
          ]}
          onPress={() => navigteHandler("signin")}
        >
          <CustomText color="white">Signin</CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            buttonContainer,
            { backgroundColor: getBackgroundColor(gender) },
          ]}
          onPress={() => navigteHandler("signup")}
        >
          <CustomText color="white">Register</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthBag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  buttonContainer: {
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
});
