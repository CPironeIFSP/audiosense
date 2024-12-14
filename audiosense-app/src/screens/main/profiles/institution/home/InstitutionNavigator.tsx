// InstitutionNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '.src/screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import UpdateScreen from 'audiosense-app/src/screens/main/profiles/institution/home/crud/UpdateScreen';
import DetailsScreen from './screens/main/profiles/institution/home/crud/DetailsScreen';

// Definição dos parâmetros das rotas para TypeScript
export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Update: { id: string };
  Details: { id: string };
};

// Criação do stack navigator utilizando createNativeStackNavigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const InstitutionNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
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

export default InstitutionNavigator;
