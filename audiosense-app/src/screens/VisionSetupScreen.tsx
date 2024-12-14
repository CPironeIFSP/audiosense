import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../components/button/CustomButton";
import CommonStyles from "../styles/commonStyle";

const VisionSetupScreen: React.FC = ({ navigation }: any) => {
  const handleSelection = async (visionType: string) => {
    try {
      await AsyncStorage.setItem("userVision", visionType);
      await AsyncStorage.setItem("hasSeenVisionSetup", "true");

      navigation.replace("ProfileSelection");
    } catch (error) {
      console.error("Erro ao salvar visão:", error);
    }
  };

  return (
    <View style={CommonStyles.space_between_container}>
      <Text style={CommonStyles.title}>Como você definiria sua visão?</Text>
      <View style={CommonStyles.buttonContainer}>
        <CustomButton
          title="Sou cego"
          type="secondary"
          onPress={() => handleSelection("blind")}
        />
        <CustomButton
          title="Tenho baixa visão"
          type="secondary"
          onPress={() => handleSelection("low_vision")}
        />
        <CustomButton
          title="Enxergo normalmente"
          type="secondary"
          onPress={() => handleSelection("normal")}
        />
      </View>
    </View>
  );
};

export default VisionSetupScreen;
