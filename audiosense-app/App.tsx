// App.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import CustomTabBar from "./src/components/tabBar/CustomTabBar";
import AuthScreen from "./src/screens/main/profiles/institution/AuthScreen";
import MuseumScreen from "./src/screens/main/profiles/visitor/MuseumScreen";
import VisitorHomeScreen from "./src/screens/main/profiles/visitor/VisitorHomeScreen";
import ProfileSelection from "./src/screens/main/ProfileSelectionScreen";
import VisionSetupScreen from "./src/screens/VisionSetupScreen";

// Import CRUD screens
import HomeScreen from "./src/screens/main/profiles/institution/home/crud/HomeScreen";
import CreateScreen from "./src/screens/main/profiles/institution/home/crud/CreateScreen";
import UpdateScreen from "./src/screens/main/profiles/institution/home/crud/UpdateScreen";
import DetailsScreen from "./src/screens/main/profiles/institution/home/crud/DetailsScreen";

// Import type
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
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
        {/* Adicionando as telas de CRUD */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Página Inicial" }}
        />
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options={{ title: "Adicionar Novo" }}
        />
        <Stack.Screen
          name="Update"
          component={UpdateScreen}
          options={{ title: "Editar Item" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalhes do Item" }}
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
