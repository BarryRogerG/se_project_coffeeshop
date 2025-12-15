import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

function Navigation({ onSignInClick, onSignOut, isMainPage = false, isLoggedIn = false, currentUser = null }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  const isSavedNewsPage = location.pathname === '/saved-news'

  const handleSignInClick = () => {
    if (onSignInClick) {
      onSignInClick()
    }
  }

  const handleSignOutClick = () => {
    if (onSignOut) {
      onSignOut()
    }
  }

  return (
    <nav className={`navigation ${isMainPage ? 'navigation_overlay' : ''}`}>
      <Link 
        to="/" 
        className={`navigation__link ${isHomePage ? 'navigation__link_active' : ''}`}
      >
        Home
      </Link>
      {isLoggedIn && (
        <Link 
          to="/saved-news" 
          className={`navigation__link ${isSavedNewsPage ? 'navigation__link_active' : ''}`}
        >
          Saved articles
        </Link>
      )}
      {isLoggedIn ? (
        <button 
          className="navigation__button"
          onClick={handleSignOutClick}
        >
          {currentUser?.name || 'Sign out'}
        </button>
      ) : (
        <button 
          className="navigation__button"
          onClick={handleSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  )
}

export default Navigation

