// screens/UpdateScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../InstitutionNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type UpdateScreenRouteProp = RouteProp<RootStackParamList, 'Update'>;
type UpdateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Update'
>;

interface Item {
  id: string;
  name: string;
  // outros campos...
}

const UpdateScreen: React.FC = () => {
  const route = useRoute<UpdateScreenRouteProp>();
  const navigation = useNavigation<UpdateScreenNavigationProp>();
  const { id } = route.params;
  const [name, setName] = useState('');

  useEffect(() => {
    // Carregar dados do item para edição
    // Exemplo:
    // fetchItemById(id).then(data => setName(data.name));
    // Placeholder de exemplo:
    setName(`Item ${id}`);
  }, [id]);

  const handleUpdate = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }
    // Lógica para atualizar o item
    // Exemplo:
    // updateItem(id, { name }).then(() => {
    //   Alert.alert('Sucesso', 'Item atualizado');
    //   navigation.goBack();
    // });
    Alert.alert('Sucesso', 'Item atualizado');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default UpdateScreen;
