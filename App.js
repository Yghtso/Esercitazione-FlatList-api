import { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

export default function App() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    loadBooks().then(() => setRefreshing(false));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
    <StatusBar style="auto" />
    <SafeAreaView style={styles.container}> 
        <Text style={styles.title}>📚 Gestione Libri</Text>
        <AddBook onAdd={loadBooks} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <BookList books={books} onDelete={loadBooks} />
      </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 25,
    marginTop: 30,
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
};