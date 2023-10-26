import React, { useRef, useState, useCallback } from "react";
import { View, FlatList, Image, StyleSheet, Pressable } from "react-native";
import { PRODUCT_WIDTH, BASE_URL } from "@/utils/constants";
import { ProductImages, ProductImage, ColorType } from "@/types/Product";
import { getBackgroundColor } from "@/utils/componentsHelpers";

type ProductImageSliderProps = {
  images: ProductImages;
  gender: string;
  colors: ColorType[];
  navigateHandler: () => void;
};

const ProductImageSlider = (props: ProductImageSliderProps) => {
  const flatListRef = useRef(null);
  const { images, gender, colors, navigateHandler } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const keys = Object.keys(images);
  const firstImagesKey = keys[0];

  const renderItem = useCallback(({ item }: { item: ProductImage }) => {
    return (
      <View style={styles.imageContainer}>
        <Pressable onPress={navigateHandler}>
          <Image
            source={{ uri: `${BASE_URL}${item.image}` }}
            style={styles.image}
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

  const renderColor = useCallback(
    (color: ColorType) => (
      <View
        key={color.colorCode}
        style={[styles.colorStyles, { backgroundColor: color.colorCode }]}
      />
    ),
    []
  );

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / PRODUCT_WIDTH);
    setActiveIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images[firstImagesKey]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item) => item.image}
        renderItem={renderItem}
        onScroll={handleScroll}
      />
      <Pressable style={styles.dotsColorsContainer} onPress={navigateHandler}>
        <View style={styles.colorContainer}>
          {colors.map((color) => renderColor(color))}
        </View>
        <View style={styles.dotsContainer}>
          {images[firstImagesKey].map((_, index) => renderDot(index))}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PRODUCT_WIDTH,
    height: PRODUCT_WIDTH,
  },
  imageContainer: {
    width: PRODUCT_WIDTH,
    height: PRODUCT_WIDTH,
  },
  image: {
    width: PRODUCT_WIDTH,
    height: "100%",
    resizeMode: "cover",
  },
  dotsColorsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  colorStyles: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginLeft: -4,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#ccc",
    marginHorizontal: 2.5,
  },
});

export default ProductImageSlider;
