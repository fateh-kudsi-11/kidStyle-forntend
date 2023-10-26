import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import Logo from "@/layouts/Logo";
import SwitchButton from "@/components/SwitchButton";
import CategorySelectOptions from "@/utils/CategorySelectOptions";
import CategorySelectItem from "@/components/CategorySelectItem";
import { router } from "expo-router";

const index = () => {
  const { container, CategorySelectContainer } = styles;
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender, directory } = filtering;

  if (directory) {
    router.push("/(tabs)/search/products");
  }
  return (
    <SafeAreaView style={container}>
      <Logo />
      <SwitchButton />
      <ScrollView contentContainerStyle={CategorySelectContainer}>
        {gender == "boys" ? (
          <>
            {CategorySelectOptions.boysCategory.map((item) => (
              <CategorySelectItem key={item.title} {...item} gender={gender} />
            ))}
          </>
        ) : (
          <>
            {CategorySelectOptions.girlsCategory.map((item) => (
              <CategorySelectItem key={item.title} {...item} gender={gender} />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  CategorySelectContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 15,
    maxWidth: "100%",
    paddingHorizontal: 20,
  },
});
