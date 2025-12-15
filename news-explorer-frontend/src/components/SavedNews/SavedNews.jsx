import './SavedNews.css'
import NewsCard from '../NewsCard/NewsCard'

function SavedNews({ isLoggedIn = false, currentUser = null, savedArticles = [], onDeleteArticle }) {
  const userName = currentUser?.name || ''

  // Extract unique keywords from saved articles
  const keywords = savedArticles
    .map(article => article.keyword)
    .filter((keyword, index, self) => keyword && self.indexOf(keyword) === index)
    .slice(0, 3) // Show max 3 keywords

  return (
    <main className="saved-news">
      {isLoggedIn && userName && (
        <section className="saved-news__header">
          <p className="saved-news__breadcrumb">Home / Saved articles</p>
          <h1 className="saved-news__title">Saved articles</h1>
          <p className="saved-news__subtitle">
            {userName}, you have {savedArticles.length} saved {savedArticles.length === 1 ? 'article' : 'articles'}
          </p>
          {keywords.length > 0 && (
            <div className="saved-news__keywords">
              <span className="saved-news__keywords-label">By keywords:</span>
              <div className="saved-news__keywords-list">
                {keywords.map((keyword, index) => (
                  <span key={index} className="saved-news__keyword">
                    {keyword}
                    {index < keywords.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
      
      <section className="saved-news__content">
        {savedArticles.length === 0 ? (
          <div className="saved-news__empty">
            <p className="saved-news__empty-text">
              {isLoggedIn 
                ? "You haven't saved any articles yet." 
                : "Please sign in to view your saved articles."}
            </p>
          </div>
        ) : (
          <div className="saved-news__cards-grid">
            {savedArticles.map((article, index) => (
              <NewsCard
                key={article._id || index}
                card={article}
                isLoggedIn={isLoggedIn}
                isSaved={true}
                onDeleteClick={onDeleteArticle}
                onCardClick={(url) => window.open(url, '_blank')}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default SavedNews
