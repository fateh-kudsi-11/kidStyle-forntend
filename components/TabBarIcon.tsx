import React from "react";
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";

type IconName =
  | React.ComponentProps<typeof FontAwesome>["name"]
  | React.ComponentProps<typeof Entypo>["name"]
  | React.ComponentProps<typeof MaterialIcons>["name"]
  | React.ComponentProps<typeof Ionicons>["name"]
  | React.ComponentProps<typeof MaterialCommunityIcons>["name"]
  | React.ComponentProps<typeof SimpleLineIcons>["name"];

type TabBarIconProps = {
  name: IconName;
  color: string;
  kind:
    | "FontAwesome"
    | "Entypo"
    | "MaterialIcons"
    | "Ionicons"
    | "MaterialCommunityIcons"
    | "SimpleLineIcons";
  size?: number;
};

function TabBarIcon(props: TabBarIconProps) {
  const { name, color, kind, size = 28 } = props;

  switch (kind) {
    case "FontAwesome":
      return (
        <FontAwesome
          size={size}
          style={{ marginBottom: -3 }}
          name={name as React.ComponentProps<typeof FontAwesome>["name"]}
          color={color}
        />
      );
    case "Entypo":
      return (
        <Entypo
          size={size}
          style={{ marginBottom: -3 }}
          name={name as React.ComponentProps<typeof Entypo>["name"]}
          color={color}
        />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          size={size}
          style={{ marginBottom: -3 }}
          name={name as React.ComponentProps<typeof MaterialIcons>["name"]}
          color={color}
        />
      );
    case "Ionicons":
      return (
        <Ionicons
          size={size}
          style={{ marginBottom: -3 }}
          name={name as React.ComponentProps<typeof Ionicons>["name"]}
          color={color}
        />
      );
    case "MaterialCommunityIcons":
      return (
        <MaterialCommunityIcons
          size={size}
          style={{ marginBottom: -3 }}
          name={
            name as React.ComponentProps<typeof MaterialCommunityIcons>["name"]
          }
          color={color}
        />
      );

    case "SimpleLineIcons":
      return (
        <SimpleLineIcons
          size={25}
          style={{ marginBottom: -3 }}
          name={name as React.ComponentProps<typeof SimpleLineIcons>["name"]}
          color={color}
        />
      );

    default:
      throw new Error(`Unsupported kind: ${kind}`);
  }
}

export default TabBarIcon;
