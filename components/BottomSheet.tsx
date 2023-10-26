import { View, StyleSheet } from "react-native";
import React, { forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FilteringState } from "@/redux/slices/filteringSlice";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import SortButton from "./SortButton";
import { setSort } from "@/redux/slices/filteringSlice";

export type Ref = BottomSheetModal;
const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = React.useMemo(() => ["30%"], []);
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const dispatch = useDispatch();
  const { dismiss } = useBottomSheetModal();
  const { contentContainer } = styles;
  const handelSort = (sort: string) => {
    dispatch(setSort(sort));
    dismiss();
  };
  return (
    <BottomSheetModal
      handleIndicatorStyle={{ display: "none" }}
      ref={ref}
      snapPoints={snapPoints}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
      backgroundStyle={{ backgroundColor: "rgba(238, 238, 238, 0.8)" }}
    >
      <View style={contentContainer}>
        <SortButton
          filtering={filtering}
          kind="popular"
          title="Sort by Popularity"
          handelSort={handelSort}
        />
        <SortButton
          filtering={filtering}
          kind="highToLow"
          title="Price: High to Low"
          handelSort={handelSort}
        />
        <SortButton
          filtering={filtering}
          kind="lowToHigh"
          title="Price: Low to High"
          handelSort={handelSort}
        />
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
});

export default BottomSheet;
