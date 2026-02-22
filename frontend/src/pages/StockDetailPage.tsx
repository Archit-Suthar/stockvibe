import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Search, BarChart2, TrendingUp, TrendingDown, ExternalLink, Loader2 } from 'lucide-react';
=======
import { Search, BarChart2, TrendingUp, TrendingDown, ExternalLink, Loader2, Sparkles, Clock } from 'lucide-react';
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)

const API_BASE = 'http://localhost:3000';

// ── Types ────────────────────────────────────────────────────────
interface LiveArticle {
  title: string;
  description: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
  author: string | null;
}

<<<<<<< HEAD
interface AIVibeAnalysis {
  ticker: string;
  vibeMeter: {
    score: number;
    label: string;
  };
  aiVibeSummary: string;
  bullishDrivers: Array<{ title: string; detail: string }>;
  bearishRisks: Array<{ title: string; detail: string }>;
}

// ── Helpers ──────────────────────────────────────────────────────
const sentimentColors: Record<string, { bg: string; color: string }> = {
  BULLISH: { bg: '#d3f9e2', color: '#12a060' },
  EUPHORIA: { bg: '#d3f9e2', color: '#12a060' },
  NEUTRAL: { bg: '#fff4de', color: '#f4a200' },
  BEARISH: { bg: '#fde8ea', color: '#e63946' },
  PANIC: { bg: '#fde8ea', color: '#e63946' },
};

function vibeColor(score: number) {
  if (score >= 65) return '#12a060';
  if (score >= 40) return '#f4a200';
  return '#e63946';
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3_600_000);
  if (hrs < 1) return `${Math.floor(diff / 60000)}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Components ───────────────────────────────────────────────────
function VibeMeter({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
=======
// ── Vibe Meter visual ────────────────────────────────────────────
function VibeMeterPlaceholder() {
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)
  return (
    <div style={{ position: 'relative', padding: '0 8px' }}>
      <div style={{
        height: 12, borderRadius: 99,
        background: 'linear-gradient(90deg, #e63946 0%, #f4a200 38%, #f4a200 52%, #12a060 100%)',
<<<<<<< HEAD
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
          left: `${pct}%`, width: 22, height: 22, borderRadius: '50%',
          background: vibeColor(score), border: '3px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)', transition: 'left 0.4s ease',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9aa0b0', marginTop: 4 }}>
=======
        position: 'relative', opacity: 0.35,
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#c4c9d8', marginTop: 8 }}>
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)
        <span>Panic</span>
        <span>Neutral</span>
        <span>Euphoria</span>
      </div>
    </div>
  );
}

<<<<<<< HEAD
=======
// ── Pending AI card ──────────────────────────────────────────────
function PendingAICard({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', gap: 10, padding: '28px 20px', textAlign: 'center',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10, background: '#eef0fc',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Sparkles style={{ width: 18, height: 18, color: '#3b5bdb' }} />
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: '#5a6070', margin: 0 }}>{label}</p>
      <p style={{ fontSize: 12, color: '#9aa0b0', margin: 0, maxWidth: 240 }}>
        Will be generated once Gemini AI analysis is integrated.
      </p>
    </div>
  );
}

// ── Relative time helper ─────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hrs = Math.floor(diff / 3_600_000);
  if (hrs < 1) return `${Math.floor(diff / 60000)}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)
// ── Main component ───────────────────────────────────────────────
export default function StockDetailPage() {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState(ticker?.toUpperCase() ?? '');
  const symbol = ticker?.toUpperCase() ?? 'UNKNOWN';

<<<<<<< HEAD
  // API State
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [analysis, setAnalysis] = useState<AIVibeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;
    setIsLoading(true);
    setError(null);
    setArticles([]);
    setAnalysis(null);
=======
  // Live news state
  const [articles, setArticles] = useState<LiveArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticker) return;
    setNewsLoading(true);
    setNewsError(null);
    setArticles([]);
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)

    fetch(`${API_BASE}/api/stock/news/${symbol}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: res.statusText }));
          throw new Error(err.error ?? res.statusText);
        }
<<<<<<< HEAD
        return res.json() as Promise<{
          ticker: string;
          count: number;
          articles: LiveArticle[];
          analysis: AIVibeAnalysis;
        }>;
      })
      .then((data) => {
        setArticles(data.articles);
        setAnalysis(data.analysis);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [ticker, symbol]);
=======
        return res.json() as Promise<{ ticker: string; count: number; articles: LiveArticle[] }>;
      })
      .then((data) => setArticles(data.articles))
      .catch((err: Error) => setNewsError(err.message))
      .finally(() => setNewsLoading(false));
  }, [ticker]);
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && query.trim()) navigate(`/stock/${query.trim().toUpperCase()}`);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>

      {/* ── Sticky nav ─────────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40,
        borderBottom: '1px solid #e8eaf0', background: '#fff',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '0 32px',
          height: 56, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          {/* Logo */}
          <button onClick={() => navigate('/')} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            fontWeight: 700, fontSize: 14, color: '#3b5bdb',
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'inherit', flexShrink: 0, padding: 0,
          }}>
            <BarChart2 style={{ width: 16, height: 16 }} /> STOCKVIBE
          </button>

          {/* Search */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 8,
            border: '1.5px solid #e8eaf0', borderRadius: 10,
            padding: '7px 14px', background: '#f8f9fc',
          }}>
            <Search style={{ width: 13, height: 13, color: '#9aa0b0', flexShrink: 0 }} />
            <input
              id="detail-search"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search ticker (e.g. NVDA, TSLA, AAPL)..."
              style={{
                background: 'transparent', border: 'none', outline: 'none',
                fontSize: 13, color: '#0f1117', width: '100%', fontFamily: 'inherit',
              }}
            />
          </div>

          {/* Ticker badge */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: '#0f1117', margin: 0 }}>{symbol}</p>
            <p style={{ fontSize: 11, color: '#9aa0b0', margin: 0 }}>
              {articles.length > 0
                ? `${articles.length} articles found`
<<<<<<< HEAD
                : isLoading ? 'Loading...' : 'No results'}
=======
                : newsLoading ? 'Loading...' : 'No results'}
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)
            </p>
          </div>
        </div>
      </nav>

      {/* ── Main ───────────────────────────────────────────────── */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Error state */}
        {!isLoading && error && (
          <div style={{ padding: '28px', background: '#fff8f8', border: '1px solid #fde8ea', borderRadius: 12 }}>
            <p style={{ fontSize: 14, color: '#e63946', margin: 0, fontWeight: 500 }}>⚠️ Failed to analyze {symbol}: {error}</p>
            <p style={{ fontSize: 13, color: '#9aa0b0', margin: '6px 0 0' }}>Make sure the backend is running and API keys are set.</p>
          </div>
        )}

<<<<<<< HEAD
        {/* Loading state overall */}
        {isLoading && (
          <div style={{ padding: '80px 0', textAlign: 'center' }}>
            <Loader2 style={{ width: 36, height: 36, color: '#3b5bdb', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ fontSize: 16, fontWeight: 600, color: '#0f1117', margin: '0 0 4px' }}>Analyzing {symbol}...</p>
            <p style={{ fontSize: 13, color: '#9aa0b0', margin: 0 }}>Our AI is reading the latest news and crunching sentiment data.</p>
          </div>
        )}

        {!isLoading && !error && analysis && (
          <>
            {/* ── Vibe Meter ─────────────────────────────────────── */}
            <div className="animate-fade-in-up" style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '28px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f1117', margin: 0, marginBottom: 4 }}>The Vibe Meter</h2>
                  <p style={{ fontSize: 12, color: '#9aa0b0', margin: 0 }}>Real-time aggregate sentiment analysis driven by AI</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 56, fontWeight: 800, color: vibeColor(analysis.vibeMeter.score), margin: 0, lineHeight: 1 }}>
                    {analysis.vibeMeter.score}
                  </p>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                    background: sentimentColors[analysis.vibeMeter.label]?.bg || '#f4f5f8',
                    color: sentimentColors[analysis.vibeMeter.label]?.color || '#5a6070',
                    letterSpacing: '0.06em', textTransform: 'uppercase', display: 'inline-block', marginTop: 6,
                  }}>
                    {analysis.vibeMeter.label}
                  </span>
                </div>
              </div>
              <VibeMeter score={analysis.vibeMeter.score} />
            </div>

            {/* ── AI Vibe Summary ─────────────────────────────────── */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 20, padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6, background: '#3b5bdb',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <BarChart2 style={{ width: 13, height: 13, color: '#fff' }} />
                </div>
                <span style={{ fontWeight: 700, fontSize: 12, color: '#3b5bdb', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  AI Vibe Summary
                </span>
              </div>
              <p style={{ fontSize: 14, color: '#3730a3', lineHeight: 1.7, margin: 0 }}>
                {analysis.aiVibeSummary}
              </p>
            </div>
=======
        {/* ── Vibe Meter ─────────────────────────────────────── */}
        <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f1117', margin: 0, marginBottom: 4 }}>The Vibe Meter</h2>
              <p style={{ fontSize: 12, color: '#9aa0b0', margin: 0 }}>Real-time aggregate sentiment from 4,200+ sources</p>
            </div>
            {/* Pending score */}
            <div style={{ textAlign: 'right' }}>
              <div style={{
                width: 72, height: 56, borderRadius: 12, background: '#f4f5f8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles style={{ width: 22, height: 22, color: '#c4c9d8' }} />
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, color: '#9aa0b0', display: 'inline-block', marginTop: 6,
                letterSpacing: '0.05em', textTransform: 'uppercase',
              }}>
                Pending AI
              </span>
            </div>
          </div>
          <VibeMeterPlaceholder />
        </div>

        {/* ── AI Vibe Summary ─────────────────────────────────── */}
        <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 20, padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, background: '#3b5bdb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BarChart2 style={{ width: 13, height: 13, color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 12, color: '#3b5bdb', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              AI Vibe Summary
            </span>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 16px', background: '#ede9fe', borderRadius: 12,
          }}>
            <Clock style={{ width: 16, height: 16, color: '#7c3aed', flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: '#7c3aed', margin: 0, lineHeight: 1.5 }}>
              AI-powered summary for <strong>{symbol}</strong> will be generated here once Gemini integration is complete.
              It will analyze all news articles and provide a concise market sentiment narrative.
            </p>
          </div>
        </div>

        {/* ── Bullish Drivers & Bearish Risks ─────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Bullish */}
          <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <TrendingUp style={{ width: 15, height: 15, color: '#12a060' }} />
              <span style={{ fontWeight: 600, fontSize: 13, color: '#12a060' }}>Bullish Drivers</span>
            </div>
            <PendingAICard label="Bullish signals will appear here" />
          </div>
          {/* Bearish */}
          <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <TrendingDown style={{ width: 15, height: 15, color: '#e63946' }} />
              <span style={{ fontWeight: 600, fontSize: 13, color: '#e63946' }}>Bearish Risks</span>
            </div>
            <PendingAICard label="Bearish risks will appear here" />
          </div>
        </div>

        {/* ── Live News ───────────────────────────────────────── */}
        <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, overflow: 'hidden' }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 28px', borderBottom: '1px solid #e8eaf0',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <h3 style={{ fontWeight: 600, fontSize: 14, color: '#0f1117', margin: 0 }}>Latest News</h3>
              {newsLoading && (
                <Loader2 style={{ width: 14, height: 14, color: '#3b5bdb', animation: 'spin 1s linear infinite' }} />
              )}
            </div>
            <span style={{ fontSize: 11, color: '#9aa0b0' }}>
              via NewsAPI · searching <em>"Stock: {symbol}"</em>
            </span>
          </div>

          {/* Loading state */}
          {newsLoading && (
            <div style={{ padding: '40px 28px', textAlign: 'center' }}>
              <Loader2 style={{ width: 28, height: 28, color: '#3b5bdb', margin: '0 auto 10px', animation: 'spin 1s linear infinite' }} />
              <p style={{ fontSize: 13, color: '#9aa0b0', margin: 0 }}>Fetching latest news for {symbol}…</p>
            </div>
          )}

          {/* Error state */}
          {!newsLoading && newsError && (
            <div style={{ padding: '28px', background: '#fff8f8' }}>
              <p style={{ fontSize: 13, color: '#e63946', margin: 0, fontWeight: 500 }}>⚠️ {newsError}</p>
              <p style={{ fontSize: 12, color: '#9aa0b0', margin: '6px 0 0' }}>
                Make sure the backend server is running on port 3000.
              </p>
            </div>
          )}

          {/* Empty state */}
          {!newsLoading && !newsError && articles.length === 0 && (
            <div style={{ padding: '40px 28px', textAlign: 'center' }}>
              <p style={{ fontSize: 13, color: '#9aa0b0', margin: 0 }}>
                No articles found for <strong>"Stock: {symbol}"</strong>
              </p>
            </div>
          )}

          {/* Article list */}
          {!newsLoading && articles.map((article, i) => {
            const date = new Date(article.publishedAt);
            const dayMonth = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
            const ago = timeAgo(article.publishedAt);

            return (
              <a
                key={i}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  padding: '18px 28px', textDecoration: 'none',
                  borderBottom: i < articles.length - 1 ? '1px solid #f1f3f5' : 'none',
                  transition: 'background 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fafbfc')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {/* Date column */}
                <div style={{ flexShrink: 0, textAlign: 'center', width: 52 }}>
                  <p style={{
                    fontSize: 10, fontWeight: 600, color: '#9aa0b0', margin: 0,
                    textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4,
                  }}>
                    {dayMonth}
                  </p>
                  <p style={{ fontSize: 10, color: '#c4c9d8', margin: '2px 0 0' }}>{ago}</p>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 13, fontWeight: 600, color: '#0f1117',
                    margin: 0, marginBottom: 4, lineHeight: 1.45,
                  }}>
                    {article.title}
                  </p>
                  {article.description && (
                    <p style={{
                      fontSize: 12, color: '#5a6070', margin: 0, marginBottom: 5,
                      lineHeight: 1.5, overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                    }}>
                      {article.description}
                    </p>
                  )}
                  <p style={{ fontSize: 11, color: '#9aa0b0', margin: 0 }}>
                    {article.source.name}
                    {article.author && article.author !== article.source.name
                      ? ` · ${article.author}`
                      : ''}
                  </p>
                </div>

                {/* Link icon */}
                <ExternalLink style={{ width: 13, height: 13, color: '#c4c9d8', flexShrink: 0, marginTop: 3 }} />
              </a>
            );
          })}
        </div>
>>>>>>> 03049a7 (Integrate the news api & Make it reflect in the frontend)

            {/* ── Bullish Drivers & Bearish Risks ─────────────────── */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              {/* Bullish */}
              <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <TrendingUp style={{ width: 15, height: 15, color: '#12a060' }} />
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#12a060' }}>Bullish Drivers</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {analysis.bullishDrivers.map((d, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#12a060', flexShrink: 0, marginTop: 6 }} />
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f1117', display: 'block', marginBottom: 2 }}>{d.title}</span>
                        <span style={{ fontSize: 13, color: '#5a6070', lineHeight: 1.5 }}>{d.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Bearish */}
              <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <TrendingDown style={{ width: 15, height: 15, color: '#e63946' }} />
                  <span style={{ fontWeight: 600, fontSize: 13, color: '#e63946' }}>Bearish Risks</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {analysis.bearishRisks.map((d, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e63946', flexShrink: 0, marginTop: 6 }} />
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0f1117', display: 'block', marginBottom: 2 }}>{d.title}</span>
                        <span style={{ fontSize: 13, color: '#5a6070', lineHeight: 1.5 }}>{d.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Live News ───────────────────────────────────────── */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 28px', borderBottom: '1px solid #e8eaf0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h3 style={{ fontWeight: 600, fontSize: 14, color: '#0f1117', margin: 0 }}>Latest News</h3>
                </div>
                <span style={{ fontSize: 11, color: '#9aa0b0' }}>
                  via NewsAPI
                </span>
              </div>

              {articles.map((article, i) => {
                const date = new Date(article.publishedAt);
                const dayMonth = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
                const ago = timeAgo(article.publishedAt);

                return (
                  <a
                    key={i}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 20,
                      padding: '18px 28px', textDecoration: 'none',
                      borderBottom: i < articles.length - 1 ? '1px solid #f1f3f5' : 'none',
                      transition: 'background 0.12s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#fafbfc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    {/* Date column */}
                    <div style={{ flexShrink: 0, textAlign: 'center', width: 52 }}>
                      <p style={{
                        fontSize: 10, fontWeight: 600, color: '#9aa0b0', margin: 0,
                        textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.4,
                      }}>
                        {dayMonth}
                      </p>
                      <p style={{ fontSize: 10, color: '#c4c9d8', margin: '2px 0 0' }}>{ago}</p>
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: 13, fontWeight: 600, color: '#0f1117',
                        margin: 0, marginBottom: 4, lineHeight: 1.45,
                      }}>
                        {article.title}
                      </p>
                      {article.description && (
                        <p style={{
                          fontSize: 12, color: '#5a6070', margin: 0, marginBottom: 5,
                          lineHeight: 1.5, overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical' as const,
                        }}>
                          {article.description}
                        </p>
                      )}
                      <p style={{ fontSize: 11, color: '#9aa0b0', margin: 0 }}>
                        {article.source.name}
                        {article.author && article.author !== article.source.name
                          ? ` · ${article.author}`
                          : ''}
                      </p>
                    </div>

                    {/* Link icon */}
                    <ExternalLink style={{ width: 13, height: 13, color: '#c4c9d8', flexShrink: 0, marginTop: 3 }} />
                  </a>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
