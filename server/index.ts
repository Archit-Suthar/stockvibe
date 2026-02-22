import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchStockNews } from './services/news.service.js';
<<<<<<< HEAD
import { analyzeStockVibe } from './services/ai.service.js';
=======
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)

// Load .env.local (falls back to .env if not found)
dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ── Health / Hello ─────────────────────────────────────────
app.get('/api/hello', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World from StockVibe API!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'healthy' });
});

// ── Stock News ─────────────────────────────────────────────
// GET /api/stock/news/:ticker
// Searches NewsAPI for "Stock: <ticker>" and returns articles
app.get('/api/stock/news/:ticker', async (req: Request, res: Response) => {
  const ticker = req.params.ticker as string;

  if (!ticker || ticker.trim().length === 0) {
    res.status(400).json({ error: 'Ticker symbol is required' });
    return;
  }

  const symbol = ticker.trim().toUpperCase();

  try {
<<<<<<< HEAD
    // 1. Fetch latest news
    const articles = await fetchStockNews(symbol);
    
    // 2. Perform AI Vibe Check on the top 5 articles
    const topArticles = articles.slice(0, 5);
    const analysis = await analyzeStockVibe(symbol, topArticles);

    // 3. Return combined response
=======
    const articles = await fetchStockNews(symbol);
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)
    res.json({
      ticker: symbol,
      count: articles.length,
      articles,
<<<<<<< HEAD
      analysis,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[api] Error analyzing ${symbol}:`, message);
=======
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[news] Error fetching news for ${symbol}:`, message);
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)
    res.status(500).json({ error: message });
  }
});

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 StockVibe Server running on http://localhost:${PORT}`);
  console.log(`📊 API endpoints:`);
  console.log(`   - GET http://localhost:${PORT}/api/health`);
  console.log(`   - GET http://localhost:${PORT}/api/stock/news/:ticker`);
});
