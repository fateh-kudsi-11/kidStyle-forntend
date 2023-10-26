import { Tabs } from "expo-router";
import TabBarIcon from "../../components/TabBarIcon";
import { useSelector, useDispatch } from "react-redux";
import { FilteringState } from "@/redux/slices/filteringSlice";
import { useEffect, useCallback } from "react";
import { useLazyGetUserProfileQuery } from "@/redux/apis/userApi";
import { retrieveTokenFromStorage } from "@/utils/storageHelpers";
import { setCredentials } from "@/redux/slices/authSlice";
import { getBackgroundColor } from "@/utils/componentsHelpers";

export default function TabLayout() {
  const filtering = useSelector(
    (state: { filtering: FilteringState }) => state.filtering
  );
  const { gender } = filtering;

  const dispatch = useDispatch();

  const [getUserProfile, { isLoading }] = useLazyGetUserProfileQuery();

  const getUserToken = useCallback(async () => {
    const token = await retrieveTokenFromStorage();
    if (token) {
      const { data } = await getUserProfile();
      dispatch(setCredentials(data));
    }
  }, [retrieveTokenFromStorage, getUserProfile]);

  useEffect(() => {
    getUserToken();
  }, [getUserToken]);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: getBackgroundColor(gender),
        tabBarStyle: { backgroundColor: "#fff", borderTopColor: "#fff" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} kind="Ionicons" />
          ),

          headerShown: false,
          title: "home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="store-search-outline"
              color={color}
              kind="MaterialCommunityIcons"
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="bag"
        options={{
          title: "Bag",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bag" color={color} kind="SimpleLineIcons" />
          ),
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="wishList"
        options={{
          title: "Wish List",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-heart" color={color} kind="Ionicons" />
          ),
          headerShadowVisible: false,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "My Account",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name="account"
              color={color}
              kind="MaterialCommunityIcons"
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
