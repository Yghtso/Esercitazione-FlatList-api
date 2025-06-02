import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = 'https://soareesreact.ddns.net/books';

/**
 * @typedef {Object} Book
 * @property {string} id - The unique identifier for the book.
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {string} published_at - The publication date of the book (ISO 8601 string).
 * @property {string} cover_image - The URL of the book's cover image.
 */

/**
 * A custom React hook for managing book data from the API.
 *
 * @returns {Object} An object containing:
 * - {Book[]} books - An array of book objects.
 * - {boolean} loading - True if data is currently being fetched or modified.
 * - {string|null} error - An error message if an API call fails, otherwise null.
 * - {Function} fetchBooks - A function to manually re-fetch all books.
 * - {Function} addBook - A function to add a new book.
 * - {Function} deleteBook - A function to delete a book by its ID.
 */

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches all books from the API.
   */
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

  /**
   * Adds a new book to the API.
   *
   * @param {Object} newBookData - The data for the new book (title, author, published_at, cover_image).
   * @returns {Promise<Object|null>} The created book's response data (e.g., { message, id }) or null on failure.
   */
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

  /**
   * Deletes a book from the API by its ID.
   *
   * @param {string} bookId - The ID of the book to delete.
   * @returns {Promise<boolean>} True if the book was successfully deleted, false otherwise.
   */
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
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return {
    books,
    loading,
    error,
    fetchBooks,
    addBook,
    deleteBook,
  };
};