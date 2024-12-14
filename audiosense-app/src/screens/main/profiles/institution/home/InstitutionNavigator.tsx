// src/navigation/AppNavigator.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from '/workspaces/audiosense/audiosense-app/src/screens/main/profiles/institution/AuthScreen';
import HomeScreen from './crud/HomeScreen';
import CrudScreen from './crud/CrudScreen'; // <-- A tela unificada
import DetailsScreen from './crud/DetailsScreen';

// Ajuste as rotas:
export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
  Crud: { isNew?: boolean; id?: string }; // Rota unificada
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
          name="Crud"
          component={CrudScreen}
          options={{ title: 'Adicionar ou Editar Obra' }}
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
