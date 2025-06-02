const API_URL = 'https://soareesreact.ddns.net/books';

export const getBooks = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const addBook = async (book) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  return await response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.ok;
};