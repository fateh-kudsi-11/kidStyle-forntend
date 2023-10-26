import { StyleSheet, View, FlatList, ScrollView } from "react-native";
import { useLazyGetPrductsQuery } from "@/redux/apis/productApi";
import { useLazyGetWishListProductIDSQuery } from "@/redux/apis/wishListApi";
import SkeletonLoader from "./SkeletonLoader";
import ProductItem from "./ProductItem";
import { PRODUCT_WIDTH } from "@/utils/constants";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import Product from "@/types/Product";
import { AuthState } from "@/redux/slices/authSlice";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const ProductContainer = () => {
  const { container, productStyleContainer } = styles;
  const [products, setProducts] = useState<Product[]>([]);
  const [wishListIds, setWishListIds] = useState<string[]>([]);
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const auth = useSelector((state: { auth: AuthState }) => state.auth);

  const { isAuth } = auth;
  const isFocused = useIsFocused();

  const [getProduct, { isLoading, isFetching }] = useLazyGetPrductsQuery();
  const [getWishListIds, { isLoading: isWishListIdsLoading }] =
    useLazyGetWishListProductIDSQuery();

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await getProduct({ filtering });

      if (data) setProducts(data);

      if (isAuth) {
        const wishList = await getWishListIds().unwrap();
        setWishListIds(wishList);
      }
    } catch (error) {
      console.log(error);
    }
  }, [filtering, isAuth, getWishListIds, setWishListIds]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        if (isAuth) {
          getWishListIds()
            .unwrap()
            .then((wishList) => {
              setWishListIds(wishList);
            });
        }
      }
    }, [isFocused])
  );

  const fetchWishList = async () => {
    const wishList = await getWishListIds().unwrap();
    setWishListIds(wishList);
  };
  return (
    <View style={container}>
      {isLoading || isFetching || isWishListIdsLoading ? (
        <ScrollView>
          <SkeletonLoader
            itemWidth={PRODUCT_WIDTH}
            itemHeight={250}
            itemCount={8}
          />
        </ScrollView>
      ) : (
        <>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductItem
                product={item}
                wishListIds={wishListIds}
                reFetchWishList={fetchWishList}
              />
            )}
            contentContainerStyle={productStyleContainer}
            numColumns={2}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingTop: 10,
    marginBottom: 70,
  },
  productStyleContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default ProductContainer;
