import React from 'react';
import { FlatList, Text, View, ActivityIndicator, Button, Image } from 'react-native';
import { useBooks } from '../contexts/BooksContext'; // Import the hook from your context file

const BookList = () => {
  // Directly consume the hook here!
  const { books, loading, error, deleteBook } = useBooks(); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading books...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No books available.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: book }) => (
        <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}>
          {book.cover_image && (
            <Image 
              source={{ uri: book.cover_image }} 
              style={{ width: 80, height: 120, marginRight: 15, borderRadius: 5 }} 
              resizeMode="cover"
            />
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>Published: {new Date(book.published_at).toLocaleDateString()}</Text>
            <Button 
              title="Delete" 
              onPress={() => deleteBook(book.id)} 
              color="red"
            />
          </View>
        </View>
      )}
    />
  );
};

export default BookList;