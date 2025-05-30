import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { deleteBook } from '../api/books';

export default function BookList({ books, onDelete }) {
  const handleDelete = (id) => {
    Alert.alert(
      "Elimina libro",
      "Sei sicuro?",
      [
        { text: "Annulla", style: "cancel" },
        { text: "Elimina", onPress: () => deleteBook(id).then(onDelete) },
      ]
    );
  };

  return (
    <View>
      {books.length === 0 ? (
        <Text>Nessun libro disponibile</Text>
      ) : (
        books.map((book) => (
          <View key={book.id} style={styles.bookItem}>
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookAuthor}>{book.author}</Text>
              <Text>Pubblicato il: {book.published_at.split('T')[0]}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(book.id)}
            >
              <Text style={styles.deleteText}>Elimina</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}

const styles = {
  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookAuthor: {
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 4,
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
  },
};