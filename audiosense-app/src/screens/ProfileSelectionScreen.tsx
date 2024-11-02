// Importações básicas do React e React Native
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Logotipo Audiosense */}
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
        {/* Título */}
        <Text style={styles.title}>Qual o seu tipo de perfil?</Text>

        {/* Texto descritivo */}
        <Text style={styles.description}>
          Selecione a opção que melhor representa seu papel no aplicativo
        </Text>
      </View>

      {/* Botões de direcionamento */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Sou um visitante"
          onPress={() => alert("Visitante")}
          type="primary"
        ></CustomButton>

        <CustomButton
          title="Sou uma instituição"
          onPress={() => alert("Instituição")}
          type="secondary"
        ></CustomButton>
      </View>
    </View>
  );
};

// Estilos da tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", // Centraliza os elementos verticalmente
    alignItems: "center", // Centraliza os elementos horizontalmente
    paddingTop: 48, // Espaçamento em cima
    paddingRight: 16, // Espaçamento à direita
    paddingBottom: 16, // Espaçamento embaixo
    paddingLeft: 16, // Espaçamento à esquerda
    backgroundColor: "#FAFAF9",
  },

  // Estilo para o logotipo
  logo: {
    width: 160, // Largura da imagem
    height: 96, // Altura da imagem
  },

  // Estilo para o container do logotipo e dos textos
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },

  // Estilo para o título da página
  title: {
    fontSize: 28, // Tamanho da fonte do título
    fontWeight: "bold", // Deixa o título em negrito
    textAlign: "center", // Centraliza o texto horizontalmente
    color: "#141914",
  },

  // Estilo para o texto descritivo abaixo do título
  description: {
    fontSize: 20, // Tamanho da fonte do texto
    color: "#223A1F", // Cor do texto
    textAlign: "center", // Centraliza o texto horizontalmente
  },

  // Estilo para o container dos botões
  buttonContainer: {
    width: "100%", // Faz o container dos botões ocupar toda a largura
    gap: 16,
  },
});

export default LoginScreen;
