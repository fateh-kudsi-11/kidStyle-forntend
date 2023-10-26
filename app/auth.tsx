import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation, router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Logo from "@/layouts/Logo";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";

export type AuthMode = "signin" | "signup";

export default function AuthScreen() {
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { auth } = useLocalSearchParams();
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const { gender } = filtering;
  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Ionicons
          name="ios-close-sharp"
          size={24}
          color={getBackgroundColor(gender)}
        />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: "#fff",
    },
    headerTitle: () => (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Logo />
      </View>
    ),
  });
  useEffect(() => {
    if ((auth as string) == "signup") {
      setAuthMode("signup");
    }
  }, [auth]);
  return (
    <SafeAreaView style={styles.container}>
      {authMode == "signin" ? (
        <SignIn gender={gender} setAuthMode={setAuthMode} />
      ) : (
        <SignUp gender={gender} setAuthMode={setAuthMode} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
