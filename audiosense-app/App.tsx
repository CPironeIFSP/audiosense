import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import CustomTabBar from "./src/components/tabBar/CustomTabBar";
import AuthScreen from "./src/screens/AuthScreen";
import MuseumScreen from "./src/screens/MuseumScreen";
import ProfileSelection from "./src/screens/ProfileSelectionScreen";
import VisionSetupScreen from "./src/screens/VisionSetupScreen";
import VisitorHomeScreen from "./src/screens/VisitorHomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<
    "VisionSetup" | "ProfileSelection"
  >();

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasSeenSetup = await AsyncStorage.getItem("hasSeenVisionSetup");
      setInitialRoute(hasSeenSetup ? "ProfileSelection" : "VisionSetup");
    };
    checkFirstTime();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="VisionSetup"
          component={VisionSetupScreen}
          options={{ title: "Configuração Inicial", headerShown: true }}
        />
        <Stack.Screen
          name="ProfileSelection"
          component={ProfileSelection}
          options={{ title: "Olá! Bem-vindo ao AudioSense" }}
        />
        <Stack.Screen
          name="VisitorTabs"
          component={VisitorTabs}
          options={{ title: "Início" }}
        />
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ title: "Entrar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function VisitorTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="VisitorHome"
        component={VisitorHomeScreen}
        options={{ title: "Início", headerShown: false }}
      />
      <Tab.Screen
        name="MuseumScreen"
        component={MuseumScreen}
        options={{ title: "Instituições Parceiras", headerShown: false }}
      />
    </Tab.Navigator>
  );
}
