import React, { ComponentProps } from "react";
import { StyleSheet, View, TextInput, KeyboardTypeOptions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { InputState } from "@/types/LayoutTypes";

// @layout
import CustomText from "./CustomText";

type InputPropsType = {
  iconName: ComponentProps<typeof MaterialCommunityIcons>["name"];
  placeholder: string;
  type: KeyboardTypeOptions;
  value?: InputState;
  setValue: (InputState: InputState) => void;
  max?: number;
};

const Input = (props: InputPropsType) => {
  const { iconName, placeholder, type, value, setValue, max } = props;

  const { isError, errMsg } = value ?? {};
  const handleInput = (e: string) => {
    if (value) {
      setValue({
        ...value,
        value: e,
        isError: false,
        errMsg: "",
      });
    }
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
          style={{ ...styles.input }}
          keyboardType={type}
          autoCapitalize="none"
          returnKeyType="done"
          value={value?.value}
          onChangeText={handleInput}
          maxLength={max ? max : undefined}
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

export default Input;

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
    height: 50,
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
    height: "100%",
    left: "30%",
    fontSize: 15,
  },
  errMsg: {
    color: "#FF6347",
    marginBottom: 18,
  },
});
