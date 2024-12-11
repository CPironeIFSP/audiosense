import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#141914",
    marginBottom: 8,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#141914",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2B312A",
  },
  inputError: {
    borderColor: "#FF4D4D",
  },
  icon: {
    marginLeft: 8,
  },
  errorText: {
    marginTop: 4,
    color: "#FF4D4D",
    fontSize: 14,
  },
});

export default styles;
