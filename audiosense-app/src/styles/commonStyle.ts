import { StyleSheet } from "react-native";

const CommonStyles = StyleSheet.create({
  // Estilos do container de conteúdo
  space_between_container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
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
    fontSize: 26,
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
    gap: 10,
  },

  // Estilo para grupo de inputs verticais
  inputGroup: {
    flexDirection: "column",
    gap: 18,
    fontSize: 10,
  },
});

export default CommonStyles;
