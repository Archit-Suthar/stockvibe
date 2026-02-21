PRD: StockVibe
Goal: A financial dashboard(web-app) that analyzes the "vibe" of a stock ticker through news processing.

# Main Page Layout (Top to Bottom)

Search Bar: Centered with high visibility.

Search History: A row of the last 3–4 searched ticker "chips" (e.g., [AAPL] [TSLA] [NVDA]) located right below or next to the search bar for quick re-entry.

## The "Vibe Card" (On Search Success):

Stock Header: Ticker name, current price, and a color-coded "Vibe Meter" (e.g., a gradient bar from Red to Green).

AI Analysis Section: * Summary: 2-3 sentences on how the stock is performing based on the latest news.

Pros & Cons: A two-column list showing the "Bullish Drivers" vs. "Bearish Risks."

Market Voices: A section summarizing "What the Firms are Saying" (analyst sentiment extracted from headlines).

Headlines Feed: A scrolling list of the 5 raw news articles used for the analysis.

# New Feature: Recent Searches
Storage: We will use localStorage on the frontend. This way, if the user refreshes, their history is still there without needing a database.

Logic: When a search is successful, we push the ticker to an array, keep only the latest 4, and save it.