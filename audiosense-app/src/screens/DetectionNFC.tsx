import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../components/button/CustomButton";
import GradientCircle from "../components/gradient circle/GradientCircle";
import CommonStyles from "../styles/commonStyle";

const DetectionNFC: React.FC = () => {
  const [nfcDetected, setNfcDetected] = useState(false);
  const [detectedWork, setDetectedWork] = useState("Nome da Obra");

  const handleNfcDetection = () => {
    setNfcDetected(true);
  };

  const resetDetection = () => {
    setNfcDetected(false);
  };

  return (
    <View style={CommonStyles.space_between_container}>
      <View style={styles.content}>
        {!nfcDetected ? (
          <>
            <GradientCircle />
            <Text style={CommonStyles.subtitle}>
              Aproxime o celular da TAG da obra
            </Text>
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
            <Text style={{ fontWeight: "normal", fontSize: 22 }}>
              A obra{" "}
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                {detectedWork}
              </Text>{" "}
              foi detectada.{"\n"}Deseja ouvir a descrição?
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
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 16,
  },
});

export default DetectionNFC;
