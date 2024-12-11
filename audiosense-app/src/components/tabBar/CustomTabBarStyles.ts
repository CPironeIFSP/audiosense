import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Tabmenu inferior
  tabBar: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#D7D7D7",
    backgroundColor: "#F9F9F9",
  },

  // Estilo de cada botão na barra
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
  },

  // Estilo para o botão ativo
  activeTab: {
    backgroundColor: "#D0EDD2",
    color: "#193B16",
  },

  // Estilo do texto e ícone das abas
  tabLabel: {
    fontSize: 16,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 24,
    color: "#474E47",
    textAlign: "center",
  },
});

export default styles;
