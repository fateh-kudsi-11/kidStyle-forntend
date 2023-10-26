import { Stack } from "expo-router";

export default function SearchStack() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen
        name="myDetails"
        options={{
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="changePassword"
        options={{
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
