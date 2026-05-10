import { useState } from 'react'
import { Book, updateBook, deleteBook } from '../api/books'

type Props = {
  book: Book
  onUpdated: (book: Book) => void
  onDeleted: (id: number) => void
}

function BookCard({ book, onUpdated, onDeleted }: Props) {
  const [editing, setEditing]       = useState(false)
  const [title, setTitle]           = useState(book.title)
  const [author, setAuthor]         = useState(book.author)
  const [status, setStatus]         = useState(book.status)
  const [rating, setRating]         = useState(book.rating?.toString() || '')
  const [dateFinished, setDateFinished] = useState(book.date_finished || '')
  const [notes, setNotes]           = useState(book.notes || '')

  const handleSave = () => {
    updateBook(book.id, { 
      title, 
      author, 
      status,
      rating: rating ? parseInt(rating) : undefined,
      date_finished: dateFinished || undefined,
      notes: notes || undefined
    })
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
      <li data-testid={`book-card-${book.id}`}>
        <input data-testid={`edit-title-${book.id}`} value={title}  onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input data-testid={`edit-author-${book.id}`} value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
        <select data-testid={`edit-status-${book.id}`} value={status} onChange={e => setStatus(e.target.value)}>
          <option value="To Buy">To Buy</option>
          <option value="Not Started">Not Started</option>
          <option value="Reading">Reading</option>
          <option value="Finished">Finished</option>
        </select>
        <input data-testid={`edit-rating-${book.id}`} type="number" value={rating} onChange={e => setRating(e.target.value)} placeholder="Rating (1-5)" min="1" max="5" />
        <input data-testid={`edit-date-${book.id}`} type="date" value={dateFinished} onChange={e => setDateFinished(e.target.value)} />
        <textarea data-testid={`edit-notes-${book.id}`} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" />
        <button data-testid={`save-button-${book.id}`} onClick={handleSave}>Save</button>
        <button data-testid={`cancel-button-${book.id}`} onClick={() => setEditing(false)}>Cancel</button>
      </li>
    )
  }

  return (
    <li data-testid={`book-card-${book.id}`}>
      <div>
        <strong data-testid={`book-title-${book.id}`}>{book.title}</strong> by <span data-testid={`book-author-${book.id}`}>{book.author}</span> — <span data-testid={`book-status-${book.id}`}>{book.status}</span>
        {book.rating && <span data-testid={`book-rating-${book.id}`}> — Rating: {book.rating}/5</span>}
        {book.date_finished && <span data-testid={`book-date-${book.id}`}> — Finished: {book.date_finished}</span>}
        {book.notes && <span data-testid={`book-notes-${book.id}`}> — Notes: {book.notes}</span>}
      </div>
      <button data-testid={`edit-button-${book.id}`} onClick={() => setEditing(true)}>Edit</button>
      <button data-testid={`delete-button-${book.id}`} onClick={handleDelete}>Delete</button>
    </li>
  )
}

export default BookCard