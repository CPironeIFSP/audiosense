import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  // Estilos do container de conteúdo
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 48,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    backgroundColor: "#FAFAF9",
  },

  // Estilo para o container do logotipo e dos textos
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
  },

  // Títulos
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#141914",
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#141914",
  },

  // Descrições e parágrafos
  description: {
    fontSize: 20,
    color: "#223A1F",
    textAlign: "center",
  },

  // Estilo para o container dos botões
  buttonContainer: {
    width: "100%",
    gap: 16,
  },

  // Estilo para grupo de inputs verticais
  inputGroup: {
    flexDirection: "column",
    gap: 16,
  },

  title1: {
    fontSize: 28, // Fonte maior para títulos
    fontWeight: '600',
    color: '#000', // Cor com alto contraste
    lineHeight: 36, // Aumentar espaçamento entre linhas
    letterSpacing: 1, // Melhorar leitura
  },
  bodyText1: {
    fontSize: 18, // Fonte ideal para textos principais
    fontWeight: '400',
    color: '#333333', // Texto escuro sobre fundo claro
    lineHeight: 27, // Espaçamento para leitura confortável
  },
});

export default CommonStyles;
