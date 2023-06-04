import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, useColorScheme, FlatList, ActivityIndicator } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import DATA from './data';

const PAGE_SIZE = 20; // Number of items to load in each batch

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
      <Text style={styles.title}>Question {item.id}</Text>
      <Text style={styles.german}>{item.german}</Text>
      <Text style={styles.english}>{item.english}</Text>
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
  const [data, setData] = useState<DataType[]>([]); // Data to be rendered
  const [page, setPage] = useState(0); // Current page
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadPageData = () => {
      // Simulate loading delay
      setLoading(true);
      setTimeout(() => {
        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        setData((prevData) => [...prevData, ...DATA.slice(start, end)]);
        setLoading(false);
      }, 1000);
    };

    loadPageData();
  }, [page]);

  const handleCorrect = () => {
    setPoints((prevPoints) => prevPoints + 10);
  };

  const handleWrong = () => {
    setPoints((prevPoints) => prevPoints - 10);
  };

  const handleDone = (id: string) => {
    setDoneSet((prevDoneSet) => new Set(prevDoneSet.add(id)));
  };

  const resetPoints = () => {
    setPoints(0);
    setPage(0);
    setDoneSet(new Set<string>());
    setData([]);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderItem = ({ item }: { item: DataType }) => (
    <Item item={item} increment={handleCorrect} decrement={handleWrong} done={doneSet.has(item.id)} setDone={handleDone} />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={styles.loadingIndicator} size="large" color="#3F51B5" />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header points={points} resetPoints={resetPoints} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListFooterComponent={renderFooter}
        onEndReached={nextPage}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  german: {
    fontSize: 18,
    color: '#3F51B5',
    marginBottom: 5,
  },
  english: {
    fontSize: 16,
    color: '#3F51B5',
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
  loadingIndicator: {
    marginVertical: 20,
  },
});

export default LingoQuest;
