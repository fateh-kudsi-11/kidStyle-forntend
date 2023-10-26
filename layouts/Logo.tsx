import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Logo = () => {
  const { logoText, firstword, secoundword } = styles;
  return (
    <View>
      <Text style={logoText}>
        <Text style={firstword}>Kid</Text>
        <Text style={secoundword}>style</Text>
      </Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logoText: {
    fontFamily: "Kalam_700Bold",
    letterSpacing: 24 / 4,
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
  },
  firstword: {
    color: "#7A83FA",
  },
  secoundword: {
    color: "#FA7AAD",
  },
});
