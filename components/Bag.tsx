import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useState, useRef } from "react";
import {
  useGetOrderItemsQuery,
  useDeleteOrderItemMutation,
} from "@/redux/apis/ordersApi";
import { Ionicons } from "@expo/vector-icons";
import BagItem from "./BagItem";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import OrderItem from "@/types/OrderItem";
import { useToast } from "react-native-toast-notifications";
import EmptyBag from "./EmptyBag";

const Bag = () => {
  const { data, isLoading, isFetching, refetch } = useGetOrderItemsQuery();
  const { container, listContainer, hiddenItemContainer, deleteButtonStyle } =
    styles;
  const isFocused = useIsFocused();
  const rowMapRef = useRef<SwipeListView<OrderItem> | null>(null);
  const toast = useToast();

  const [deleteOrder, { isLoading: isDeleteOrderLoading }] =
    useDeleteOrderItemMutation();
  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        refetch();
      }
    }, [isFocused])
  );

  const [bagItemLoading, setBagItemLoading] = useState(false);

  const deleteHandler = async (orderId: string) => {
    await deleteOrder({ orderId });
    await refetch();
    toast.show(
      "Item Removed-The item has been successfully removed from your shopping cart.",
      {
        type: "success",
        placement: "top",
        duration: 4000,
        animationType: "zoom-in",
      }
    );
  };

  const onDelete = (orderId: string, productName: string) => {
    Alert.alert(
      "",
      `Are you sure you want to remove ${productName} from your shopping bag?`,
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteHandler(orderId),
        },
        { text: "Cancel" },
      ]
    );
    rowMapRef.current?.closeAllOpenRows();
  };

  return (
    <View style={container}>
      {isLoading || isFetching ? (
        <ActivityIndicator />
      ) : (
        <>
          <SwipeListView
            data={data}
            ref={rowMapRef}
            renderItem={(item, rowMap) => (
              <BagItem
                orderItem={item.item}
                setBagItemLoading={setBagItemLoading}
              />
            )}
            renderHiddenItem={(data, rowMap) => (
              <View style={hiddenItemContainer}>
                <TouchableOpacity
                  style={[
                    deleteButtonStyle,
                    { display: bagItemLoading ? "none" : "flex" },
                  ]}
                  onPress={() => {
                    onDelete(data.item.id, data.item.product_info.productName);
                  }}
                >
                  <Ionicons name="ios-trash-sharp" size={24} color="white" />
                </TouchableOpacity>
              </View>
            )}
            leftOpenValue={75}
            rightOpenValue={0}
            style={listContainer}
            ListEmptyComponent={() => <EmptyBag />}
          />
        </>
      )}
    </View>
  );
};

export default Bag;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  listContainer: {
    width: "100%",
  },
  hiddenItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  deleteButtonStyle: {
    width: 75,
    backgroundColor: "#FF6347",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
});
