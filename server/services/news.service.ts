// News Service - fetches stock news from NewsAPI.org

const NEWS_API_BASE = 'https://newsapi.org/v2/everything';

export interface NewsArticle {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
  author: string | null;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

/**
 * Fetches recent news articles for a given stock ticker using NewsAPI.
 * Query format: "Stock: <ticker>"
 */
export async function fetchStockNews(ticker: string): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    throw new Error('NEWS_API_KEY is not set in environment variables');
  }

  const query = encodeURIComponent(`Stock: ${ticker}`);
  const url = `${NEWS_API_BASE}?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`NewsAPI error ${response.status}: ${text}`);
  }

  const data = (await response.json()) as NewsAPIResponse;

  if (data.status !== 'ok') {
    throw new Error(`NewsAPI returned status: ${data.status}`);
  }

  // Filter out articles with removed/null titles
  return data.articles.filter(
    (a) => a.title && a.title !== '[Removed]'
  );
}
