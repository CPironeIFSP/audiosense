import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/button/CustomButton";
import CustomInput from "../components/input/CustomInput";
import CommonStyles from "../styles/commonStyle";

const AuthScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de login
    console.log("Login com:", { email, password });
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
          />

          <CustomInput
            label="Senha"
            placeholder="Digite sua senha"
            isPassword
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View style={CommonStyles.buttonContainer}>
        <CustomButton
          title="Entrar"
          onPress={() => alert(handleLogin())}
          type="primary"
        />
        <CustomButton
          title="Esqueci minha senha"
          onPress={() => alert("teste")}
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
