import { StyleSheet, SafeAreaView } from "react-native";
import { useCallback, useEffect } from "react";
import { useNavigation } from "expo-router";
import { AuthState } from "@/redux/slices/authSlice";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import AuthBag from "@/components/AuthBag";
import WishList from "@/components/WishList";

const wishList = () => {
  const { container } = styles;

  const navigation = useNavigation();
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { isAuth } = auth;
  const { gender } = filtering;
  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: "My Favorite ",

      headerStyle: {
        backgroundColor: "#fff",
      },

      headerTitleStyle: {
        color: getBackgroundColor(gender),
        fontFamily: "Kalam_700Bold",
      },
      headerTintColor: getBackgroundColor(gender),
    });
  }, [navigation, gender]);

  useEffect(() => {
    setNavigationOptions();
  }, [setNavigationOptions]);
  return (
    <SafeAreaView style={container}>
      {!isAuth ? <AuthBag mode="wishlist" /> : <WishList />}
    </SafeAreaView>
  );
};

export default wishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFf",
  },
});
