import { useState } from 'react'
import { Book, updateBook, deleteBook } from '../api/books'
import BookLinks from './BookLinks'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'

type Props = {
  book: Book
  onUpdated: (book: Book) => void
  onDeleted: (id: number) => void
}

const inputStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  fontWeight: 300,
  border: 'var(--border-subtle)',
  borderRadius: 'var(--radius-md)',
  padding: '7px 10px',
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

function BookCard({ book, onUpdated, onDeleted }: Props) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle]     = useState(book.title)
  const [author, setAuthor]   = useState(book.author)
  const [status, setStatus]   = useState(book.status)

  const handleSave = () => {
    updateBook(book.id, { title, author, status }).then(updated => {
      onUpdated(updated)
      setEditing(false)
    })
  }

  if (editing) {
    return (
      <li style={{ listStyle: 'none', marginBottom: 'var(--space-md)' }}>
        <div style={{
          background: 'white',
          border: 'var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-md) var(--space-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
        }}>
          <div>
            <label style={labelStyle}>Title</label>
            <input style={inputStyle} value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Author</label>
            <input style={inputStyle} value={author} onChange={e => setAuthor(e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Status</label>
            <select
              style={{ ...inputStyle, appearance: 'none' }}
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="To Buy">To buy</option>
              <option value="Not Started">Not started</option>
              <option value="Reading">Reading</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-xs)' }}>
            <Button variant="primary" onClick={handleSave}>Save</Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
          </div>
        </div>
      </li>
    )
  }

  return (
    <li style={{ listStyle: 'none', marginBottom: 'var(--space-md)' }}>
      <div style={{
        background: 'white',
        border: 'var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-md) var(--space-lg)',
        display: 'flex',
        gap: 'var(--space-md)',
        alignItems: 'flex-start',
      }}>
        {/* Spine accent */}
        <div style={{
          width: '5px',
          background: 'var(--color-ink)',
          borderRadius: 'var(--radius-sm)',
          alignSelf: 'stretch',
          flexShrink: 0,
          minHeight: '60px',
        }} />

        <div style={{ flex: 1 }}>
          {/* Title + author */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '17px',
            fontWeight: 500,
            margin: '0 0 2px',
            lineHeight: 1.3,
          }}>
            {book.title}
          </h3>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: '13px',
            color: 'var(--color-muted)',
            margin: '0 0 10px',
          }}>
            {book.author}
          </p>

          {/* Status + actions row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', flexWrap: 'wrap' }}>
            <Badge status={book.status as any} />
            <Button variant="ghost" onClick={() => setEditing(true)}>Edit</Button>
            <Button variant="ghost" onClick={() => deleteBook(book.id).then(() => onDeleted(book.id))}>
              Delete
            </Button>
          </div>

          {/* Notes preview */}
          {book.notes && (
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'var(--color-muted)',
              margin: 'var(--space-sm) 0 0',
              fontStyle: 'italic',
              borderLeft: '2px solid var(--color-rule)',
              paddingLeft: 'var(--space-sm)',
            }}>
              {book.notes}
            </p>
          )}

          <BookLinks
            bookId={book.id}
            bookTitle={book.title}
            bookAuthor={book.author}
          />
        </div>
      </div>
    </li>
  )
}

export default BookCard