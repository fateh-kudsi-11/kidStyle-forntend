import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Provider } from "react-redux";
import { ToastProvider } from "react-native-toast-notifications";
import store from "@/redux/store";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  useFonts as useGoogleFonts,
  Kalam_700Bold,
} from "@expo-google-fonts/kalam";
import {
  useFonts as useGoogle2Fonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_100Thin_Italic,
  Poppins_600SemiBold,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CustomToast from "@/components/CustomToast";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [googleFontsLoaded, googleFontError] = useGoogleFonts({
    Kalam_700Bold,
  });

  const [googleFonts2Loaded, googleFont2Error] = useGoogle2Fonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_100Thin_Italic,
    Poppins_600SemiBold,
    Poppins_500Medium,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (
    !loaded ||
    (!googleFontsLoaded && !googleFontError) ||
    (!googleFonts2Loaded && !googleFont2Error)
  ) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ToastProvider
        placement="bottom"
        duration={10000}
        renderToast={(e) => <CustomToast {...e} />}
      >
        <BottomSheetModalProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="auth"
                options={{
                  presentation: "fullScreenModal",
                  headerShadowVisible: false,
                }}
              />
            </Stack>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </ToastProvider>
    </Provider>
  );
}
