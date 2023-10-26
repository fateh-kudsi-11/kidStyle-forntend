import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useNavigation, router } from "expo-router";
import React, { useCallback, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetProductQuery } from "@/redux/apis/productApi";
import ProductSlider from "@/components/ProductSlider";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { AuthState } from "@/redux/slices/authSlice";
import CustomText from "@/components/CustomText";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { ColorType } from "@/types/Product";
import { useToast } from "react-native-toast-notifications";
import { useCreateOrderMutation } from "@/redux/apis/ordersApi";
import {
  useLazyGetWishListProductIDSQuery,
  useCreateWishListMutation,
  useDeleteWishListMutation,
} from "@/redux/apis/wishListApi";

const product = () => {
  const { id } = useLocalSearchParams();
  const { data: product, isLoading, error } = useGetProductQuery(id as string);
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );

  const auth = useSelector((state: { auth: AuthState }) => state.auth);
  const { gender } = filtering;
  const { isAuth } = auth;

  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const [getWishListIds, { isLoading: isFetchWishListIDSLoading }] =
    useLazyGetWishListProductIDSQuery();
  const [createWishList, { isLoading: isCreateLoading }] =
    useCreateWishListMutation();
  const [deleteWishList, { isLoading: isDeleteLoading }] =
    useDeleteWishListMutation();

  const [isFav, setIsFav] = useState(false);

  const fetchWishList = useCallback(async () => {
    try {
      if (isAuth && product) {
        const wishList = await getWishListIds().unwrap();

        const isProductInWishList = wishList.includes(product.id);

        setIsFav(isProductInWishList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [isAuth, getWishListIds, product, isFav]);

  const {
    container,
    loadingContainer,
    productInfoContainer,
    colorContainer,
    sizeStyle,
    activeColor,
    actionButton,
    actionButtonContainer,
  } = styles;
  const navigation = useNavigation();
  const toast = useToast();

  const { images } = product ?? {};

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const handleSizeSelecte = (x: string) => {
    setSelectedSize(x);
  };
  const handelColorSelecte = (x: string) => {
    setSelectedColor(x);
  };

  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: "Products Details",
      headerRight: () => renderHeaderButton(),

      headerStyle: {
        backgroundColor: "#fff",
      },

      headerTitleStyle: {
        color: getBackgroundColor(gender),
        fontFamily: "Kalam_700Bold",
      },
      headerTintColor: getBackgroundColor(gender),
    });
  }, [navigation, gender, isFav]);

  useEffect(() => {
    fetchWishList();
    setNavigationOptions();
    if (images) {
      const keys = Object.keys(images);
      setSelectedColor(keys[0]);
    }
  }, [setNavigationOptions, images, setSelectedColor, fetchWishList]);

  const addToWishlistHandler = async () => {
    const newIsFav = !isFav;
    setIsFav(newIsFav);

    try {
      if (isFav) {
        await deleteWishList(id as string).unwrap();
      } else {
        const data = await createWishList(id as string).unwrap();
      }

      toast.show(
        isFav
          ? "Item has been removed from your wishlist."
          : "Item has been added to your wishlist.",
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

  const renderSize = useCallback(
    (size: string) => {
      return (
        <TouchableOpacity
          onPress={() => handleSizeSelecte(size)}
          key={size}
          style={[
            sizeStyle,
            selectedSize == size
              ? {
                  backgroundColor: getBackgroundColor(gender),
                  borderColor: getBackgroundColor(gender),
                }
              : null,
          ]}
        >
          <CustomText
            fontFamily="Poppins_600SemiBold"
            fontSize={14}
            color={selectedSize == size ? "white" : undefined}
          >
            {size.toUpperCase()}
          </CustomText>
        </TouchableOpacity>
      );
    },
    [handleSizeSelecte, selectedSize]
  );

  const renderColor = useCallback(
    (color: ColorType) => {
      return (
        <TouchableOpacity
          onPress={() => handelColorSelecte(color.color)}
          key={color.color}
          style={[colorContainer, { backgroundColor: color.colorCode }]}
        >
          <View
            style={[
              activeColor,
              color.color == selectedColor ? { display: "flex" } : null,
            ]}
          />
        </TouchableOpacity>
      );
    },
    [handelColorSelecte, selectedColor]
  );

  const renderHeaderButton = useCallback(() => {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={addToWishlistHandler}
      >
        {isCreateLoading || isDeleteLoading ? (
          <ActivityIndicator />
        ) : (
          <Ionicons
            name={isFav ? "ios-heart" : "ios-heart-outline"}
            size={22}
            color={getBackgroundColor(gender)}
          />
        )}
      </TouchableOpacity>
    );
  }, [isFav]);

  const addToCartHandler = async () => {
    if (!isAuth) return router.push("/auth");
    toast.hideAll();

    if (selectedSize === "") {
      return toast.show(
        "Size Required-Please select a size before adding to your cart.",
        {
          type: "danger",
          placement: "top",
          duration: 4000,
          animationType: "zoom-in",
        }
      );
    }

    try {
      await createOrder({
        selected_color: selectedColor,
        selected_size: selectedSize,
        qty: 1,
        product: product?.id || "",
      }).unwrap();
      toast.show(
        "Added to Cart-The item has been successfully added to your cart.",
        {
          type: "success",
          placement: "top",
          duration: 4000,
          animationType: "zoom-in",
        }
      );
      setSelectedSize("");
    } catch (err) {
      toast.show("Something Went Wrong-Please try agin later", {
        type: "danger",
        placement: "top",
        duration: 4000,
        animationType: "zoom-in",
      });
    }
  };

  return (
    <>
      {isLoading || isFetchWishListIDSLoading ? (
        <View style={loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <SafeAreaView style={container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: Dimensions.get("window").height <= 667 ? 10 : 0,
            }}
          >
            <ProductSlider
              images={images ?? {}}
              gender={gender}
              selectedColor={selectedColor}
            />

            <View style={productInfoContainer}>
              <CustomText fontFamily="Poppins_600SemiBold">
                {product?.brand}
              </CustomText>
              <CustomText fontFamily="Poppins_300Light">
                {product?.productName}
              </CustomText>
            </View>

            <View style={[productInfoContainer, { marginTop: 10 }]}>
              <CustomText fontFamily="Poppins_600SemiBold">
                Select Color
              </CustomText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product?.colors.map((color) => renderColor(color))}
              </ScrollView>
            </View>
            <View style={[productInfoContainer, { marginTop: 10 }]}>
              <CustomText fontFamily="Poppins_600SemiBold">
                Select Size
              </CustomText>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {product?.sizes.map((size) => renderSize(size))}
              </ScrollView>
            </View>

            <View style={actionButtonContainer}>
              <TouchableOpacity
                style={[
                  actionButton,
                  { backgroundColor: getBackgroundColor(gender) },
                ]}
                onPress={addToCartHandler}
                disabled={isOrderLoading}
              >
                {isOrderLoading ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    <CustomText
                      fontFamily="Poppins_600SemiBold"
                      color="white"
                      fontSize={18}
                    >
                      Add To Cart
                    </CustomText>

                    <CustomText fontFamily="Poppins_600SemiBold" color="white">
                      $ {product?.price}
                    </CustomText>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>

          <StatusBar style="light" />
        </SafeAreaView>
      )}
    </>
  );
};

export default product;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  productInfoContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    textAlign: "left",
    gap: 10,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    width: "100%",
    opacity: 0.5,
  },

  sizeStyle: {
    padding: 10,
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    borderColor: "#efefef",
  },
  colorContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeColor: {
    width: "50%",
    height: "50%",
    borderRadius: 15,
    backgroundColor: "#fff",
    display: "none",
  },
  actionButtonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  actionButton: {
    maxWidth: Dimensions.get("window").width - 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "black",
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 25,
  },
});
