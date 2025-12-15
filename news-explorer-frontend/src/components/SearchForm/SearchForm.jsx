import { useState } from 'react'
import './SearchForm.css'

function SearchForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim())
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-form__input"
        placeholder="Enter topic"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  )
}

export default SearchForm

