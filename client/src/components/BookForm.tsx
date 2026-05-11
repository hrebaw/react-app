import { useState } from 'react'
import { addBook, Book } from '../api/books'
import { Button } from './ui/Button'

type Props = {
  onBookAdded: (book: Book) => void
}

const inputStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  fontWeight: 300,
  border: 'var(--border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: '8px 10px',
  background: 'white',
  color: 'var(--color-ink)',
  width: '100%',
} as const

const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '10px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'var(--color-muted)',
  display: 'block',
  marginBottom: '4px',
}

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
}

function BookForm({ onBookAdded }: Props) {
  const [title, setTitle]               = useState('')
  const [author, setAuthor]             = useState('')
  const [status, setStatus]             = useState('')
  const [rating, setRating]             = useState('')
  const [dateFinished, setDateFinished] = useState('')
  const [notes, setNotes]               = useState('')

  const handleAdd = () => {
    if (!title || !author || !status) return
    addBook({
      title,
      author,
      status,
      rating: rating ? parseInt(rating) : undefined,
      date_finished: dateFinished || undefined,
      notes: notes || undefined,
    }).then(newBook => {
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
    <div
      data-testid="book-form"
      style={{
        background: 'white',
        border: 'var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)',
        marginBottom: 'var(--space-xl)',
      }}
    >
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '20px',
        fontWeight: 400,
        margin: '0 0 var(--space-lg)',
      }}>
        Add a book
      </h2>

      {/* Row 1: Title + Author */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Title</label>
          <input
            data-testid="book-title-input"
            style={inputStyle}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Piranesi"
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Author</label>
          <input
            data-testid="book-author-input"
            style={inputStyle}
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="e.g. Susanna Clarke"
          />
        </div>
      </div>

      {/* Row 2: Status + Rating + Date */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Status</label>
          <select
            data-testid="book-status-select"
            style={{ ...inputStyle, appearance: 'none' }}
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="To Buy">To buy</option>
            <option value="Not Started">Not started</option>
            <option value="Reading">Reading</option>
            <option value="Finished">Finished</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Rating</label>
          <input
            data-testid="book-rating-input"
            style={inputStyle}
            type="number"
            value={rating}
            onChange={e => setRating(e.target.value)}
            placeholder="1–5"
            min="1"
            max="5"
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Date finished</label>
          <input
            data-testid="book-date-input"
            style={inputStyle}
            type="date"
            value={dateFinished}
            onChange={e => setDateFinished(e.target.value)}
          />
        </div>
      </div>

      {/* Row 3: Notes */}
      <div style={{ ...fieldStyle, marginBottom: 'var(--space-md)' }}>
        <label style={labelStyle}>Notes</label>
        <textarea
          data-testid="book-notes-input"
          style={{ ...inputStyle, resize: 'vertical', minHeight: '72px', lineHeight: 1.6 }}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Any thoughts…"
        />
      </div>

      <Button
        data-testid="add-book-button"
        variant="primary"
        onClick={handleAdd}
        disabled={!title || !author || !status}
      >
        Add to library
      </Button>
    </div>
  )
}

export default BookForm