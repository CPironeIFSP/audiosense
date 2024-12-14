// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '/workspaces/audiosense/audiosense-app/src/screens/main/profiles/institution/AuthScreen'; // Ajuste o caminho conforme sua estrutura
import HomeScreen from './crud/HomeScreen';
import CreateScreen from './crud/CreateScreen';
import UpdateScreen from './crud/UpdateScreen';
import DetailsScreen from './crud/DetailsScreen';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Create: undefined;
  Update: { id: string };
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
          options={{ headerShown: false }} // Opcional: Esconde o cabeçalho na tela de autenticação
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Página Inicial' }} 
        />
        <Stack.Screen 
          name="Create" 
          component={CreateScreen} 
          options={{ title: 'Adicionar Novo' }} 
        />
        <Stack.Screen 
          name="Update" 
          component={UpdateScreen} 
          options={{ title: 'Editar Item' }} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{ title: 'Detalhes do Item' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;