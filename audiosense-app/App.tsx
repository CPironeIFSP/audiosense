import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CustomTabBar from "./src/components/tabBar/CustomTabBar";
import AuthScreen from "./src/screens/AuthScreen";
import ProfileSelection from "./src/screens/ProfileSelectionScreen";
import VisitorHomeScreen from "./src/screens/VisitorHomeScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProfileSelection">
        {/* Tela de seleção de perfil */}
        <Stack.Screen
          name="ProfileSelection"
          component={ProfileSelection}
          options={{ headerShown: false }}
        />
        {/* Tela de abas do visitante */}
        <Stack.Screen
          name="VisitorTabs"
          component={VisitorTabs}
          options={{ headerShown: false }}
        />
        {/* Tela de abas do visitante */}
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function VisitorTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      {/* Aba "Início", onde é feita a leitura da tag NFC */}
      <Tab.Screen
        name="VisitorHome"
        component={VisitorHomeScreen}
        options={{ title: "Início", headerShown: false }}
      />
    </Tab.Navigator>
  );
}
