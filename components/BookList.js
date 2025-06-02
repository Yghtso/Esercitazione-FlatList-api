import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useBooks } from '../contexts/BooksContext';
import Book from './Book';

const BookList = () => {
  const { books, loading, error, deleteBook, fetchBooks } = useBooks();

  if (loading && books.length === 0 && !error) { // Added !error to prevent loader over error
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Caricamento libri...</Text>
      </View>
    );
  }

  if (error && books.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Errore: {error}</Text>
        <Button title="Riprova" onPress={fetchBooks} style={styles.retryButton} />
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
      contentContainerStyle={[
        styles.listContentContainer,
        books.length === 0 && styles.emptyListContentContainer // Apply style for empty list
      ]}

      onRefresh={fetchBooks}
      refreshing={loading}

      ListEmptyComponent={() => (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>Nessun libro disponibile.</Text>
          <Text style={styles.emptyListSubText}>Tira verso il basso per aggiornare o aggiungi un nuovo libro!</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginBottom: 10,
  },
  retryButton: {
    marginTop: 10,
  },
  listContentContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexGrow: 1,
  },
  emptyListContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyListText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 8,
  },
  emptyListSubText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
});

export default BookList;