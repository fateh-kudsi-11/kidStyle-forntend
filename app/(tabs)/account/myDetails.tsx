import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useNavigation } from "expo-router";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { InputState } from "@/types/LayoutTypes";
import { useToast } from "react-native-toast-notifications";
import { AuthState } from "@/redux/slices/authSlice";
import Input from "@/components/Input";
import CustomText from "@/components/CustomText";
import { useUpdateUserMutation } from "@/redux/apis/userApi";
import { updateUserProfile } from "@/redux/slices/authSlice";
import validator from "validator";

const { isEmail, isEmpty } = validator;

const myDetails = () => {
  const { container, labelContainer, actionButton } = styles;

  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const { user } = auth;

  const { gender } = filtering;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [firstName, setFirstName] = useState<InputState>({
    value: user ? user.firstName : "",
    isError: false,
    errMsg: "",
  });

  const [lastName, setLastName] = useState<InputState>({
    value: user ? user.lastName : "",
    isError: false,
    errMsg: "",
  });

  const [email, setEmail] = useState<InputState>({
    value: user ? user.email : "",
    isError: false,
    errMsg: "",
  });

  const handleSubmit = async () => {
    const isFirstNameVaild = isEmpty(firstName.value);
    const isLastNameVaild = isEmpty(lastName.value);
    const isVaildEmail = isEmail(email.value);

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

    try {
      const data = await updateUser({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      }).unwrap();

      dispatch(updateUserProfile(data));

      toast.show(
        "Profile Updated-Your profile details have been successfully updated.",
        {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "zoom-in",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: "My Details",

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

export default myDetails;

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
