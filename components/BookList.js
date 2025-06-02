import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useBooks } from '../contexts/BooksContext';
import Book from './Book';

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
        <Book
          book={item}
          onDeleteBook={deleteBook}
        />
      )}
      contentContainerStyle={styles.listContentContainer}
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
    paddingVertical: 10,
  },
});

export default BookList;