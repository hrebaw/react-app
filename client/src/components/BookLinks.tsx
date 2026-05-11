import { useState, useEffect } from 'react'
import { BookLink, fetchLinks, addLink, deleteLink } from '../api/books'

type ShoppingLink = {
  label: string
  url: string
}

type Props = {
  bookId: number
  bookTitle: string
  bookAuthor: string
}

function generateShoppingLinks(title: string, author: string): ShoppingLink[] {
  const query = encodeURIComponent(`${title} ${author}`)
  return [
    { label: 'Amazon',       url: `https://www.amazon.co.uk/s?k=${query}` },
    { label: 'Waterstones',  url: `https://www.waterstones.com/index/search?term=${query}` },
    { label: 'eBay',         url: `https://www.ebay.co.uk/sch/i.html?_nkw=${query}` },
    { label: 'Bookshop.org', url: `https://bookshop.org/search?keywords=${query}` },
  ]
}

function BookLinks({ bookId, bookTitle, bookAuthor }: Props) {
  const [links, setLinks]         = useState<BookLink[]>([])
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    fetchLinks(bookId).then(setLinks)
  }, [bookId])

  const shoppingLinks = generateShoppingLinks(bookTitle, bookAuthor)

  const handleAddLink = (shopping: ShoppingLink) => {
    addLink(bookId, { url: shopping.url, label: shopping.label })
      .then(newLink => setLinks(prev => [...prev, newLink]))
  }

  const handleDeleteLink = (linkId: number) => {
    deleteLink(linkId)
      .then(() => setLinks(prev => prev.filter(l => l.id !== linkId)))
  }

  return (
    <div>
      {/* Saved links */}
      {links.map(link => (
        <span key={link.id}>
          <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
          <button onClick={() => handleDeleteLink(link.id)}>✕</button>
        </span>
      ))}

      {/* Toggle shopping options */}
      <button onClick={() => setShowSearch(!showSearch)}>
        {showSearch ? 'Hide listings' : 'Find listings'}
      </button>

      {/* Shopping links */}
      {showSearch && shoppingLinks.map(link => (
        <div key={link.label}>
          <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
          <button onClick={() => handleAddLink(link)}>Add</button>
        </div>
      ))}
    </div>
  )
}

export default BookLinks