import { ActivityIndicator, StyleSheet, FlatList, View } from "react-native";
import { useLazyGetWishListProductQuery } from "@/redux/apis/wishListApi";
import { useLazyGetWishListProductIDSQuery } from "@/redux/apis/wishListApi";
import Product from "@/types/Product";
import ProductItem from "./ProductItem";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useState, useCallback, useEffect } from "react";
import EmptyBag from "./EmptyBag";

const WishList = () => {
  const { container, productStyleContainer } = styles;
  const isFocused = useIsFocused();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishListIds, setWishListIds] = useState<string[]>([]);
  const [getProduct, { isLoading, isFetching }] =
    useLazyGetWishListProductQuery();
  const [getWishListIds, { isLoading: isWishListIdsLoading }] =
    useLazyGetWishListProductIDSQuery();

  const fetchProducts = useCallback(async () => {
    try {
      const { data } = await getProduct();

      if (data) {
        const products: Product[] = data.map(
          (wishlistItem) => wishlistItem.product
        );
        setProducts(products);
      }

      const wishList = await getWishListIds().unwrap();
      setWishListIds(wishList);
    } catch (error) {
      console.log(error);
    }
  }, [getWishListIds, setWishListIds]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        fetchProducts();
      }
    }, [isFocused])
  );

  const fetchWishList = async () => {
    const wishList = await getWishListIds().unwrap();
    setWishListIds(wishList);
  };
  const reFetchProducts = async () => {
    const { data } = await getProduct();

    if (data) {
      const products: Product[] = data.map(
        (wishlistItem) => wishlistItem.product
      );
      setProducts(products);
    }
  };

  return (
    <View style={container}>
      {isLoading || isFetching || isWishListIdsLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductItem
              product={item}
              wishListIds={wishListIds}
              reFetchWishList={fetchWishList}
              reFetchProducts={reFetchProducts}
              mode="wishlist"
            />
          )}
          contentContainerStyle={productStyleContainer}
          numColumns={2}
          ListEmptyComponent={() => <EmptyBag mode="wishlist" />}
        />
      )}
    </View>
  );
};

export default WishList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  productStyleContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
