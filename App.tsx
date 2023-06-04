import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', german: 'Hallo', english: 'Hello' },
  { id: '2', german: 'Danke', english: 'Thank you' },
  { id: '3', german: 'Liebe', english: 'Love' },
  // add more phrases here
];

const LanguageLearningApp = () => {
  const [points, setPoints] = useState(0);

  const handleLearnWord = () => {
    // In a real app, you'd also want to update the user's points on the server
    setPoints(points + 10);
  };

  return (
    <View style={styles.container}>
      {DATA.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.item} 
          onPress={handleLearnWord}
        >
          <Text style={styles.title}>{item.german}</Text>
          <Text>{item.english}</Text>
        </TouchableOpacity>
      ))}
      <Text>You have {points} points</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default LanguageLearningApp;