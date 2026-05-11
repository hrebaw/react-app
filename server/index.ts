import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors'

const app = express()
const db = new Database('mydata.db')

app.use(cors())
app.use(express.json())

// Change the table name and columns to suit a book
db.exec(`CREATE TABLE IF NOT EXISTS books (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  title  TEXT NOT NULL UNIQUE,
  author TEXT NOT NULL,
  status TEXT NOT NULL,
  rating INTEGER,
  date_finished TEXT,
  notes TEXT
)`)

db.exec(`CREATE TABLE IF NOT EXISTS book_links (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  book_id     INTEGER NOT NULL,
  book_title  TEXT NOT NULL,
  url         TEXT NOT NULL,
  label       TEXT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (book_title) REFERENCES books(title)
)`)

// Change 'users' to 'books' in every route URL and SQL query
app.get('/api/books', (req, res) => {
  const books = db.prepare('SELECT * FROM books').all()
  res.json(books)
})

app.post('/api/books', (req, res) => {
  const { title, author, status, rating, date_finished, notes } = req.body
  const result = db.prepare('INSERT INTO books (title, author, status, rating, date_finished, notes) VALUES (?, ?, ?, ?, ?, ?)').run(title, author, status, rating || null, date_finished || null, notes || null)
  res.json({ id: result.lastInsertRowid, title, author, status, rating, date_finished, notes })
})

app.put('/api/books/:id', (req, res) => {
  const { title, author, status, rating, date_finished, notes } = req.body
  const { id } = req.params
  db.prepare('UPDATE books SET title = ?, author = ?, status = ?, rating = ?, date_finished = ?, notes = ? WHERE id = ?').run(title, author, status, rating || null, date_finished || null, notes || null, id)
  res.json({ id: Number(id), title, author, status, rating, date_finished, notes })
})

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM books WHERE id = ?').run(id)
  res.json({ id: Number(id) })
})

// Get all links for a specific book
app.get('/api/books/:id/links', (req, res) => {
  const { id } = req.params
  const links = db.prepare('SELECT * FROM book_links WHERE book_id = ?').all(id)
  res.json(links)
})

// Add a link to a book
app.post('/api/books/:id/links', (req, res) => {
  const { id } = req.params
  const { url, label } = req.body
  
  // Get the book title from the books table
  const book = db.prepare('SELECT title FROM books WHERE id = ?').get(id) as { title: string } | undefined
  if (!book) {
    return res.status(404).json({ error: 'Book not found' })
  }
  
  const result = db.prepare(
    'INSERT INTO book_links (book_id, book_title, url, label) VALUES (?, ?, ?, ?)'
  ).run(id, book.title, url, label)
  res.json({ id: result.lastInsertRowid, book_id: Number(id), book_title: book.title, url, label })
})

// Delete a link
app.delete('/api/links/:id', (req, res) => {
  const { id } = req.params
  db.prepare('DELETE FROM book_links WHERE id = ?').run(id)
  res.json({ id: Number(id) })
})

app.listen(3001, () => console.log('Server running on port 3001'))