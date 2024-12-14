// src/components/button/CustomButton.tsx
import React, { useState } from "react";
import { Text, TouchableOpacity, ViewStyle, GestureResponderEvent, StyleSheet } from "react-native";
import styles from "./CustomButtonStyle";

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void | Promise<void>;
  type?: "primary" | "secondary"; // Define o tipo de botão
  style?: ViewStyle; // Permite passar estilos adicionais
  disabled?: boolean; // Adiciona a propriedade 'disabled' como opcional
}
const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  type = "primary",
  style,
  disabled = false, // Define o padrão como false
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonStyles = [
    styles.button,
    styles[type],
    isPressed && styles.buttonPressed, // Adiciona estilo de pressionado
    disabled && styles.disabledButton, // Adiciona estilo de desabilitado
    style,
  ];

  const textStyle =
    type === "secondary"
      ? [styles.secondaryText, disabled && styles.disabledText] // Adiciona estilo de texto desabilitado
      : [styles.buttonText, disabled && styles.disabledText];

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={buttonStyles}
      disabled={disabled} // Desabilita a interação se 'disabled' for true
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
