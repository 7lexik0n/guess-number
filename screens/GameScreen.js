import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import { FontAwesome } from "@expo/vector-icons";
import ListItem from "../components/ListItem";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }

  return rndNum;
};

const GameSreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

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

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess <= userChoice) ||
      (direction === "greater" && currentGuess >= userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that it is wrong...", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);

      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setPastGuesses([nextNumber.toString(), ...pastGuesses]);
  };

  if (deviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <FontAwesome name="angle-double-down" size={24} color="#fff" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={() => nextGuessHandler("greater")}>
            <FontAwesome name="angle-double-up" size={24} color="#fff" />
          </MainButton>
        </View>
        <View
          style={{
            width: deviceWidth > 350 ? "60%" : "80%",
            ...styles.listContainer,
          }}
        >
          <FlatList
            contentContainerStyle={styles.list}
            data={pastGuesses}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <ListItem
                value={item}
                numberOfRound={pastGuesses.length - index}
              />
            )}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card
          style={{
            marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
            ...styles.buttonContainer,
          }}
        >
          <MainButton onPress={() => nextGuessHandler("lower")}>
            <FontAwesome name="angle-double-down" size={24} color="#fff" />
          </MainButton>
          <MainButton onPress={() => nextGuessHandler("greater")}>
            <FontAwesome name="angle-double-up" size={24} color="#fff" />
          </MainButton>
        </Card>
        <View
          style={{
            width: deviceWidth > 350 ? "60%" : "80%",
            ...styles.listContainer,
          }}
        >
          <FlatList
            contentContainerStyle={styles.list}
            data={pastGuesses}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <ListItem
                value={item}
                numberOfRound={pastGuesses.length - index}
              />
            )}
          />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    maxWidth: "90%",
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingTop: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    alignItems: "center",
  },
});

export default GameSreen;
