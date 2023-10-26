import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useNavigation, router } from "expo-router";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { InputState } from "@/types/LayoutTypes";
import { useToast } from "react-native-toast-notifications";
import CustomText from "@/components/CustomText";
import validator from "validator";
import PasswordInput from "@/components/PasswordInput";
import { useUpdatePasswordMutation } from "@/redux/apis/userApi";

const { isStrongPassword, equals } = validator;

const changePassword = () => {
  const { container, labelContainer, actionButton } = styles;

  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const { gender } = filtering;
  const navigation = useNavigation();
  const toast = useToast();

  const [oldPassword, setOldPassword] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const [newPassword, setNewPassword] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const [confirmPassword, setConfirmPassword] = useState<InputState>({
    value: "",
    isError: false,
    errMsg: "",
  });

  const handleSubmit = async () => {
    const isVaildOldPassword = isStrongPassword(oldPassword.value, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false,
    });
    const isVaildNewPassword = isStrongPassword(newPassword.value, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
      returnScore: false,
    });
    const isVaildConfirmPassword = equals(
      newPassword.value,
      confirmPassword.value
    );

    if (!isVaildOldPassword) {
      setOldPassword({
        value: "",
        errMsg: "Please enter vaild Password",
        isError: true,
      });
      return;
    }

    if (!isVaildNewPassword) {
      setNewPassword({
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
      const data = await updatePassword({
        old_password: oldPassword.value,
        new_password: newPassword.value,
      }).unwrap();

      toast.show(
        "Password Changed-Your password has been successfully updated.",
        {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "zoom-in",
        }
      );
      router.back();
    } catch (error) {
      // @ts-ignore
      if (error.status) {
        toast.show(
          "Password Update Failed-The old password you entered is incorrect. Please double check and try again.",
          {
            type: "danger",
            placement: "top",
            duration: 4000,
            animationType: "zoom-in",
          }
        );
      }
      router.back();
    }
  };

  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: "Change password",

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

  useEffect(setNavigationOptions, [setNavigationOptions]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={[container]}>
      <View style={labelContainer}>
        <CustomText fontSize={14} color={getBackgroundColor(gender)}>
          Old Password :
        </CustomText>
      </View>
      <PasswordInput
        iconName="lock-outline"
        placeholder="Password"
        setValue={setOldPassword}
        type="visible-password"
        value={oldPassword}
      />
      <View style={labelContainer}>
        <CustomText fontSize={14} color={getBackgroundColor(gender)}>
          New Password :
        </CustomText>
      </View>
      <PasswordInput
        iconName="lock-outline"
        placeholder="Password"
        setValue={setNewPassword}
        type="visible-password"
        value={newPassword}
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
        style={[actionButton, { backgroundColor: getBackgroundColor(gender) }]}
        onPress={handleSubmit}
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
            Save changes
          </CustomText>
        )}
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default changePassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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

// toast.show(
//   "Item Removed-The item has been successfully removed from your shopping cart.",
//   {
//     type: "success",
//     placement: "top",
//     duration: 4000,
//     animationType: "zoom-in",
//   }
// );
