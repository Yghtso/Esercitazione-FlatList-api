// App.js
import { Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import { BooksProvider } from './contexts/BooksContext'; // Import the Provider

export default function App() {
  // Now, App.js does NOT call useBooks directly.
  // The state and functions are provided by BooksProvider to its children.

  return (
    <>
      <StatusBar style="auto" />
      {/* Wrap your components with the BooksProvider */}
      <BooksProvider>
        <SafeAreaView style={styles.container}> 
          <Text style={styles.title}>📚 Gestione Libri</Text>
          <AddBookForm /> {/* No props needed for AddBookForm */}
          <BookList />    {/* No props needed for BookList */}
        </SafeAreaView>
      </BooksProvider>
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
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
};