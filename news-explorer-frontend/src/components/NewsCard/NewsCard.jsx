import './NewsCard.css'

function NewsCard({ 
  card, 
  isLoggedIn = false, 
  isSaved = false, 
  onSaveClick, 
  onDeleteClick,
  onCardClick 
}) {
  // Format date: "November 4, 2020"
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Get source name
  const sourceName = card.source?.name || card.source || 'Unknown Source'

  // Handle bookmark click
  const handleBookmarkClick = (e) => {
    e.stopPropagation() // Prevent card click when clicking bookmark
    if (isSaved && onDeleteClick) {
      onDeleteClick(card)
    } else if (!isSaved && onSaveClick) {
      onSaveClick(card)
    }
  }

  // Handle card click (optional - to open article)
  const handleCardClick = () => {
    if (onCardClick && card.url) {
      onCardClick(card.url)
    }
  }

  return (
    <article 
      className={`news-card ${onCardClick ? 'news-card_clickable' : ''}`}
      onClick={handleCardClick}
    >
      <div className="news-card__image-container">
        {card.urlToImage ? (
          <img 
            src={card.urlToImage} 
            alt={card.title || 'News article'}
            className="news-card__image"
          />
        ) : (
          <div className="news-card__image-placeholder">
            No Image
          </div>
        )}
        <div className="news-card__bookmark-container">
          {isLoggedIn ? (
            <button
              type="button"
              className={`news-card__bookmark ${isSaved ? 'news-card__bookmark_saved' : ''}`}
              onClick={handleBookmarkClick}
              aria-label={isSaved ? 'Remove from saved' : 'Save article'}
            >
              {isSaved ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ) : (
            <div className="news-card__bookmark-tooltip-wrapper">
              <button
                type="button"
                className="news-card__bookmark news-card__bookmark_inactive"
                aria-label="Sign in to save articles"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="news-card__tooltip">Sign in to save articles</div>
            </div>
          )}
        </div>
        {!isLoggedIn && (
          <div className="news-card__keyword">
            {card.keyword || 'Nature'}
          </div>
        )}
      </div>
      
      <div className="news-card__content">
        <p className="news-card__date">
          {formatDate(card.publishedAt)}
        </p>
        <h3 className="news-card__title">
          {card.title || 'No title available'}
        </h3>
        <p className="news-card__description">
          {card.description || card.content || 'No description available'}
        </p>
        <p className="news-card__source">
          {sourceName}
        </p>
      </div>
    </article>
  )
}

export default NewsCard

