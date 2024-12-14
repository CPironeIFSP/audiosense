import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  // Remova o import de Button, se existir
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../InstitutionNavigator';
import { useNavigation } from '@react-navigation/native';
import CommonStyles from "/workspaces/audiosense/audiosense-app/src/styles/commonStyle";

// Tipo de navegação
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Item {
  id: string;
  name: string;
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={CommonStyles.headerContainer}>
        <Image
          source={require("/workspaces/audiosense/audiosense-app/assets/images/audiosense_icon.png")}
          style={styles.logo}
        />
        <Text style={CommonStyles.title}>Bem-vindo, Instituição X</Text>
      </View>

      {/* Espaço livre para lista ou outros conteúdos */}
      <View style={{ flex: 1 }} />

      {/* Botão VISUALIZAR TAGS próximo ao rodapé */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => navigation.navigate("Crud", { isNew: false, id: "1" })}
        >
          <Text style={styles.buttonText}>VISUALIZAR TAGS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  logo: {
    height: 120,
    width: "100%",
    resizeMode: "contain",
  },
  // FOOTER Container para posicionar o botão próximo ao rodapé
  footerContainer: {
    marginBottom: 20, // Ajuste como preferir
    // Se quiser colar no rodapé mesmo, pode usar position absolute:
    // position: 'absolute', bottom: 20, left: 20, right: 20
  },
  bigButton: {
    backgroundColor: '#1E90FF',
    height: 60, // Aumentando altura do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
