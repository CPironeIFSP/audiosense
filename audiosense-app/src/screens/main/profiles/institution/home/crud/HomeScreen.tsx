// screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../InstitutionNavigator';
import { useNavigation } from '@react-navigation/native';

// Definição do tipo de navegação para HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Item {
  id: string;
  name: string;
  // outros campos...
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    // Carregar itens da API ou armazenamento local
    // Exemplo:
    // fetchItems().then(data => setItems(data));
    // Placeholder de exemplo:
    setItems([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ]);
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { id: item.id })}
    >
      <View style={styles.itemContainer}>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Button
        title="Adicionar Novo"
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default HomeScreen;
