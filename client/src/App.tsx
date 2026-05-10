import { useEffect, useState } from 'react'
import { fetchBooks, Book } from './api/books'
import BookForm from './components/BookForm'
import BookCard from './components/BookCard'

function App() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetchBooks().then(data => setBooks(data))
  }, [])

  const handleBookAdded = (book: Book) => {
    setBooks(prev => [...prev, book])
  }

  const handleBookUpdated = (updated: Book) => {
    setBooks(prev => prev.map(b => b.id === updated.id ? updated : b))
  }

  const handleBookDeleted = (id: number) => {
    setBooks(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div data-testid="app">
      <h1 data-testid="app-title">Reading Log</h1>
      <BookForm onBookAdded={handleBookAdded} />
      <ul data-testid="books-list">
        {books.map(b => (
          <BookCard
            key={b.id}
            book={b}
            onUpdated={handleBookUpdated}
            onDeleted={handleBookDeleted}
          />
        ))}
      </ul>
    </div>
  )
}

export default App