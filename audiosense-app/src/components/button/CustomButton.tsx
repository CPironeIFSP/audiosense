import React, { useState } from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import styles from "./CustomButtonStyle";

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

export default CustomButton;
