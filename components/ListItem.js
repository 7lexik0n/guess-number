import React from "react";
import { View, StyleSheet } from "react-native";
import BodyText from "./BodyText";

const ListItem = ({ value, numberOfRound }) => {
  return (
    <View key={value} style={styles.listItem}>
      <BodyText style={styles.list}>#{numberOfRound}</BodyText>
      <BodyText style={styles.list}>{value}</BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  }
});

export default ListItem;
