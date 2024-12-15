// App.tsx (exemplo final ajustado)

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

//Teste de Commit
// Se você tem a tela Home (que lista registros), CRUD unificada e Details:
import HomeScreen from "./src/screens/main/profiles/institution/home/crud/HomeScreen";
import CrudScreen from "./src/screens/main/profiles/institution/home/crud/CrudScreen";
import DetailsScreen from "./src/screens/main/profiles/institution/home/crud/DetailsScreen";
import NfcDetectionScreen from "./src/screens/main/profiles/institution/home/crud/NfcDetectionScreen";

import { RootStackParamList } from "./src/types/navigation"; // Ajuste conforme seu projeto

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<"VisionSetup" | "ProfileSelection">();

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

        {/* ROTAS CRUD */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Página Inicial" }}
        />

        {/* Rota unificada: "Crud" para Adicionar Novo ou Editar */}
        <Stack.Screen
          name="CrudScreen"
          component={CrudScreen}
          options={{ title: "Adicionar ou Editar" }}
        />
        <Stack.Screen
          name="NfcDetectionScreen"
          component={NfcDetectionScreen}
          options={{ title: 'Adicionar TAG via NFC' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Detalhes da Tag" }}
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
