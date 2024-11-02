import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  type?: "primary" | "secondary"; // Define o tipo de botão
  style?: ViewStyle; // Permite passar estilos adicionais
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = "primary",
  style,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const buttonStyles = [
    styles.button,
    styles[type],
    isPressed && styles.buttonPressed, // Adiciona estilo de pressionado
    style,
  ];
  const textStyle =
    type === "secondary" ? styles.secondaryText : styles.buttonText;

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={buttonStyles}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: "center",
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
    fontWeight: "regular",
  },

  secondaryText: {
    color: "#2B312A",
    fontSize: 20,
    fontWeight: "regular",
  },

  buttonPressed: {
    opacity: 0.7,
  },
});

export default CustomButton;
