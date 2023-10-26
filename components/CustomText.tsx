import { Text, StyleProp, TextStyle } from "react-native";
import React, { ReactNode } from "react";
type CustomTextProps = {
  color?: string;
  fontFamily?:
    | "Poppins_300Light"
    | "Poppins_400Regular"
    | "Poppins_100Thin_Italic"
    | "Poppins_600SemiBold"
    | "Poppins_500Medium";

  fontSize?: number;
  children: ReactNode;
  styles?: StyleProp<TextStyle>;
};
const CustomText = (props: CustomTextProps) => {
  const {
    fontFamily = "Poppins_500Medium",
    fontSize = 16,
    children,
    color = "#000",
    styles,
  } = props;

  return (
    <Text style={[{ fontFamily, fontSize, color }, styles]}>{children}</Text>
  );
};

export default CustomText;
