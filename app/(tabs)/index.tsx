import { StyleSheet, View, SafeAreaView } from "react-native";
import Logo from "@/layouts/Logo";
import SwitchButton from "@/components/SwitchButton";
import MainHero from "@/components/MainHero";
import CategorySelector from "@/components/CategorySelector";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useSelector } from "react-redux";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Logo />
        <SwitchButton />
        <MainHero />
        <View style={styles.categoryContainer}>
          {gender == "boys" ? (
            <>
              <CategorySelector
                imageSource={require("@/assets/images/boy4.png")}
                textTitle="Suits"
              />
              <CategorySelector
                imageSource={require("@/assets/images/boy5.png")}
                textTitle="Jackets"
              />
            </>
          ) : (
            <>
              <CategorySelector
                imageSource={require("@/assets/images/girls2.png")}
                textTitle="Dresses"
                color={Colors.light.girlsPrimary}
              />
              <CategorySelector
                imageSource={require("@/assets/images/girls3.png")}
                textTitle="Jackets"
                color={Colors.light.girlsPrimary}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },

  categoryContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 25,
  },
});
