import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

// (Stateless) Markup only
const Faves = props => {
  return (
    <View style={styles.container}>
      <Text>This is faves.</Text>
    </View>
  );
};

export default Faves;
