import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, useColorScheme, FlatList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import DATA from './data';

type DataType = {
  id: string;
  german: string;
  english: string;
};

type ItemProps = {
  item: DataType;
  increment: () => void;
  decrement: () => void;
};

const Item = ({ item, increment, decrement }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.german}</Text>
    <Text>{item.english}</Text>
    <Button onPress={increment} title="Correct" />
    <Button onPress={decrement} title="Wrong" />
  </View>
);

const Header = ({ points, resetPoints }: { points: number; resetPoints: () => void }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>You have {points} points</Text>
    <Button onPress={resetPoints} title="Reset Points" />
  </View>
);

const LingoQuest = () => {
  const [points, setPoints] = useState(0);

  const handleCorrect = () => {
    setPoints(points + 10);
  };

  const handleWrong = () => {
    setPoints(points - 10);
  };

  const resetPoints = () => {
    setPoints(0);
  };

  const renderItem = ({ item }: { item: DataType }) => (
    <Item item={item} increment={handleCorrect} decrement={handleWrong} />
  );

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header points={points} resetPoints={resetPoints} />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  headerText: {
    fontSize: 20,
  },
});

export default LingoQuest;