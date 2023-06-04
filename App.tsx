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
  done: boolean;
  setDone: (id: string) => void;
};

const Item = ({ item, increment, decrement, done, setDone }: ItemProps) => {
  const handleCorrect = () => {
    increment();
    setDone(item.id);
  };

  const handleWrong = () => {
    decrement();
    setDone(item.id);
  };

  if (done) {
    return <View style={styles.doneItem}><Text style={styles.doneText}>Question {item.id} answered</Text></View>
  }

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.german}</Text>
      <Text style={styles.subtitle}>{item.english}</Text>
      <View style={styles.buttonsContainer}>
        <Button onPress={handleCorrect} title="Correct" color="#4CAF50" />
        <Button onPress={handleWrong} title="Wrong" color="#F44336" />
      </View>
    </View>
  );
};

const Header = ({ points, resetPoints }: { points: number; resetPoints: () => void }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Points: {points}</Text>
    <Button onPress={resetPoints} title="Reset" color="#3F51B5" />
  </View>
);

const LingoQuest = () => {
  const [points, setPoints] = useState(0);
  const [doneSet, setDoneSet] = useState(new Set<string>());

  const handleCorrect = () => {
    setPoints(points + 10);
  };

  const handleWrong = () => {
    setPoints(points - 10);
  };

  const handleDone = (id: string) => {
    setDoneSet(new Set(doneSet.add(id)));
  };

  const resetPoints = () => {
    setPoints(0);
    setDoneSet(new Set<string>());
  };

  const renderItem = ({ item }: { item: DataType }) => (
    <Item item={item} increment={handleCorrect} decrement={handleWrong} done={doneSet.has(item.id)} setDone={handleDone} />
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
    backgroundColor: '#E8EAF6',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#3F51B5',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#3F51B5',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#3F51B5',
  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  doneItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#C5CAE9',
    borderRadius: 10,
  },
  doneText: {
    fontSize: 16,
    color: '#3F51B5',
  },
});

export default LingoQuest;