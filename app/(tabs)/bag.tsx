import { StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "expo-router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { AuthState } from "@/redux/slices/authSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import AuthBag from "@/components/AuthBag";
import Bag from "@/components/Bag";

const bag = () => {
  const navigation = useNavigation();
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );

  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  const { isAuth } = auth;

  const { gender } = filtering;
  const { container } = styles;
  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: "Bag",

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
      {!isAuth ? <AuthBag mode="bag" /> : <Bag />}
    </SafeAreaView>
  );
};

export default bag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFf",
  },
});
