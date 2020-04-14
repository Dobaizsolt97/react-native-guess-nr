import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";

import NumberContainer from "../components/numberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNr, setSelectedNr] = useState();

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber < 1) {
      Alert.alert("Invalid number!", "Number has to be between 0 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNr(parseInt(enteredValue));
    setEnteredValue("");
    Keyboard.dismiss();
  };
  let ConfirmedOutput;

  if (confirmed) {
    ConfirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text>You selected </Text>
        <NumberContainer>{selectedNr}</NumberContainer>
        <Button
          onPress={() => props.onStartGame(selectedNr)}
          title="START GAME"
        ></Button>
      </Card>
    );
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            onChangeText={numberInputHandler}
            style={styles.input}
            autoCorrect={false}
            keyboardType={"number-pad"}
            maxLength={2}
            blurOnSubmit
            autoCapitalize="none"
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                onPress={resetInputHandler}
                color={Colors.secondary}
                title="Reset"
              />
            </View>
            <View style={Colors.primary}>
              <Button
                color={Colors.primary}
                title="Confirm"
                onPress={confirmInputHandler}
              />
            </View>
          </View>
        </Card>
        {ConfirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  button: {
    width: 90,
  },
  input: {
    width: 100,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGameScreen;
