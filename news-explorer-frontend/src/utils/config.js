/**
 * Configuration file
 * Store API keys and other configuration here
 * 
 * IMPORTANT: Add this file to .gitignore to keep your API key secure
 * For production, use environment variables instead
 */

// News API Key - Get yours from https://newsapi.org
// For development, you can use a placeholder, but you'll need a real key to test
export const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY || 'YOUR_API_KEY_HERE';

// You can also create a .env file in the root directory with:
// REACT_APP_NEWS_API_KEY=your_actual_api_key_here

