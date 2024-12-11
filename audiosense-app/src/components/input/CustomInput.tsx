import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./CustomInputStyle";

interface CustomInputProps extends TextInputProps {
  label?: string; // Rótulo opcional
  error?: string; // Mensagem de erro opcional
  isPassword?: boolean; // Indica se o campo é de senha
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  error,
  isPassword,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholderTextColor="#5F625E"
          secureTextEntry={isPassword ? secureTextEntry : false}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            <MaterialIcons
              name={secureTextEntry ? "visibility-off" : "visibility"}
              size={24}
              color="#5F625E"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;
