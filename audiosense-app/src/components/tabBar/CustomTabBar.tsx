import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./CustomTabBarStyles";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        // Definição do ícone para cada página (aba)
        const getIconName = (routeName: string) => {
          switch (routeName) {
            case "VisitorHome":
              return "contactless";
            case "MuseumScreen":
              return "account-balance";
            case "AdministratorScreen":
              return "house";
            case "IncludeTagScreen":
              return "new-label";
            default:
              return "circle";
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={[styles.tabButton, isFocused ? styles.activeTab : null]}
          >
            <MaterialIcons
              name={getIconName(route.name)}
              size={24}
              color={isFocused ? "#193B16" : "#474E47"}
            />
            <Text
              style={[styles.tabLabel, isFocused ? styles.activeTab : null]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
