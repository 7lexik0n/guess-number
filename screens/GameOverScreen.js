import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOverSreen = ({ rounds, userNumber, onRestart }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const content = (
    <View style={styles.screen}>
      <TitleText>The Game is Over</TitleText>
      <Image
        source={require("../assets/success.png")}
        style={{
          width: deviceWidth > 350 ? "55%" : "30%",
          height: deviceHeight > 500 ? 250 : 150,
        }}
        resizeMode="contain"
      />
      <View style={styles.resultContainer}>
        <BodyText
          style={{ fontSize: deviceHeight < 500 ? 16 : 20, ...styles.text }}
        >
          Your phone nedeed <Text style={styles.highlight}>{rounds}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>NEW GAME</MainButton>
    </View>
  );
  return deviceHeight > 500 ? content : <ScrollView>{content}</ScrollView>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "open-sans-bold",
  },
  text: {
    textAlign: "center",
  },
  resultContainer: {
    marginHorizontal: 30,
    marginBottom: 20,
  },
});

export default GameOverSreen;
