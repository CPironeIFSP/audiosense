// src/screens/main/profiles/institution/home/crud/CrudScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//Ajuste o import do RootStackParamList conforme seu projeto
import { RootStackParamList } from '/workspaces/audiosense/audiosense-app/src/types/navigation';

type CrudScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'CrudScreen'>;

interface ObraItem {
  id: string;
  nomeObra: string;
  audioDesc: string;       // mp3 obrigatória
  audioDescComum?: string; // mp3 opcional
}

const CrudScreen: React.FC = () => {
  const navigation = useNavigation<CrudScreenNavProp>();
  const [obras, setObras] = useState<ObraItem[]>([]);

  useEffect(() => {
    // Carregar lista de obras/tags da API ou local
    // Por enquanto, simulação:
    setObras([
      { id: '1', nomeObra: 'Obra 1', audioDesc: '', audioDescComum: '' },
      { id: '2', nomeObra: 'Obra 2', audioDesc: '', audioDescComum: '' },
    ]);
  }, []);

  const handleRemove = (id: string) => {
    Alert.alert('Remover', 'Deseja remover esta Obra?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          setObras((prev) => prev.filter((o) => o.id !== id));
          Alert.alert('Sucesso', 'Obra removida.');
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: ObraItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nomeObra}</Text>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.buttonAction, { backgroundColor: '#87CEFA' }]}
          onPress={() => Alert.alert('Informações', JSON.stringify(item, null, 2))}
        >
          <Text style={styles.buttonText}>VER INFO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonAction, { backgroundColor: '#FFA500' }]}
          onPress={() => Alert.alert('Editar não implementado aqui', 'Use NFC Flow.')}
        >
          <Text style={styles.buttonText}>EDITAR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonAction, { backgroundColor: '#FF4500' }]}
          onPress={() => handleRemove(item.id)}
        >
          <Text style={styles.buttonText}>REMOVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Obras Cadastradas</Text>

      <FlatList
        data={obras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ flex: 1 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NfcDetectionScreen')}
      >
        <Text style={styles.addButtonText}>ADICIONAR TAG</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrudScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemContainer: {
    backgroundColor: '#F8F8F8',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonAction: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
