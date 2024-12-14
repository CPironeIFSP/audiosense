// screens/CreateScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../InstitutionNavigator';
import { useNavigation } from '@react-navigation/native';

type CreateScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Create'
>;

const CreateScreen: React.FC = () => {
  const navigation = useNavigation<CreateScreenNavigationProp>();
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim() === '') {
      Alert.alert('Erro', 'O nome não pode estar vazio.');
      return;
    }
    // Lógica para criar o item (chamada à API ou atualização do estado)
    // Exemplo:
    // createItem({ name }).then(() => {
    //   Alert.alert('Sucesso', 'Item criado com sucesso');
    //   navigation.goBack();
    // });
    Alert.alert('Sucesso', 'Item criado com sucesso');
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
      <Button title="Salvar" onPress={handleCreate} />
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

export default CreateScreen;
