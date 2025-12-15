/**
 * News API utility functions
 * Handles requests to News API service
 */

const newsApiBaseUrl = process.env.NODE_ENV === "production" 
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

/**
 * Get date string in YYYY-MM-DD format
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get date 7 days ago
 * @returns {string} Formatted date string (7 days ago)
 */
const getDate7DaysAgo = () => {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return formatDate(date);
};

/**
 * Get current date
 * @returns {string} Formatted date string (today)
 */
const getCurrentDate = () => {
  return formatDate(new Date());
};

/**
 * Search for news articles
 * @param {string} keyword - Search keyword
 * @param {string} apiKey - News API key
 * @returns {Promise<Object>} API response
 */
export const searchNews = async (keyword, apiKey) => {
  if (!keyword || !keyword.trim()) {
    throw new Error('Please enter a keyword');
  }

  if (!apiKey) {
    throw new Error('API key is required');
  }

  const params = new URLSearchParams({
    q: keyword.trim(),
    apiKey: apiKey,
    from: getDate7DaysAgo(),
    to: getCurrentDate(),
    pageSize: 100,
  });

  const url = `${newsApiBaseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw error;
  }
};

