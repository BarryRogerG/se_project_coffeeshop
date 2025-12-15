/**
 * Mock API functions for simulating backend responses
 * These will be replaced with real API calls in Stage 2
 */

// Simulate user authentication
export const mockLogin = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock successful login
  const mockUser = {
    _id: 'mock-user-id',
    name: 'Test User',
    email: credentials.email,
  }
  
  const mockToken = 'mock-jwt-token-' + Date.now()
  
  // Store in localStorage
  localStorage.setItem('jwt', mockToken)
  localStorage.setItem('user', JSON.stringify(mockUser))
  
  return { token: mockToken, user: mockUser }
}

// Simulate user registration
export const mockRegister = async (userData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock successful registration
  const mockUser = {
    _id: 'mock-user-id-' + Date.now(),
    name: userData.name,
    email: userData.email,
  }
  
  const mockToken = 'mock-jwt-token-' + Date.now()
  
  // Store in localStorage
  localStorage.setItem('jwt', mockToken)
  localStorage.setItem('user', JSON.stringify(mockUser))
  
  return { token: mockToken, user: mockUser }
}

// Check if user is logged in (check token)
export const mockCheckToken = async () => {
  const token = localStorage.getItem('jwt')
  const userStr = localStorage.getItem('user')
  
  if (!token || !userStr) {
    return null
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  try {
    const user = JSON.parse(userStr)
    return { token, user }
  } catch {
    return null
  }
}

// Get saved articles
export const mockGetSavedArticles = async () => {
  const savedStr = localStorage.getItem('savedArticles')
  
  if (!savedStr) {
    return []
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  try {
    return JSON.parse(savedStr)
  } catch {
    return []
  }
}

// Save an article
export const mockSaveArticle = async (article) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const savedStr = localStorage.getItem('savedArticles')
  const savedArticles = savedStr ? JSON.parse(savedStr) : []
  
  // Check if already saved
  if (savedArticles.some(saved => saved.url === article.url)) {
    return savedArticles
  }
  
  // Add article with additional fields
  const articleToSave = {
    ...article,
    _id: 'saved-' + Date.now(),
    savedAt: new Date().toISOString(),
  }
  
  savedArticles.push(articleToSave)
  localStorage.setItem('savedArticles', JSON.stringify(savedArticles))
  
  return savedArticles
}

// Delete a saved article
export const mockDeleteArticle = async (article) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const savedStr = localStorage.getItem('savedArticles')
  if (!savedStr) {
    return []
  }
  
  const savedArticles = JSON.parse(savedStr)
  const filtered = savedArticles.filter(saved => saved.url !== article.url)
  
  localStorage.setItem('savedArticles', JSON.stringify(filtered))
  
  return filtered
}

