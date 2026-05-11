import { useState } from 'react'
import { Book, updateBook, deleteBook } from '../api/books'
import BookLinks from './BookLinks'

type Props = {
  book: Book
  onUpdated: (book: Book) => void
  onDeleted: (id: number) => void
}

function BookCard({ book, onUpdated, onDeleted }: Props) {
  const [editing, setEditing]         = useState(false)
  const [title, setTitle]             = useState(book.title)
  const [author, setAuthor]           = useState(book.author)
  const [status, setStatus]           = useState(book.status)

  const handleSave = () => {
    updateBook(book.id, { title, author, status })
      .then(updated => {
        onUpdated(updated)
        setEditing(false)
      })
  }

  const handleDelete = () => {
    deleteBook(book.id)
      .then(() => onDeleted(book.id))
  }

  if (editing) {
    return (
      <li>
        <input value={title}  onChange={e => setTitle(e.target.value)} />
        <input value={author} onChange={e => setAuthor(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="want to read">Want to read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setEditing(false)}>Cancel</button>
      </li>
    )
  }

  return (
    <li>
      <div>
        <strong>{book.title}</strong> — {book.author} — {book.status}
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <BookLinks
        bookId={book.id}
        bookTitle={book.title}
        bookAuthor={book.author}
    />
    </li>
  )
}

export default BookCard