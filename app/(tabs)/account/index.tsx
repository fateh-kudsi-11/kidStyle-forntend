import { StyleSheet, View } from "react-native";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthState } from "@/redux/slices/authSlice";
import AccountButton from "@/components/AccountButton";
import AuthBag from "@/components/AuthBag";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useNavigation, router } from "expo-router";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import LogoutButton from "@/components/LogoutButton";

const account = () => {
  const { container } = styles;

  const navigation = useNavigation();

  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;

  const { isAuth } = auth;

  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: "My Account",

      headerStyle: {
        backgroundColor: "#fff",
      },

      headerTitleStyle: {
        color: getBackgroundColor(gender),
        fontFamily: "Kalam_700Bold",
      },
      headerTintColor: getBackgroundColor(gender),
      headerShadowVisible: false,
    });
  }, [navigation, gender]);

  useEffect(() => {
    setNavigationOptions();
  }, [setNavigationOptions]);

  const handelNavigation = (to: string) => {
    if (to == "details") {
      router.push(`/(tabs)/account/myDetails`);
    } else {
      router.push("/(tabs)/account/changePassword");
    }
  };

  return (
    <View style={container}>
      {!isAuth ? (
        <AuthBag mode="account" />
      ) : (
        <>
          <AccountButton
            text="My details"
            icon="user"
            action={() => {
              handelNavigation("details");
            }}
          />
          <AccountButton
            text="Change password"
            icon="lock"
            action={() => {
              handelNavigation("password");
            }}
          />
          <LogoutButton />
        </>
      )}
    </View>
  );
};

export default account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFf",
  },
});
