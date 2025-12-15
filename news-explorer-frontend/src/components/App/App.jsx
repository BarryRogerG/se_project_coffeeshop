import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'
import SavedNews from '../SavedNews/SavedNews'
import Footer from '../Footer/Footer'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import { mockLogin, mockRegister, mockCheckToken, mockGetSavedArticles, mockSaveArticle, mockDeleteArticle } from '../../utils/mockApi'
import './App.css'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [savedArticles, setSavedArticles] = useState([])

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const authData = await mockCheckToken()
      if (authData) {
        setIsLoggedIn(true)
        setCurrentUser(authData.user)
        // Load saved articles
        const saved = await mockGetSavedArticles()
        setSavedArticles(saved)
      }
    }
    checkAuth()
  }, [])

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true)
    setIsRegisterModalOpen(false)
  }

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true)
    setIsLoginModalOpen(false)
  }

  const handleCloseModals = () => {
    setIsLoginModalOpen(false)
    setIsRegisterModalOpen(false)
  }

  const handleLogin = async (credentials) => {
    try {
      const { user } = await mockLogin(credentials)
      setIsLoggedIn(true)
      setCurrentUser(user)
      // Load saved articles
      const saved = await mockGetSavedArticles()
      setSavedArticles(saved)
      handleCloseModals()
    } catch (error) {
      console.error('Login failed:', error)
      // In real app, show error message to user
    }
  }

  const handleRegister = async (userData) => {
    try {
      const { user } = await mockRegister(userData)
      setIsLoggedIn(true)
      setCurrentUser(user)
      setSavedArticles([])
      handleCloseModals()
    } catch (error) {
      console.error('Registration failed:', error)
      // In real app, show error message to user
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setCurrentUser(null)
    setSavedArticles([])
  }

  const handleSaveArticle = async (article) => {
    if (!isLoggedIn) return
    
    try {
      const updated = await mockSaveArticle(article)
      setSavedArticles(updated)
    } catch (error) {
      console.error('Save article failed:', error)
    }
  }

  const handleDeleteArticle = async (article) => {
    if (!isLoggedIn) return
    
    try {
      const updated = await mockDeleteArticle(article)
      setSavedArticles(updated)
    } catch (error) {
      console.error('Delete article failed:', error)
    }
  }

  return (
    <div className="app">
      <Header 
        onSignInClick={handleOpenLoginModal}
        onSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Main 
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveArticle={handleSaveArticle}
              onDeleteArticle={handleDeleteArticle}
            />
          } 
        />
        <Route 
          path="/saved-news" 
          element={
            <SavedNews 
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              savedArticles={savedArticles}
              onDeleteArticle={handleDeleteArticle}
            />
          } 
        />
      </Routes>
      <Footer />
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={handleCloseModals}
        onLogin={handleLogin}
        onSwitchToRegister={handleOpenRegisterModal}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={handleCloseModals}
        onRegister={handleRegister}
        onSwitchToLogin={handleOpenLoginModal}
      />
    </div>
  )
}

export default App

