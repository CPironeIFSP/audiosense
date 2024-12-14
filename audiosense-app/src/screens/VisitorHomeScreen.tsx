import React, { useState } from "react";
import { Text, View } from "react-native";
import CommonStyles from "../styles/commonStyle";
import DetectionNFC from "./DetectionNFC";

const VisitorHomeScreen: React.FC = () => {
  const [hasNFC] = useState(true); // Simula se o dispositivo possui NFC
  const [isNfcEnabled] = useState(true); // Simula se o NFC está ativado

  if (!hasNFC) {
    return (
      <View style={CommonStyles.center_container}>
        <Text style={CommonStyles.subtitle}>
          Este dispositivo não possui suporte para NFC.
        </Text>
      </View>
    );
  }

  if (!isNfcEnabled) {
    return (
      <View style={CommonStyles.center_container}>
        <Text style={CommonStyles.subtitle}>
          O NFC está desativado. Por favor, ative-o nas configurações do
          dispositivo.
        </Text>
      </View>
    );
  }

  return <DetectionNFC />;
};

export default VisitorHomeScreen;
