// components/Book.js
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native'; // Import StyleSheet for better styling

const Book = ({ book, onDeleteBook }) => {
  return (
    <View style={styles.bookContainer}>
      {book.cover_image && (
        <Image
          source={{ uri: book.cover_image }}
          style={styles.coverImage}
          resizeMode="cover"
        />
      )}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Author: {book.author}</Text>
        <Text style={styles.published}>Published: {new Date(book.published_at).toLocaleDateString()}</Text>
        <Button
          title="Delete"
          onPress={() => onDeleteBook(book.id)} // Use the onDeleteBook prop
          color="red"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Add some space between books
    backgroundColor: '#f9f9f9', // Light background for visibility
    borderRadius: 8, // Rounded corners
    shadowColor: '#000', // Basic shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Android shadow
  },
  coverImage: {
    width: 80,
    height: 120,
    marginRight: 15,
    borderRadius: 5,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  published: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
});

export default Book;