import { useState } from 'react';
import { View, TextInput, Alert, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useBooks } from '../contexts/BooksContext';

export default function AddBookForm() {
  const { addBook, loading } = useBooks();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [coverImage, setCoverImage] = useState('');

  const handleSubmit = async () => {
    if (!title || !author || !publishedAt || !coverImage) {
      Alert.alert("Errore", "Compila tutti i campi!");
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(publishedAt) || isNaN(new Date(publishedAt).getTime())) {
      Alert.alert("Errore", "Formato data non valido. Usa YYYY-MM-DD.");
      return;
    }

    try {
      const result = await addBook({
        title,
        author,
        published_at: `${publishedAt}T00:00:00Z`,
        cover_image: coverImage,
      });

      if (result) {
        Alert.alert("Successo", "Libro aggiunto con successo!");
        setTitle('');
        setAuthor('');
        setPublishedAt('');
        setCoverImage('');
      } else {
        Alert.alert("Errore", "Impossibile aggiungere il libro. Riprova.");
      }
    } catch (error) {
      console.error("Unexpected error in handleSubmit:", error);
      Alert.alert("Errore", "Si è verificato un errore inatteso.");
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Titolo del libro"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Autore"
        value={author}
        onChangeText={setAuthor}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Data di pubblicazione (YYYY-MM-DD)"
        value={publishedAt}
        onChangeText={setPublishedAt}
        keyboardType="number-pad"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="URL Immagine di copertina"
        value={coverImage}
        onChangeText={setCoverImage}
        keyboardType="url"
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Aggiungi Libro</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    height: 50,
    backgroundColor: '#007bff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0c0e0',
  },
  submitText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});