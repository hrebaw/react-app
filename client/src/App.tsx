import { useEffect, useState } from 'react'

// Change the type to reflect book fields
type Book = { id: number; title: string; author: string }

function App() {
  const [books, setBooks]             = useState<Book[]>([])
  const [titleInput, setTitleInput]   = useState('')
  const [authorInput, setAuthorInput] = useState('')
  const [editingId, setEditingId]     = useState<number | null>(null)
  const [editingTitle, setEditingTitle]   = useState('')
  const [editingAuthor, setEditingAuthor] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [])

  const addBook = () => {
    fetch('http://localhost:3001/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: titleInput, author: authorInput })
    })
      .then(res => res.json())
      .then(newBook => {
        setBooks([...books, newBook])
        setTitleInput('')
        setAuthorInput('')
      })
  }

  const startEditing = (book: Book) => {
    setEditingId(book.id)
    setEditingTitle(book.title)
    setEditingAuthor(book.author)
  }

  const saveEdit = () => {
    fetch(`http://localhost:3001/api/books/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editingTitle, author: editingAuthor })
    })
      .then(res => res.json())
      .then(updatedBook => {
        setBooks(books.map(b => b.id === updatedBook.id ? updatedBook : b))
        setEditingId(null)
        setEditingTitle('')
        setEditingAuthor('')
      })
  }

  const deleteBook = (id: number) => {
    fetch(`http://localhost:3001/api/books/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(deleted => {
        setBooks(books.filter(b => b.id !== deleted.id))
      })
  }

  return (
    <div>
      <h1>Books</h1>

      {/* Add new book */}
      <input
        value={titleInput}
        onChange={e => setTitleInput(e.target.value)}
        placeholder="Title"
      />
      <input
        value={authorInput}
        onChange={e => setAuthorInput(e.target.value)}
        placeholder="Author"
      />
      <button onClick={addBook}>Add</button>

      {/* Book list */}
      <ul>
        {books.map(b => (
          <li key={b.id}>
            {editingId === b.id ? (
              <>
                <input value={editingTitle}  onChange={e => setEditingTitle(e.target.value)} />
                <input value={editingAuthor} onChange={e => setEditingAuthor(e.target.value)} />
                <button onClick={saveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {b.title} — {b.author}
                <button onClick={() => startEditing(b)}>Edit</button>
                <button onClick={() => deleteBook(b.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App