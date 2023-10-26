import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SetStateAction, useState, Dispatch } from "react";
import Input from "@/components/Input";
import validator from "validator";
import { InputState } from "@/types/LayoutTypes";
import CustomText from "./CustomText";
import PasswordInput from "./PasswordInput";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { AuthMode } from "@/app/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import { saveTokenToStorage } from "@/utils/storageHelpers";
import { useToast } from "react-native-toast-notifications";
import { useRegisterMutation } from "@/redux/apis/userApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { ErrorMes } from "@/types/User";

type SignUpProps = {
  gender: string;
  setAuthMode: Dispatch<SetStateAction<AuthMode>>;
};
const { isEmail, isStrongPassword, isEmpty, equals } = validator;

const SignUp = (prosp: SignUpProps) => {
  const { gender, setAuthMode } = prosp;
  const { container, labelContainer, actionButton } = styles;

  const [register, { isLoading }] = useRegisterMutation();
  const toast = useToast();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const [lastName, setLastName] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

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

  const [confirmPassword, setConfirmPassword] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const handelRegister = async () => {
    const isFirstNameVaild = isEmpty(firstName.value);
    const isLastNameVaild = isEmpty(lastName.value);
    const isVaildEmail = isEmail(email.value);
    const isVaildPassword = isStrongPassword(password.value, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false,
    });
    const isVaildConfirmPassword = equals(
      password.value,
      confirmPassword.value
    );
    if (!!isFirstNameVaild) {
      setFirstName({
        value: "",
        errMsg: "Please enter your first name.",
        isError: true,
      });
      return;
    }

    if (!!isLastNameVaild) {
      setLastName({
        value: "",
        errMsg: "Please enter your last name.",
        isError: true,
      });
      return;
    }

    if (!isVaildEmail) {
      setEmail({
        value: "",
        errMsg: "Please provide a valid email.",
        isError: true,
      });
      return;
    }
    if (!isVaildPassword) {
      setPassword({
        value: "",
        errMsg: "Please enter vaild Password",
        isError: true,
      });
      return;
    }

    if (!isVaildConfirmPassword) {
      setConfirmPassword({
        value: "",
        errMsg:
          "Password confirmation does not match the original password. Please ensure both passwords are identical.",
        isError: true,
      });
      return;
    }
    try {
      const res = await register({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }).unwrap();

      await saveTokenToStorage(res.token);
      dispatch(setCredentials(res));

      toast.show(
        "Register Success-Thank you! We are happy to have you on board.",
        {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "zoom-in",
        }
      );
      router.back();
    } catch (err) {
      const errorMes: ErrorMes = err as ErrorMes;
      alert(errorMes.data.detail);
    }
  };
  return (
    <KeyboardAwareScrollView style={{ flex: 1, width: "100%" }}>
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
            Sign Up
          </CustomText>
          <View style={labelContainer}>
            <CustomText fontSize={14} color={getBackgroundColor(gender)}>
              First Name :
            </CustomText>
          </View>
          <Input
            iconName="account"
            placeholder="First Name"
            setValue={setFirstName}
            type="email-address"
            value={firstName}
          />

          <View style={labelContainer}>
            <CustomText fontSize={14} color={getBackgroundColor(gender)}>
              Last Name :
            </CustomText>
          </View>
          <Input
            iconName="account"
            placeholder="Last Name"
            setValue={setLastName}
            type="email-address"
            value={lastName}
          />
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

          <View style={labelContainer}>
            <CustomText fontSize={14} color={getBackgroundColor(gender)}>
              Confirm Password :
            </CustomText>
          </View>
          <PasswordInput
            iconName="lock-outline"
            placeholder="Confirm Password"
            setValue={setConfirmPassword}
            type="visible-password"
            value={confirmPassword}
          />
          <TouchableOpacity
            style={[
              actionButton,
              { backgroundColor: getBackgroundColor(gender) },
            ]}
            onPress={handelRegister}
          >
            <CustomText
              fontFamily="Poppins_600SemiBold"
              color="white"
              fontSize={16}
            >
              Sign Up
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => {
              setAuthMode("signin");
            }}
          >
            <CustomText fontFamily="Poppins_300Light">
              Already have an account?
              <CustomText
                color={getBackgroundColor(gender)}
                styles={{ textDecorationLine: "underline" }}
              >
                {" "}
                Sign In
              </CustomText>
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

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
