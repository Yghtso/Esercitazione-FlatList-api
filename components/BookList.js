// components/BookList.js
import React from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useBooks } from '../contexts/BooksContext'; // Make sure the path is correct
import Book from './Book'; // Import the new Book component

const BookList = () => {
  const { books, loading, error, deleteBook } = useBooks();

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading books...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No books available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        // Render the Book component for each item
        <Book
          book={item} // Pass the individual book object as a prop
          onDeleteBook={deleteBook} // Pass the deleteBook function
        />
      )}
      contentContainerStyle={styles.listContentContainer} // Add padding for the list
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContentContainer: {
    paddingVertical: 10, // Add vertical padding to the list itself
  },
});

export default BookList;