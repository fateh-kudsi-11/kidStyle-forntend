import { Stack } from "expo-router";

export default function SearchStack() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="products"
        options={{
          headerShadowVisible: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="product"
        options={{
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
