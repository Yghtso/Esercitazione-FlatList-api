import { Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import { BooksProvider } from './contexts/BooksContext';

export default function App() {

  return (
    <>
      <StatusBar style="auto" />
      <BooksProvider>
        <SafeAreaView style={styles.container}> 
          <Text style={styles.title}>📚 Gestione Libri</Text>
          <BookList />
          <AddBookForm />
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