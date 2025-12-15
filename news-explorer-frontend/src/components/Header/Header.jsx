import { Link, useLocation } from 'react-router-dom'
import './Header.css'
import Navigation from '../Navigation/Navigation'

function Header({ onSignInClick, onSignOut, isLoggedIn, currentUser }) {
  const location = useLocation()
  const isMainPage = location.pathname === '/'
  
  return (
    <header className={`header ${isMainPage ? 'header_overlay' : ''}`}>
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>
      <Navigation 
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
        isMainPage={isMainPage}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
    </header>
  )
}

export default Header

