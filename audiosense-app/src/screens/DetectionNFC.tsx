import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../components/button/CustomButton";
import GradientCircle from "../components/gradient circle/GradientCircle";
import CommonStyles from "../styles/commonStyle";

const DetectionNFC: React.FC = () => {
  const [nfcDetected, setNfcDetected] = useState(false); // Estado para verificar se o NFC foi detectado
  const [detectedWork, setDetectedWork] = useState("Nome da Obra"); // Nome da obra detectada

  const handleNfcDetection = () => {
    setNfcDetected(true);
  };

  const resetDetection = () => {
    setNfcDetected(false);
  };

  return (
    <View style={CommonStyles.container}>
      <View style={styles.content}>
        {!nfcDetected ? (
          <>
            <GradientCircle />
            <Text style={CommonStyles.subtitle}>
              Aproxime o celular da TAG da obra
            </Text>
            {/* Simula a detecção do NFC (botão apenas para testes) */}
            <CustomButton
              title="Detectar NFC (Teste)"
              onPress={handleNfcDetection}
              type="primary"
            />
          </>
        ) : (
          <>
            <MaterialIcons
              name="check-circle"
              size={96}
              color="#2A9924"
              style={styles.icon}
            />
            <Text style={CommonStyles.subtitle}>
              A obra "{detectedWork}" foi detectada.{"\n"}Deseja ouvir a
              descrição?
            </Text>
          </>
        )}
      </View>
      {nfcDetected && (
        <View style={CommonStyles.buttonContainer}>
          <CustomButton
            title="Sim, ouvir agora"
            onPress={() => alert("Ouvir")}
            type="primary"
            style={{ width: "100%" }}
          />
          <CustomButton
            title="Reiniciar Leitura"
            onPress={resetDetection}
            type="secondary"
            style={{ width: "100%" }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center", // Centraliza horizontalmente
    justifyContent: "center", // Centraliza verticalmente
  },
  icon: {
    marginBottom: 16,
  },
});

export default DetectionNFC;
