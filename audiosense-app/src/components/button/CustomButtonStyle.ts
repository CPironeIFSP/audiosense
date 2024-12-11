import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
    width: "100%",
  },

  primary: {
    backgroundColor: "#193B16", // Cor do botão primário
  },

  secondary: {
    backgroundColor: "transparent", // Cor do botão secundário
    borderWidth: 2,
    borderColor: "#193B16",
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

  buttonPressed: {
    opacity: 0.7,
  },
});

export default styles;
