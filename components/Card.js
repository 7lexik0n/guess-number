import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = ({ children, style }) => {
  return (
    <View style={{...styles.card, ...style}}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.25,
    elevation: 8,
    backgroundColor: '#fff',
    padding: 20
  }
})

export default Card;
