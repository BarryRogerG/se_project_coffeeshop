import { useState } from 'react'
import './Main.css'
import SearchForm from '../SearchForm/SearchForm'
import Preloader from '../Preloader/Preloader'
import NewsCard from '../NewsCard/NewsCard'
import { searchNews } from '../../utils/newsApi'
import { NEWS_API_KEY } from '../../utils/config'

function Main({ isLoggedIn = false, savedArticles = [], onSaveArticle, onDeleteArticle }) {
  const [isLoading, setIsLoading] = useState(false)
  const [articles, setArticles] = useState([])
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState(null)
  const [displayCount, setDisplayCount] = useState(3)
  const [searchKeyword, setSearchKeyword] = useState('')

  // Handle search
  const handleSearch = async (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) {
      setError('Please enter a keyword')
      return
    }

    setIsLoading(true)
    setHasSearched(true)
    setError(null)
    setDisplayCount(3) // Reset to show first 3 cards
    setSearchKeyword(searchTerm.trim())

    try {
      const data = await searchNews(searchTerm.trim(), NEWS_API_KEY)
      
      if (data.articles && data.articles.length > 0) {
        // Add keyword to each article for tracking
        const articlesWithKeyword = data.articles.map(article => ({
          ...article,
          keyword: searchTerm.trim()
        }))
        setArticles(articlesWithKeyword)
      } else {
        setArticles([])
      }
    } catch (err) {
      setError(err.message || 'Sorry, something went wrong during the request. Please try again later.')
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle "Show more" button
  const handleShowMore = () => {
    setDisplayCount(prev => prev + 3)
  }

  // Check if article is saved
  const isArticleSaved = (article) => {
    if (!isLoggedIn || !savedArticles || savedArticles.length === 0) {
      return false
    }
    return savedArticles.some(saved => saved.url === article.url)
  }

  // Get articles to display (limited by displayCount)
  const displayedArticles = articles.slice(0, displayCount)
  const hasMoreArticles = articles.length > displayCount

  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save them in your personal account.
        </p>
        <SearchForm onSearch={handleSearch} />
      </section>
      <section className="main__results">
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <div className="main__error">
            <p className="main__error-text">{error}</p>
          </div>
        ) : hasSearched && articles.length === 0 ? (
          <div className="main__no-results">
            <p className="main__no-results-text">Nothing found</p>
          </div>
        ) : displayedArticles.length > 0 ? (
          <>
            <div className="main__cards-grid">
              {displayedArticles.map((article, index) => (
                <NewsCard 
                  key={article.url || index}
                  card={article}
                  isLoggedIn={isLoggedIn}
                  isSaved={isArticleSaved(article)}
                  onSaveClick={onSaveArticle}
                  onDeleteClick={onDeleteArticle}
                  onCardClick={(url) => window.open(url, '_blank')}
                />
              ))}
            </div>
            {hasMoreArticles && (
              <div className="main__show-more">
                <button 
                  className="main__show-more-button"
                  onClick={handleShowMore}
                >
                  Show more
                </button>
              </div>
            )}
          </>
        ) : null}
      </section>
    </main>
  )
}

export default Main
