import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, StyleSheet, Text } from 'react-native';
import BookList from './components/BookList.js';
import AddBook from './components/AddBook';
import { getBooks } from './api/books.js';

export default function App() {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Errore nel caricamento:", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBooks().then(() => setRefreshing(false));
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>📚 Gestione Libri</Text>
      <AddBook onAdd={loadBooks} />
      <BookList books={books} onDelete={loadBooks} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});