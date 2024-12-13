import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/button/CustomButton";
import CommonStyles from "../../styles/commonStyle";

const ProfileSelection = ({ navigation }: any) => {
  return (
    <View style={CommonStyles.container}>
      <View style={CommonStyles.headerContainer}>
        <Image
          source={require("../../assets/images/audiosense_icon.png")}
          style={styles.logo}
        />
        <Text style={CommonStyles.title}>Qual o seu tipo de perfil?</Text>
        <Text style={CommonStyles.description}>
          Selecione a opção que melhor representa seu papel no aplicativo
        </Text>
      </View>

      <View style={CommonStyles.buttonContainer}>
        <CustomButton
          title="Sou um visitante"
          onPress={() => navigation.navigate("VisitorTabs")}
          type="primary"
        />
        <CustomButton
          title="Sou uma instituição"
          onPress={() => navigation.navigate("AuthScreen")}
          type="secondary"
        />
      </View>
    </View>
  );
};

// Estilos locais
const styles = StyleSheet.create({
  logo: {
    width: 96,
    height: 96,
  },
});

export default ProfileSelection;
