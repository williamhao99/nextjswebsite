import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { formatDate } from '../lib/utils'

export default function SearchModal({ isOpen, onClose, posts, pages }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      // Focus the search input when modal opens
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)

      // Reset search when opening
      setSearchTerm('')
      setSearchResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([])
      setSelectedIndex(0)
      return
    }

    // Search implementation
    const searchQuery = searchTerm.toLowerCase()

    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery)) ||
      (post.html && post.html.toLowerCase().includes(searchQuery))
    )

    const filteredPages = pages.filter(page =>
      page.title.toLowerCase().includes(searchQuery) ||
      (page.excerpt && page.excerpt.toLowerCase().includes(searchQuery)) ||
      (page.html && page.html.toLowerCase().includes(searchQuery))
    )

    const results = [
      ...filteredPosts.slice(0, 5).map(item => ({ ...item, type: 'post' })),
      ...filteredPages.slice(0, 3).map(item => ({ ...item, type: 'page' }))
    ]

    setSearchResults(results)
    setSelectedIndex(0)
  }, [searchTerm, posts, pages])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (searchResults[selectedIndex]) {
            const result = searchResults[selectedIndex]
            const url = result.type === 'post'
              ? `/blog/${result.slug}`
              : `/${result.slug}`
            window.location.href = url
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, searchResults, selectedIndex])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="search-modal-overlay">
      <div className="search-modal" ref={modalRef}>
        <div className="search-modal-input-wrapper">
          <div className="search-modal-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search posts and pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-modal-input"
          />
          <div className="search-modal-shortcut">⌘K</div>
        </div>

        {searchTerm && (
          <div className="search-modal-results">
            {searchResults.length === 0 ? (
              <div className="search-modal-no-results">
                <div className="search-modal-no-results-icon">🔍</div>
                <div>No results found for "{searchTerm}"</div>
              </div>
            ) : (
              <>
                <div className="search-modal-results-header">
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </div>
                <div className="search-modal-results-list">
                  {searchResults.map((result, index) => (
                    <Link
                      key={`${result.type}-${result.slug}`}
                      href={result.type === 'post' ? `/blog/${result.slug}` : `/${result.slug}`}
                      className={`search-modal-result-item ${index === selectedIndex ? 'selected' : ''}`}
                      onClick={onClose}
                    >
                      <div className="search-modal-result-content">
                        <div className="search-modal-result-title">{result.title}</div>
                        {result.excerpt && (
                          <div className="search-modal-result-excerpt">
                            {result.excerpt.substring(0, 80)}...
                          </div>
                        )}
                        <div className="search-modal-result-meta">
                          <span className="search-modal-result-type">
                            {result.type === 'post' ? '📝 Post' : '📄 Page'}
                          </span>
                          {result.published_at && (
                            <span className="search-modal-result-date">
                              {formatDate(result.published_at, 'MMM DD, YYYY')}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="search-modal-result-arrow">→</div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {!searchTerm && (
          <div className="search-modal-empty">
            <div className="search-modal-empty-icon">🔍</div>
            <div className="search-modal-empty-title">Search willhao.info</div>
            <div className="search-modal-empty-subtitle">Type to search posts and pages</div>
          </div>
        )}
      </div>
    </div>
  )
}