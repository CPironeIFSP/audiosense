// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '/workspaces/audiosense/audiosense-app/src/screens/main/profiles/institution/AuthScreen';
import HomeScreen from './crud/HomeScreen';
import CrudScreen from './crud/CrudScreen';
import NfcDetectionScreen from './crud/NfcDetectionScreen'; 
import DetailsScreen from './crud/DetailsScreen';

// Ajuste as rotas:
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  CrudScreen: undefined;
  NfcDetectionScreen: undefined;
  Details: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Página Inicial' }}
        />
        {/* Rota única, substituindo Create e Update */}
        
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Detalhes do Item' }}
        />

        <Stack.Screen
        name="CrudScreen"
        component={CrudScreen}
        options={{ title: 'Lista de Obras' }}
        />

        <Stack.Screen
        name="NfcDetectionScreen"
        component={NfcDetectionScreen}
        options={{ title: 'Adicionar TAG via NFC' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
