import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';

const API_BASE_URL = 'https://soareesreact.ddns.net/books';

/**
 * @typedef {Object} Book
 * @property {string} id - The unique identifier for the book.
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} published_at - The publication date of the book (ISO 8601 string).
 * @property {string} cover_image - The URL of the book's cover image.
 */


const BooksContext = createContext(undefined);


export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message || 'Failed to fetch books.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback(async (newBookData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      fetchBooks(); 
      return data;
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.message || 'Failed to add book.');
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  const deleteBook = useCallback(async (bookId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.deleted) {
        fetchBooks(); 
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error deleting book:', err);
      setError(err.message || 'Failed to delete book.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const value = {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    deleteBook,
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};