import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import NumberContainer from "../components/numberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const randNum = Math.floor(Math.random() * (max - min)) + min;
  if (randNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randNum;
  }
};

const GameScreen = (props) => {
  const [currGuess, setCurrGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const currLow = useRef(1);
  const currHigh = useRef(100);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currGuess < props.userChoice) ||
      (direction === "higher" && currGuess > props.userChoice)
    ) {
      Alert.alert("Incorrect", "Do not give false advice", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currHigh.current = currGuess;
    } else {
      currLow.current = currGuess;
    }
    const nextNr = generateRandomBetween(
      currLow.current,
      currHigh.current,
      currGuess
    );
    setCurrGuess(nextNr);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button
          onPress={nextGuessHandler.bind(this, "lower")}
          title="LOWER"
        ></Button>
        <Button
          onPress={nextGuessHandler.bind(this, "higher")}
          title="HIGHER"
        ></Button>
      </Card>
    </View>
  );
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
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
