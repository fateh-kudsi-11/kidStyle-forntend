import React, { useState, ComponentProps } from "react";
import { StyleSheet, View, TextInput, KeyboardTypeOptions } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { InputState } from "@/types/LayoutTypes";

// @layout
import CustomText from "@/components/CustomText";

type InputPropsType = {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  placeholder: string;
  type: KeyboardTypeOptions;
  value?: InputState;
  setValue: (InputState: InputState) => void;
  max?: number;
};

const PasswordInput = (props: InputPropsType) => {
  const { iconName, placeholder, type, value, setValue } = props;
  const [hidden, setHidden] = useState(true);
  const { isError, errMsg } = value ?? {};
  const handleHidden = () => {
    setHidden(!hidden);
  };
  const handleInput = (e: string) => {
    setValue({
      ...value,
      value: e,
      isError: false,
      errMsg: "",
    });
  };
  return (
    <View style={styles.mainContainer}>
      <View style={isError ? styles.errorContainer : styles.container}>
        <MaterialCommunityIcons
          name={iconName}
          size={20}
          color={isError ? "#FF6347" : "#6A6A6A"}
        />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          keyboardType={type}
          autoCapitalize="none"
          secureTextEntry={hidden}
          value={value?.value}
          onChangeText={handleInput}
        />
        <Ionicons
          name={hidden ? "ios-eye-off" : "ios-eye"}
          size={20}
          color="#6A6A6A"
          style={styles.eye}
          onPress={handleHidden}
        />
      </View>
      {isError && (
        <CustomText fontFamily="Poppins_500Medium" styles={styles.errMsg}>
          {errMsg}
        </CustomText>
      )}
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: 50,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    elevation: 4,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  errorContainer: {
    borderColor: "#FF6347",
    borderWidth: 2,
    backgroundColor: "#fff",
    width: "90%",
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    elevation: 4,
    marginBottom: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    position: "relative",
  },
  input: {
    position: "absolute",
    width: "90%",
    maxWidth: "90%",
    left: "30%",
    fontSize: 15,
    height: "100%",
  },
  eye: {
    position: "absolute",
    right: "10%",
  },
  errMsg: {
    color: "#FF6347",
    marginBottom: 20,
  },
});
