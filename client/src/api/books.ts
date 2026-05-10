const BASE = 'http://localhost:3001/api'

export type Book = {
  id: number
  title: string
  author: string
  status: string
  rating?: number
  date_finished?: string
  notes?: string
}

export type NewBook = Omit<Book, 'id'>

export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${BASE}/books`)
  return res.json()
}

export async function addBook(data: NewBook): Promise<Book> {
  const res = await fetch(`${BASE}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateBook(id: number, data: NewBook): Promise<Book> {
  const res = await fetch(`${BASE}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteBook(id: number): Promise<{ id: number }> {
  const res = await fetch(`${BASE}/books/${id}`, { method: 'DELETE' })
  return res.json()
}