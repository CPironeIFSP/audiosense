// src/components/button/CustomButtonStyle.ts
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
  },
  primary: {
    backgroundColor: "#193B16",
  },
  secondary: {
    backgroundColor: "transparent", // Cor do botão secundário
    borderWidth: 2,
    borderColor: "#193B16",
  },
  buttonPressed: {
    opacity: 0.8,
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#f9f9f9",
    fontSize: 20,
    fontWeight: "normal",
  },
  secondaryText: {
    color: "#2B312A",
    fontSize: 20,
    fontWeight: "normal",
  },
  disabledText: {
    color: "#696969",
  },
});

export default styles;
