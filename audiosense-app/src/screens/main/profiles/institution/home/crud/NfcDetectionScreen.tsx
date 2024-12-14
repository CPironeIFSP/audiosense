// src/screens/main/profiles/institution/home/crud/NfcDetectionScreen.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CommonStyles from '/workspaces/audiosense/audiosense-app/src/styles/commonStyle';
import * as DocumentPicker from 'expo-document-picker';

// COMPONENTES CUSTOM
import CustomButton from '/workspaces/audiosense/audiosense-app/src/components/button/CustomButton';
// Se quiser um ícone, ex: MaterialIcons
import { MaterialIcons } from '@expo/vector-icons';

/**
 * Exemplo de gradient circle - adaptado ou substitua
 */
// import GradientCircle from './GradientCircle'; // se tiver esse comp

const NfcDetectionScreen: React.FC = () => {
  const [nfcDetected, setNfcDetected] = useState(false);
  const [detectedTagId, setDetectedTagId] = useState<string>('');

  // Campos do formulário
  const [nomeObra, setNomeObra] = useState('');
  const [audioDesc, setAudioDesc] = useState('');         // mp3 obrigatório
  const [audioDescComum, setAudioDescComum] = useState(''); // mp3 opcional

  /**
   * handleNfcDetection simula a leitura NFC e define o ID da tag
   */
  const handleNfcDetection = () => {
    // Em produção, a leitura NFC real viria de uma lib nativa (react-native-nfc-manager).
    // Aqui simulamos:
    const simulatedTagId = Math.floor(Math.random() * 100000).toString();
    setDetectedTagId(simulatedTagId);
    setNfcDetected(true);
    Alert.alert('NFC Detectado', `TAG ID: ${simulatedTagId}`);
  };

  /**
   * Reinicia a leitura NFC
   */
  const resetDetection = () => {
    setNfcDetected(false);
    setDetectedTagId('');
    setNomeObra('');
    setAudioDesc('');
    setAudioDescComum('');
  };

  /**
   * Selecionar arquivo mp3 obrigatório
   */
  const handleSelectAudioDesc = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg',
        copyToCacheDirectory: true,
      });
      if (result.type === 'cancel') {
        console.log('Seleção cancelada.');
        return;
      }
      setAudioDesc(result.uri);
      Alert.alert('Sucesso', `Arquivo obrigatório selecionado: ${result.name}`);
    } catch (err) {
      console.error('Erro ao selecionar arquivo obrigatório:', err);
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo obrigatório.');
    }
  };

  /**
   * Selecionar arquivo mp3 opcional
   */
  const handleSelectAudioDescComum = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg',
        copyToCacheDirectory: true,
      });
      if (result.type === 'cancel') {
        console.log('Seleção opcional cancelada.');
        return;
      }
      setAudioDescComum(result.uri);
      Alert.alert('Sucesso', `Arquivo opcional selecionado: ${result.name}`);
    } catch (err) {
      console.error('Erro ao selecionar arquivo opcional:', err);
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo opcional.');
    }
  };

  /**
   * Cadastrar
   */
  const handleCadastrar = () => {
    if (!detectedTagId) {
      Alert.alert('Erro', 'Nenhuma TAG foi detectada ainda.');
      return;
    }
    if (!nomeObra.trim()) {
      Alert.alert('Erro', 'Por favor, preencha "Nome da Obra".');
      return;
    }
    if (!audioDesc) {
      Alert.alert('Erro', 'Selecione a Audiodescrição obrigatória (mp3).');
      return;
    }

    // Em produção, enviaria para backend. Aqui, só um alert:
    Alert.alert('Sucesso', `Cadastro concluído.\nTAG ID: ${detectedTagId}\nNome: ${nomeObra}`);
    // Reset se quiser
    resetDetection();
  };

  return (
    <View style={CommonStyles.space_between_container}>
      <View style={styles.content}>
        {!nfcDetected ? (
          <>
            {/* Se tiver um GradientCircle, use-o aqui */}
            {/* <GradientCircle /> */}
            <Text style={styles.subtitle}>
              Aproxime o celular da TAG da obra
            </Text>

            {/* Botão de teste para simular NFC */}
            <CustomButton
              title="Detectar NFC (Teste)"
              onPress={handleNfcDetection}
              type="primary"
            />
          </>
        ) : (
          <>
            <MaterialIcons
              name="check-circle"
              size={96}
              color="#2A9924"
              style={styles.icon}
            />
            <Text style={[styles.subtitle, { fontSize: 20 }]}>
              TAG ID: <Text style={{ fontWeight: 'bold' }}>{detectedTagId}</Text>
            </Text>
            <Text style={[styles.subtitle]}>
              Preencha os dados para cadastrar a obra nessa TAG
            </Text>

            {/* Formulário de cadastro */}
            <View style={styles.formContainer}>
              {/* ID da TAG, read-only */}
              <Text style={styles.label}>ID da TAG</Text>
              <View style={styles.readOnlyField}>
                <Text>{detectedTagId}</Text>
              </View>

              {/* Nome da Obra */}
              <Text style={styles.label}>Nome da Obra</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome da Obra (var 50)"
                value={nomeObra}
                onChangeText={setNomeObra}
                maxLength={50}
              />

              {/* Audiodescrição (mp3, obrigatório) */}
              <TouchableOpacity style={styles.fileButton} onPress={handleSelectAudioDesc}>
                <Text style={styles.fileButtonText}>
                  {audioDesc ? 'Arquivo Obrigatório Selecionado' : 'Selecionar Audiodescrição (obrigatório)'}
                </Text>
              </TouchableOpacity>
              {audioDesc ? <Text style={styles.fileName}>URI: {audioDesc}</Text> : null}

              {/* Audiodescrição Comum (mp3, opcional) */}
              <TouchableOpacity style={styles.fileButton} onPress={handleSelectAudioDescComum}>
                <Text style={styles.fileButtonText}>
                  {audioDescComum ? 'Arquivo Opcional Selecionado' : 'Selecionar Audiodescrição Comum (opcional)'}
                </Text>
              </TouchableOpacity>
              {audioDescComum ? <Text style={styles.fileName}>URI: {audioDescComum}</Text> : null}

              {/* Botão Cadastrar */}
              <TouchableOpacity style={styles.saveButton} onPress={handleCadastrar}>
                <Text style={styles.saveButtonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {nfcDetected && (
        <View style={CommonStyles.buttonContainer}>
          <CustomButton
            title="Reiniciar Leitura"
            onPress={resetDetection}
            type="secondary"
            style={{ width: "100%" }}
          />
        </View>
      )}
    </View>
  );
};

export default NfcDetectionScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 16,
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#E8F0FE',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  readOnlyField: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  fileButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  fileButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  fileName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
