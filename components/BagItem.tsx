import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, Dispatch, SetStateAction } from "react";
import OrderItem from "@/types/OrderItem";
import { BASE_URL } from "@/utils/constants";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";
import { Entypo } from "@expo/vector-icons";
import { useUpdateQtyMutation } from "@/redux/apis/ordersApi";

type BagItemProps = {
  orderItem: OrderItem;
  setBagItemLoading: Dispatch<SetStateAction<boolean>>;
};

const BagItem = (props: BagItemProps) => {
  const {
    container,
    mainContainer,
    loadingContainer,
    imageStyle,
    productContainer,
    productText,
    qtyButtonsContainer,
    qtyButtons,
    divider,
  } = styles;

  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { orderItem, setBagItemLoading } = props;

  const { product_info, selected_color, qty, id } = orderItem;
  const { productName, images, brand, price } = product_info;
  const imageUrl = images[selected_color][0].image;
  const { gender } = filtering;

  const [qtyState, setQty] = useState(qty);

  const [updateQty, { isLoading }] = useUpdateQtyMutation();

  const increaseQty = async () => {
    const newQty = qtyState + 1;
    setQty(newQty);
    await updateServer(newQty);
  };

  const decreaseQty = async () => {
    if (qtyState > 1) {
      const newQty = qtyState - 1;
      setQty(newQty);
      await updateServer(newQty);
    }
  };

  const updateServer = async (newQty: number) => {
    if (newQty !== qty) {
      try {
        setBagItemLoading(true);
        const res = await updateQty({ orderId: id, qty: newQty }).unwrap();
        setBagItemLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={mainContainer}>
      {isLoading ? (
        <View style={loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={container}>
          <Image
            source={{ uri: `${BASE_URL}${imageUrl}` }}
            style={imageStyle}
          />
          <View style={productContainer}>
            <View style={productText}>
              <CustomText fontFamily="Poppins_600SemiBold" fontSize={14}>
                {productName}
              </CustomText>
              <CustomText fontFamily="Poppins_300Light" fontSize={10}>
                {brand}
              </CustomText>
              <CustomText fontFamily="Poppins_600SemiBold">${price}</CustomText>
            </View>
          </View>
          <View style={qtyButtonsContainer}>
            <View style={{ flex: 1 }} />
            <View
              style={[
                qtyButtons,
                { backgroundColor: getBackgroundColor(gender) },
              ]}
            >
              <TouchableOpacity
                onPress={increaseQty}
                style={{
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="plus" size={20} color="white" />
              </TouchableOpacity>

              <CustomText color="white">{qtyState}</CustomText>
              <TouchableOpacity
                onPress={decreaseQty}
                style={{
                  width: "40%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Entypo name="minus" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={[divider, { display: isLoading ? "none" : "flex" }]} />
    </View>
  );
};

export default BagItem;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  container: {
    width: "100%",
    marginBottom: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  loadingContainer: {
    width: "100%",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    width: 70,
    height: 70,
  },
  productContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  productText: {
    gap: 10,
  },
  qtyButtonsContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  qtyButtons: {
    width: 100,
    height: 28,
    backgroundColor: "red",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  divider: {
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
});
