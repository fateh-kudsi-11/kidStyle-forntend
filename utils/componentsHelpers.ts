import Colors from "@/constants/Colors";

export const getBackgroundColor = (gender: string) => {
  return gender === "boys"
    ? Colors.light.boysPrimary
    : Colors.light.girlsPrimary;
};
