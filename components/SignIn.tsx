import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import validator from "validator";
import { SetStateAction, useState, Dispatch } from "react";
import Input from "@/components/Input";
import { InputState } from "@/types/LayoutTypes";
import { ErrorMes } from "@/types/User";
import CustomText from "./CustomText";
import PasswordInput from "./PasswordInput";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { AuthMode } from "@/app/auth";
import { useLoginMutation } from "@/redux/apis/userApi";
import { saveTokenToStorage } from "@/utils/storageHelpers";
import { useToast } from "react-native-toast-notifications";
import { router } from "expo-router";
import { setCredentials } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
type SignInProps = {
  gender: string;
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
};
const { isEmail, isStrongPassword } = validator;
const SignIn = (prosp: SignInProps) => {
  const { gender, setAuthMode } = prosp;
  const { container, labelContainer, actionButton } = styles;
  const [login, { isLoading }] = useLoginMutation();
  const toast = useToast();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const [password, setPassword] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const handelSignin = async () => {
    const isVaildEmail = isEmail(email.value);
    const isVaildPassword = isStrongPassword(password.value, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false,
    });
    if (!isVaildEmail) {
      setEmail({
        value: "",
        isError: true,
        errMsg: "Please add vaild email address",
      });
      return;
    }
    setEmail({
      ...email,
      isError: false,
      errMsg: "",
    });

    if (!isVaildPassword) {
      setPassword({
        value: "",
        isError: true,
        errMsg: "Please add vaild password",
      });
      return;
    }
    try {
      const res = await login({
        username: email.value,
        password: password.value,
      }).unwrap();

      await saveTokenToStorage(res.token);
      dispatch(setCredentials(res));

      toast.show("Signin Success-Welcome Back", {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "zoom-in",
      });
      router.back();
    } catch (err) {
      const errorMes: ErrorMes = err as ErrorMes;
      alert(errorMes.data.detail);
    }
  };
  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <View style={container}>
          <CustomText
            fontSize={24}
            fontFamily="Poppins_500Medium"
            styles={{ marginVertical: 20 }}
            color={getBackgroundColor(gender)}
          >
            Sign In
          </CustomText>
          <View style={labelContainer}>
            <CustomText fontSize={14} color={getBackgroundColor(gender)}>
              Email Address :
            </CustomText>
          </View>
          <Input
            iconName="email"
            placeholder="Email Address"
            setValue={setEmail}
            type="email-address"
            value={email}
          />
          <View style={labelContainer}>
            <CustomText fontSize={14} color={getBackgroundColor(gender)}>
              Password :
            </CustomText>
          </View>
          <PasswordInput
            iconName="lock-outline"
            placeholder="Password"
            setValue={setPassword}
            type="visible-password"
            value={password}
          />
          <TouchableOpacity
            style={[
              actionButton,
              { backgroundColor: getBackgroundColor(gender) },
            ]}
            onPress={handelSignin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <CustomText
                fontFamily="Poppins_600SemiBold"
                color="white"
                fontSize={16}
              >
                Sign In
              </CustomText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => {
              setAuthMode("signup");
            }}
          >
            <CustomText fontFamily="Poppins_300Light">
              Don't have an account?
              <CustomText
                color={getBackgroundColor(gender)}
                styles={{ textDecorationLine: "underline" }}
              >
                {" "}
                Sign Up
              </CustomText>
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  labelContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 25,
    marginBottom: 10,
  },
  actionButton: {
    width: "90%",
    borderRadius: 25,
    backgroundColor: "black",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
