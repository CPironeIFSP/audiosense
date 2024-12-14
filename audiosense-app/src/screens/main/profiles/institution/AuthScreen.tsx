// src/screens/main/profiles/institution/AuthScreen.tsx
import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, ActivityIndicator } from "react-native";
import CustomButton from "../../../../components/button/CustomButton";
import CustomInput from "../../../../components/input/CustomInput";
import CommonStyles from "../../../../styles/commonStyle";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "/workspaces/audiosense/audiosense-app/src/types/navigation"; // Ajuste o caminho conforme sua estrutura

type AuthScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AuthScreen"
>;

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

  const handleLogin = async () => {
    // Validação simples
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true); // Inicia o indicador de carregamento

    try {
      // Aqui você deve implementar a lógica real de autenticação,
      // como uma chamada à API para verificar as credenciais.
      // Para este exemplo, vamos simular um login bem-sucedido com um delay.

      console.log("Login com:", { email, password });

      // Simular uma chamada à API com delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Supondo que a autenticação foi bem-sucedida:
      navigation.replace("Home"); // Usa replace para evitar voltar para a tela de login
    } catch (error) {
      // Em caso de erro na autenticação
      Alert.alert("Erro", "Falha ao autenticar. Tente novamente.");
      console.error("Erro de autenticação:", error);
    } finally {
      setLoading(false); // Finaliza o indicador de carregamento
    }
  };

  return (
    <View style={CommonStyles.space_between_container}>
      <View style={CommonStyles.headerContainer}>
        <Text style={CommonStyles.title}>Sou uma instituição</Text>
        <Text style={CommonStyles.description}>
          Faça login com seu e-mail e senha
        </Text>
      </View>

      <View style={styles.content}>
        <View style={CommonStyles.inputGroup}>
          <CustomInput
            label="Email"
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            isPassword
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <View style={CommonStyles.buttonContainer}>
        <CustomButton
          title="Entrar"
          onPress={handleLogin}
          type="primary"
          disabled={loading} // Desabilita o botão durante o carregamento
        />
        {loading && <ActivityIndicator size="small" color="#0000ff" />}
        <CustomButton
          title="Esqueci minha senha"
          onPress={() => Alert.alert("Função não implementada")}
          type="secondary"
        />
      </View>
    </View>
  );
};

// Estilos locais
const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 16,
  },
});

export default AuthScreen;
