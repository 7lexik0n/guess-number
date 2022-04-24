import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../constants/colors";

const MainButton = ({ children, style, onPress }) => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.75} onPress={onPress}>
        <View style={{ ...styles.button, ...style }}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 18,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 18,
  },
  buttonContainer: {
    borderRadius: 18,
    overflow: 'hidden'
  }
});

export default MainButton;
