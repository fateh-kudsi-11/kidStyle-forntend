import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";
import { useSelector, useDispatch } from "react-redux";
import {
  FilteringState,
  toggleFilteringGender,
} from "@/redux/slices/filteringSlice";
import Colors from "@/constants/Colors";

const CONTAINER_WIDTH = Dimensions.get("window").width - 40;
const SwitchButton = () => {
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const dispatch = useDispatch();
  const { gender } = filtering;
  const [toggle, setToggle] = useState(false);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(toggle ? CONTAINER_WIDTH / 2 - 3 : 0) },
      ],
    };
  });
  const touchHandler = useCallback(() => {
    setToggle(!toggle);
    dispatch(toggleFilteringGender());
  }, [toggle, dispatch]);

  useEffect(() => {
    if (gender === "girls") {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }, [gender]);

  return (
    <View style={styles.container} onTouchEnd={touchHandler}>
      <Animated.View style={[styles.activeBg, animatedStyles]} />
      <View style={styles.textContainer}>
        <CustomText
          styles={
            toggle
              ? { ...styles.normalText }
              : {
                  ...styles.activeText,
                  color:
                    gender == "boys"
                      ? Colors.light.boysPrimary
                      : Colors.light.girlsPrimary,
                }
          }
          fontFamily="Poppins_600SemiBold"
        >
          Boys
        </CustomText>
      </View>
      <View style={styles.textContainer}>
        <CustomText
          styles={
            toggle
              ? {
                  ...styles.activeText,
                  color:
                    gender == "boys"
                      ? Colors.light.boysPrimary
                      : Colors.light.girlsPrimary,
                }
              : { ...styles.normalText }
          }
          fontFamily="Poppins_600SemiBold"
        >
          Girls
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "#e8e8e8",
    borderWidth: 1.5,
    height: 53,
    width: CONTAINER_WIDTH,
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 10,
    textAlign: "center",
    position: "relative",
    marginBottom: 10,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  activeText: {
    fontSize: 12,
    textAlign: "center",
  },
  normalText: {
    color: "#bdbdbd",
    fontSize: 12,
    textAlign: "center",
  },
  activeBg: {
    width: CONTAINER_WIDTH / 2,
    height: 50,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});

export default SwitchButton;
