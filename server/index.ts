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
  title  TEXT NOT NULL,
  author TEXT NOT NULL,
  status TEXT NOT NULL,
  rating INTEGER,
  date_finished TEXT,
  notes TEXT
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

app.listen(3001, () => console.log('Server running on port 3001'))