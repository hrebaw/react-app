import { useState } from 'react'
import { addBook, Book } from '../api/books'

type Props = {
  onBookAdded: (book: Book) => void
}

function BookForm({ onBookAdded }: Props) {
  const [title, setTitle]   = useState('')
  const [author, setAuthor] = useState('')
  const [status, setStatus] = useState('')
  const [rating, setRating] = useState('')
  const [dateFinished, setDateFinished] = useState('')
  const [notes, setNotes] = useState('')

  const handleAdd = () => {
    if (!title || !author || !status) return
    addBook({ 
      title, 
      author, 
      status,
      rating: rating ? parseInt(rating) : undefined,
      date_finished: dateFinished || undefined,
      notes: notes || undefined
    })
      .then(newBook => {
        onBookAdded(newBook)
        setTitle('')
        setAuthor('')
        setStatus('')
        setRating('')
        setDateFinished('')
        setNotes('')
      })
  }

  return (
    <div data-testid="book-form">
      <input data-testid="book-title-input" value={title}  onChange={e => setTitle(e.target.value)}  placeholder="Title" />
      <input data-testid="book-author-input" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
      <select data-testid="book-status-select" value={status} onChange={e => setStatus(e.target.value)}>
        <option value="">Select status</option>
        <option value="To Buy">To Buy</option>
        <option value="Not Started">Not Started</option>
        <option value="Reading">Reading</option>
        <option value="Finished">Finished</option>
      </select>
      <input data-testid="book-rating-input" type="number" value={rating} onChange={e => setRating(e.target.value)} placeholder="Rating (1-5)" min="1" max="5" />
      <input data-testid="book-date-input" type="date" value={dateFinished} onChange={e => setDateFinished(e.target.value)} placeholder="Date Finished" />
      <textarea data-testid="book-notes-input" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notes" />
      <button data-testid="add-book-button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default BookForm