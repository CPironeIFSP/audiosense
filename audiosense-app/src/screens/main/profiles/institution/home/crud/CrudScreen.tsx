import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

/**
 * Interface do registro da Obra
 */
interface ObraItem {
  id: string;
  nomeObra: string;
  audioDesc: string;       // caminho/uri do arquivo MP3 obrigatório
  audioDescComum?: string; // caminho/uri do arquivo MP3 opcional
}

const CrudScreen: React.FC = () => {
  // Lista de obras
  const [obras, setObras] = useState<ObraItem[]>([]);
  
  // Estado do formulário
  const [editingId, setEditingId] = useState<string | null>(null); // null => criando novo
  const [nomeObra, setNomeObra] = useState<string>('');
  const [audioDesc, setAudioDesc] = useState<string>('');        // mp3 obrigatório
  const [audioDescComum, setAudioDescComum] = useState<string>(''); // mp3 opcional

  useEffect(() => {
    // Carregar dados iniciais - simulação
    // Em produção, você buscaria de um backend ou storage local
    setObras([
      {
        id: '1',
        nomeObra: 'Obra Inicial',
        audioDesc: '',
        audioDescComum: '',
      },
    ]);
  }, []);

  /**
   * Função para selecionar arquivo mp3 para 'audioDesc' (obrigatório)
   */
  const handleSelectFileObrigatorio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg', // mp3
        copyToCacheDirectory: true,
      });
      if (result.type === 'cancel') {
        console.log('Seleção de arquivo cancelada.');
        return;
      }
      // result.type === 'success'
      const uri = result.uri;
      setAudioDesc(uri);
      Alert.alert('Sucesso', `Arquivo obrigatório selecionado: ${result.name}`);
    } catch (err) {
      console.error('Erro ao selecionar o arquivo obrigatório:', err);
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo obrigatório.');
    }
  };

  /**
   * Função para selecionar arquivo mp3 opcional para 'audioDescComum'
   */
  const handleSelectFileOpcional = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/mpeg', // mp3
        copyToCacheDirectory: true,
      });
      if (result.type === 'cancel') {
        console.log('Seleção de arquivo opcional cancelada.');
        return;
      }
      // result.type === 'success'
      const uri = result.uri;
      setAudioDescComum(uri);
      Alert.alert('Sucesso', `Arquivo opcional selecionado: ${result.name}`);
    } catch (err) {
      console.error('Erro ao selecionar arquivo opcional:', err);
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo opcional.');
    }
  };

  /**
   * Salvar - adiciona nova Obra ou edita uma existente
   */
  const handleSave = () => {
    // Validação:
    if (!nomeObra.trim()) {
      Alert.alert('Erro', 'Por favor, preencha "Nome da Obra".');
      return;
    }
    if (!audioDesc) {
      Alert.alert('Erro', 'Por favor, selecione o arquivo obrigatório (Audiodescrição).');
      return;
    }

    if (editingId === null) {
      // Criar novo
      const newId = Date.now().toString();
      const newObra: ObraItem = {
        id: newId,
        nomeObra: nomeObra.slice(0, 50), // simulação var(50)
        audioDesc,
        audioDescComum: audioDescComum || '', 
      };
      setObras((prev) => [...prev, newObra]);
      Alert.alert('Sucesso', `Nova Obra adicionada: ${newObra.nomeObra}`);
    } else {
      // Editar existente
      setObras((prev) =>
        prev.map((obra) =>
          obra.id === editingId
            ? {
                ...obra,
                nomeObra: nomeObra.slice(0, 50),
                audioDesc,
                audioDescComum: audioDescComum || '',
              }
            : obra
        )
      );
      Alert.alert('Sucesso', `Obra atualizada: ${nomeObra}`);
    }
    // Reset form
    setEditingId(null);
    setNomeObra('');
    setAudioDesc('');
    setAudioDescComum('');
  };

  /**
   * Editar um registro existente
   */
  const handleEdit = (obra: ObraItem) => {
    setEditingId(obra.id);
    setNomeObra(obra.nomeObra);
    setAudioDesc(obra.audioDesc);
    setAudioDescComum(obra.audioDescComum ?? '');
  };

  /**
   * Remover registro
   */
  const handleRemove = (id: string) => {
    Alert.alert('Remover', 'Tem certeza que deseja remover esta Obra?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          setObras((prev) => prev.filter((item) => item.id !== id));
          Alert.alert('Sucesso', 'Obra removida');
        },
      },
    ]);
  };

  /**
   * Visualizar infos (poderia abrir modal, por ex.)
   */
  const handleView = (obra: ObraItem) => {
    const msg = `ID: ${obra.id}\nNome da Obra: ${obra.nomeObra}\n` +
      `Audiodescrição: ${obra.audioDesc}\n` +
      `Audiodescrição Comum: ${obra.audioDescComum ?? 'N/A'}`;
    Alert.alert('Informações da Obra', msg);
  };

  const renderItem = ({ item }: { item: ObraItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nomeObra}</Text>
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.buttonAction, { backgroundColor: '#87CEFA' }]}
          onPress={() => handleView(item)}
        >
          <Text style={styles.buttonText}>VER INFO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonAction, { backgroundColor: '#FFA500' }]}
          onPress={() => handleEdit(item)}
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
      <Text style={styles.title}>Lista de Obras</Text>
      
      {/* FlatList para exibir os registros */}
      <FlatList
        data={obras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ flex: 1 }}
      />

      {/* Formulário para adicionar / editar */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          {editingId ? 'Editar Obra' : 'ADICIONAR NOVA TAG (Obra)'}
        </Text>

        {/* Nome da Obra (string var(50), obrigatório) */}
        <TextInput
          style={styles.input}
          placeholder="Nome da Obra"
          value={nomeObra}
          onChangeText={setNomeObra}
          maxLength={50}
        />

        {/* Audiodescrição (obrigatório) */}
        <TouchableOpacity
          style={styles.fileButton}
          onPress={handleSelectFileObrigatorio}
        >
          <Text style={styles.fileButtonText}>
            {audioDesc ? 'Arquivo Obrigatório Selecionado' : 'Selecionar Audiodescrição'}
          </Text>
        </TouchableOpacity>
        {audioDesc ? <Text style={styles.fileName}>URI: {audioDesc}</Text> : null}

        {/* Audiodescrição Comum (opcional) */}
        <TouchableOpacity
          style={styles.fileButton}
          onPress={handleSelectFileOpcional}
        >
          <Text style={styles.fileButtonText}>
            {audioDescComum ? 'Arquivo Opcional Selecionado' : 'Selecionar Audiodescrição Comum (Opcional)'}
          </Text>
        </TouchableOpacity>
        {audioDescComum ? <Text style={styles.fileName}>URI: {audioDescComum}</Text> : null}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {editingId ? 'Salvar Alterações' : 'Adicionar'}
          </Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: 'bold',
    textAlign: 'center',
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
  formContainer: {
    backgroundColor: '#E8F0FE',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
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
