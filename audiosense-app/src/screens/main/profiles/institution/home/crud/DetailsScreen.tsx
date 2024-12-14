// screens/DetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../InstitutionNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type DetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

interface Item {
  id: string;
  name: string;
  // outros campos...
}

const DetailsScreen: React.FC = () => {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const { id } = route.params;
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    // Carregar detalhes do item
    // Exemplo:
    // fetchItemById(id).then(data => setItem(data));
    // Placeholder de exemplo:
    setItem({ id, name: `Item ${id}` });
  }, [id]);

  const handleDelete = () => {
    // Lógica para deletar o item
    // Exemplo:
    // deleteItem(id).then(() => {
    //   Alert.alert('Sucesso', 'Item deletado');
    //   navigation.navigate('Home');
    // });
    Alert.alert('Sucesso', 'Item deletado');
    navigation.navigate('Home');
  };

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID: {item.id}</Text>
      <Text style={styles.label}>Nome: {item.name}</Text>
      {/* Outros campos */}
      <Button
        title="Editar"
        onPress={() => navigation.navigate('Crud', { id: item.id })}
      />
      <View style={{ marginTop: 16 }}>
        <Button title="Deletar" onPress={handleDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
});

export default DetailsScreen;
