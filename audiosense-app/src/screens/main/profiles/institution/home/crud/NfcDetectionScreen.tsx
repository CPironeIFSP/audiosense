// src/screens/NfcScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

// Somente leitura do ID da tag
const NfcDtectionScreen: React.FC = () => {

  useEffect(() => {
    // Inicializa o NFC Manager
    NfcManager.start()
      .then(() => console.log('NFC Manager iniciado'))
      .catch(err => console.warn('Erro ao iniciar NFC', err));

    // Limpa listeners ao sair da tela
    return () => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    };
  }, []);

  const readTagId = async () => {
    try {
      // Pede acesso à tecnologia NFC (NDEF)
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      // 'tag.id' costuma trazer o ID hex da tag
      if (tag.id) {
        Alert.alert('Tag ID detectado', `ID: ${tag.id}`);
      } else {
        Alert.alert('Tag detectada', JSON.stringify(tag, null, 2));
      }
    } catch (err) {
      console.warn('Erro lendo NFC', err);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leitura NFC (somente ID)</Text>
      <Text style={styles.button} onPress={readTagId}>LER ID NFC</Text>
    </View>
  );
};

export default NfcDtectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  button: {
    backgroundColor: '#1E90FF',
    color: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 16,
  },
});
