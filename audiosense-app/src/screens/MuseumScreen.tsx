import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CommonStyles from "../styles/commonStyle";

const MuseumScreen: React.FC = () => {
  return (
    <View style={CommonStyles.space_between_container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://www.melhoresdestinos.com.br/wp-content/uploads/2024/02/museu-do-ipiranga-sp-capa.jpeg",
          }}
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Museu do Ipiranga</Text>
          <View style={styles.accessibilityTag}>
            <Text style={styles.accessibilityText}>1 Obra acessível</Text>
          </View>
          <Text style={styles.location}>São Paulo, SP</Text>
        </View>
        <MaterialIcons
          name="location-on"
          size={24}
          color="#4CAF50"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#141914",
  },
  accessibilityTag: {
    marginTop: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ECF7EC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#A5D6A7",
    alignSelf: "flex-start",
  },
  accessibilityText: {
    fontSize: 14,
    color: "#388E3C",
  },
  location: {
    marginTop: 8,
    fontSize: 14,
    color: "#757575",
  },
  icon: {
    marginLeft: 16,
  },
});

export default MuseumScreen;
