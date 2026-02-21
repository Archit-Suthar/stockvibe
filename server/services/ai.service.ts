// AI Service - Handles Gemini AI calls and prompt logic
// This service will analyze stock news and generate insights

/**
 * Placeholder for Gemini AI integration
 * @param {Array} headlines - Array of news headlines
 * @param {string} ticker - Stock ticker symbol
 * @returns {Promise} AI-generated analysis
 */
export async function analyzeStockVibe(headlines, ticker) {
  // TODO: Implement Gemini 1.5 Flash integration
  // Must return JSON format
  // Must use descriptive adjectives (bullish, volatile) not advisory verbs (buy, sell)
  // Must be fact-anchored to provided headlines
  
  return {
    message: 'AI service placeholder',
    ticker,
    status: 'pending_implementation',
    reminder: 'Must return JSON and avoid advisory language'
  };
}

/**
 * Placeholder for prompt construction
 * @param {Array} headlines - Array of news headlines
 * @param {string} ticker - Stock ticker symbol
 * @returns {string} Formatted prompt for Gemini
 */
export function buildAnalysisPrompt(headlines, ticker) {
  // TODO: Implement prompt engineering
  // Should enforce neutrality and JSON output format
  
  return `Analyze stock ${ticker} based on: ${headlines.join(', ')}`;
}
