import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import Product from "@/types/Product";
import { PRODUCT_WIDTH } from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "./CustomText";
import ProductImageSlider from "@/components/ProductImageSlider";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { shortenString } from "@/utils/stringHelper";
import {
  useCreateWishListMutation,
  useDeleteWishListMutation,
} from "@/redux/apis/wishListApi";
import { useToast } from "react-native-toast-notifications";

type ProductItemProps = {
  product: Product;
  wishListIds: string[];

  reFetchWishList: () => void;
  mode?: "products" | "wishlist";
  reFetchProducts?: () => Promise<void>;
};
const ProductItem = (props: ProductItemProps) => {
  const {
    product,
    wishListIds,
    reFetchWishList,
    mode = "products",
    reFetchProducts,
  } = props;

  const { productName, images, price, colors, brand, id } = product;
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const [isFav, setIsFav] = useState(false);
  const [isWishLoading, setIsWishLoading] = useState(false);

  const { gender } = filtering;
  const { container, productInfoContainer, iconContainer } = styles;
  const [createWishList, { isLoading }] = useCreateWishListMutation();
  const [deleteWishList, { isLoading: isDeleteLoading }] =
    useDeleteWishListMutation();
  const toast = useToast();

  const updateIsFav = useCallback(() => {
    const isProductInWishList = wishListIds.includes(id);
    setIsFav(isProductInWishList);
  }, [wishListIds, id]);

  useEffect(updateIsFav, [updateIsFav]);

  const navigteToProduct = () => {
    router.push({
      pathname: "/(tabs)/search/product",
      params: {
        id,
      },
    });
  };

  const addToWishListHandler = async () => {
    toast.hideAll();
    setIsWishLoading(true);
    try {
      if (!isFav) {
        const data = await createWishList(id).unwrap();
        toast.show(
          "Add to wish list Success-Item has been added to your wishlist.",
          {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "zoom-in",
          }
        );
      } else {
        await deleteWishList(id).unwrap();
        toast.show(
          "delete from wish list Success-Item has been removed from your wishlist.",
          {
            type: "success",
            placement: "top",
            duration: 4000,
            animationType: "zoom-in",
          }
        );
        if (mode == "wishlist" && reFetchProducts !== undefined) {
          await reFetchProducts();
        }
      }

      await reFetchWishList();
    } catch (error) {
      console.log(error);
    }
    setIsWishLoading(false);
  };

  return (
    <View style={[container]}>
      <ProductImageSlider
        images={images}
        gender={gender}
        colors={colors}
        navigateHandler={navigteToProduct}
      />
      <TouchableOpacity style={productInfoContainer} onPress={navigteToProduct}>
        <CustomText
          fontFamily="Poppins_500Medium"
          fontSize={12}
          color={getBackgroundColor(gender)}
        >
          {brand}
        </CustomText>
        <CustomText fontFamily="Poppins_400Regular" fontSize={12}>
          {shortenString(productName)}
        </CustomText>
        <CustomText
          fontFamily="Poppins_600SemiBold"
          fontSize={16}
          color={getBackgroundColor(gender)}
        >
          $ {price}
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={iconContainer} onPress={addToWishListHandler}>
        {isLoading || isDeleteLoading || isWishLoading ? (
          <ActivityIndicator />
        ) : (
          <Ionicons
            name={isFav ? "ios-heart" : "ios-heart-outline"}
            size={22}
            color={getBackgroundColor(gender)}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: PRODUCT_WIDTH,
    backgroundColor: "#fff",
    overflow: "hidden",
    margin: 5,
    borderRadius: 15,
    position: "relative",
    paddingTop: 10,
  },

  imageStyle: { width: PRODUCT_WIDTH, height: PRODUCT_WIDTH },
  productInfoContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: "100%",
    width: "100%",
    padding: 10,
  },
  iconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 1,
    backgroundColor: "#eee",
    padding: 5,
    borderRadius: 20,
  },
});

export default ProductItem;
