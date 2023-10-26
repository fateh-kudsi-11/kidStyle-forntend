import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withRepeat,
} from "react-native-reanimated";

type SkeletonLoaderItemProps = {
  width: number;
  height: number;
};

const SkeletonLoaderItem: React.FC<SkeletonLoaderItemProps> = ({
  width,
  height,
}) => {
  const progress = useSharedValue(0);

  progress.value = withRepeat(
    withTiming(1, { duration: 1000, easing: Easing.linear }),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  });

  return (
    <Animated.View
      style={[styles.itemContainer, { width, height }, animatedStyle]}
    />
  );
};

type SkeletonLoaderProps = {
  itemWidth: number;
  itemHeight: number;
  itemCount: number;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  itemWidth,
  itemHeight,
  itemCount,
}) => {
  const skeletons = Array.from({ length: itemCount }, (_, index) => (
    <SkeletonLoaderItem key={index} width={itemWidth} height={itemHeight} />
  ));

  return <View style={styles.container}>{skeletons}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    // padding: 10,
    paddingHorizontal: 10,
    gap: 10,
  },
  itemContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
});

export default SkeletonLoader;
