import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { addBook } from '../api/books';

export default function AddBook({ onAdd }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !publishedAt || !coverImage) {
      Alert.alert("Errore", "Compila tutti i campi!");
      return;
    }

    try {
      await addBook({
        title,
        author,
        published_at: `${publishedAt}T00:00:00Z`,
        cover_image: coverImage,
      });
      Alert.alert("Successo", "Libro aggiunto");
      setTitle('');
      setAuthor('');
      setPublishedAt('');
      setCoverImage('');
      onAdd();
    } catch (error) {
      Alert.alert("Errore", "Impossibile aggiungere il libro.");
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Titolo"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Autore"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={publishedAt}
        onChangeText={setPublishedAt}
      />
      <TextInput
        style={styles.input}
        placeholder="URL Copertina"
        value={coverImage}
        onChangeText={setCoverImage}
        keyboardType="url"
      />
      <Button title="Aggiungi libro" onPress={handleSubmit} />
    </View>
  );
}

const styles = {
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
};