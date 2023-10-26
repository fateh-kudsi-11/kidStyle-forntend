import React, { useRef, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { BASE_URL } from "@/utils/constants";
import { ProductImages, ProductImage } from "@/types/Product";
import { getBackgroundColor } from "@/utils/componentsHelpers";

const calcHeight = () => {
  const deviceHeight = Dimensions.get("window").height;
  return deviceHeight <= 667
    ? (deviceHeight * 50) / 100
    : (deviceHeight * 40) / 100;
};

type ProductImageSliderProps = {
  images: ProductImages;
  gender: string;
  selectedColor: string;
};

const ProductImageSlider = (props: ProductImageSliderProps) => {
  const flatListRef = useRef(null);
  const { images, gender, selectedColor } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const keys = Object.keys(images);
  const firstImagesKey = keys[0];

  const renderItem = useCallback(({ item }: { item: ProductImage }) => {
    return (
      <View style={[styles.imageContainer]}>
        <Pressable onPress={() => console.log("press from image")}>
          <Image
            source={{ uri: `${BASE_URL}${item.image}` }}
            style={[styles.image]}
          />
        </Pressable>
      </View>
    );
  }, []);

  const renderDot = useCallback(
    (index: number) => {
      return (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex
              ? {
                  backgroundColor: getBackgroundColor(gender),
                }
              : null,
          ]}
        />
      );
    },
    [activeIndex, gender]
  );

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / Dimensions.get("window").width);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        ref={flatListRef}
        data={images[selectedColor !== "" ? selectedColor : firstImagesKey]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.image}
        renderItem={renderItem}
        onScroll={handleScroll}
      />

      <View style={styles.dotsContainer}>
        {images[selectedColor !== "" ? selectedColor : firstImagesKey].map(
          (_, index) => renderDot(index)
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 20,
    gap: 10,
    marginTop: 20,
    height: calcHeight(),
    justifyContent: "center",
    marginBottom: 20,
  },

  imageContainer: {
    width: Dimensions.get("window").width - 20,
  },
  image: {
    width: Dimensions.get("window").width - 20,
    height: calcHeight(),
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
});

export default ProductImageSlider;
