import { StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useCallback, useRef } from "react";
import { useNavigation } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { FilteringState, clearDirectory } from "@/redux/slices/filteringSlice";
import { capitalizeFirstChar } from "@/utils/stringHelper";
import Colors from "@/constants/Colors";
import ProductsSearchButtons from "@/components/ProductsSearchButtons";
import ProductContainer from "@/components/ProductContainer";
import BottomSheet from "@/components/BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Products = () => {
  const navigation = useNavigation();
  const { container } = styles;
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
  };

  const dispatch = useDispatch();
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { directory, gender } = filtering;

  const setNavigationOptions = useCallback(() => {
    navigation.setOptions({
      title: directory ? capitalizeFirstChar(directory) : "Products",

      headerStyle: {
        backgroundColor: "#fff",
      },

      headerTitleStyle: {
        color:
          gender == "boys"
            ? Colors.light.boysPrimary
            : Colors.light.girlsPrimary,
        fontFamily: "Kalam_700Bold",
      },
      headerTintColor:
        gender == "boys" ? Colors.light.boysPrimary : Colors.light.girlsPrimary,
    });
  }, [navigation, directory]);

  useEffect(() => {
    setNavigationOptions();

    return () => {
      dispatch(clearDirectory());
    };
  }, [dispatch, setNavigationOptions]);

  return (
    <SafeAreaView style={container}>
      <ProductsSearchButtons onSort={openModal} />
      <ProductContainer />
      <BottomSheet ref={bottomSheetRef} />
    </SafeAreaView>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
