import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BarChart2, Zap, Twitter, Github, X } from 'lucide-react';

const TRENDING = [
  { ticker: 'AAPL', change: '+2.14%', up: true },
  { ticker: 'TSLA', change: '+1.08%', up: true },
  { ticker: 'NVDA', change: '+5.62%', up: true },
  { ticker: 'MSFT', change: '-0.2%', up: false },
  { ticker: 'AMZN', change: '+0.98%', up: true },
];

type Sentiment = 'BULLISH' | 'NEUTRAL' | 'BEARISH';

interface Suggestion {
  ticker: string;
  name: string;
  sentiment: Sentiment;
  logo: string;
}

const ALL_SUGGESTIONS: Suggestion[] = [
  { ticker: 'AMZN', name: 'Amazon.com, Inc.',             sentiment: 'BULLISH', logo: '🟠' },
  { ticker: 'AMD',  name: 'Advanced Micro Devices, Inc.', sentiment: 'NEUTRAL', logo: '⬛' },
  { ticker: 'AMC',  name: 'AMC Entertainment Holdings',   sentiment: 'BEARISH', logo: '🔵' },
  { ticker: 'AAPL', name: 'Apple Inc.',                   sentiment: 'BULLISH', logo: '⬛' },
  { ticker: 'NVDA', name: 'NVIDIA Corporation',           sentiment: 'BULLISH', logo: '🟢' },
  { ticker: 'TSLA', name: 'Tesla, Inc.',                  sentiment: 'NEUTRAL', logo: '🔴' },
  { ticker: 'MSFT', name: 'Microsoft Corporation',        sentiment: 'BULLISH', logo: '🔷' },
  { ticker: 'GOOGL',name: 'Alphabet Inc.',                sentiment: 'NEUTRAL', logo: '🌈' },
  { ticker: 'META', name: 'Meta Platforms, Inc.',         sentiment: 'BULLISH', logo: '🔵' },
];

const sentimentColors: Record<Sentiment, { bg: string; color: string }> = {
  BULLISH: { bg: '#d3f9e2', color: '#12a060' },
  NEUTRAL: { bg: '#fff4de', color: '#f4a200' },
  BEARISH: { bg: '#fde8ea', color: '#e63946' },
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim().length > 0
    ? ALL_SUGGESTIONS.filter(s =>
        s.ticker.toLowerCase().startsWith(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    setOpen(focused && filtered.length > 0);
  }, [focused, filtered.length]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleAnalyze() {
    const t = query.trim().toUpperCase();
    if (t) navigate(`/stock/${t}`);
  }

  function handleSelect(ticker: string) {
    navigate(`/stock/${ticker}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleAnalyze();
    if (e.key === 'Escape') { setOpen(false); setFocused(false); }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8f9fc' }}>
      {/* ── Nav ─────────────────────────────────────────── */}
      <nav style={{
        width: '100%', borderBottom: '1px solid #e8eaf0', background: '#fff',
        position: 'sticky', top: 0, zIndex: 40,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 32px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 16, color: '#3b5bdb' }}>
            <BarChart2 style={{ width: 18, height: 18 }} />
            STOCKVIBE
          </div>
          <div style={{ display: 'flex', gap: 28, fontSize: 13, color: '#5a6070' }}>
            {['Documentation', 'API Access', 'Data Partners', 'Privacy'].map(l => (
              <a key={l} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, color: '#9aa0b0' }}>
            <a href="#" aria-label="Twitter"><Twitter style={{ width: 16, height: 16 }} /></a>
            <a href="#" aria-label="GitHub"><Github style={{ width: 16, height: 16 }} /></a>
          </div>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────── */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '80px 24px', textAlign: 'center',
      }}>
        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '50%', background: '#3b5bdb',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <BarChart2 style={{ width: 18, height: 18, color: '#fff' }} />
          </div>
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: '0.05em', color: '#5a6070' }}>STOCKVIBE</span>
        </div>

        <h1 style={{
          fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1,
          color: '#0f1117', marginBottom: 18, maxWidth: 620,
        }}>
          Market Sentiment{' '}
          <span style={{ color: '#3b5bdb' }}>Unlocked.</span>
        </h1>

        <p style={{ fontSize: 15, color: '#5a6070', marginBottom: 8, maxWidth: 460 }}>
          Real-time financial news analysis and sentiment scoring for high-speed trading.
        </p>
        <p style={{ fontSize: 13, color: '#9aa0b0', marginBottom: 40 }}>
          Enter any ticker to begin your deep dive.
        </p>

        {/* ── Search bar ────── */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 560, zIndex: 50 }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: '#fff', border: `1.5px solid ${focused ? '#3b5bdb' : '#e8eaf0'}`,
            borderRadius: 14, padding: '6px 8px 6px 16px',
            boxShadow: focused ? '0 0 0 3px rgba(59,91,219,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}>
            <Search style={{ width: 15, height: 15, color: '#9aa0b0', flexShrink: 0 }} />
            <input
              ref={inputRef}
              id="main-search"
              type="text"
              placeholder="Search stocks, tickers, or news (e.g. NVDA, AAPL, Tesla)..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                fontSize: 13, color: '#0f1117', padding: '8px 10px',
                fontFamily: 'inherit',
              }}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#9aa0b0', padding: '4px 6px', borderRadius: 6,
                }}
              >
                <X style={{ width: 13, height: 13 }} />
              </button>
            )}
            <button
              id="analyze-btn"
              onClick={handleAnalyze}
              style={{
                background: '#3b5bdb', color: '#fff', border: 'none', borderRadius: 10,
                padding: '10px 22px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', transition: 'opacity 0.15s',
                marginLeft: 4,
              }}
            >
              Analyze
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {open && (
            <div
              ref={dropdownRef}
              style={{
                position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
                background: '#fff', border: '1px solid #e8eaf0', borderRadius: 14,
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)', overflow: 'hidden',
                animation: 'fadeInDown 0.2s ease both',
              }}
            >
              {filtered.map((s, i) => {
                const sc = sentimentColors[s.sentiment];
                return (
                  <button
                    key={s.ticker}
                    onClick={() => handleSelect(s.ticker)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', background: 'none', border: 'none',
                      borderBottom: i < filtered.length - 1 ? '1px solid #f1f3f5' : 'none',
                      cursor: 'pointer', textAlign: 'left',
                      transition: 'background 0.12s',
                      animationDelay: `${i * 30}ms`,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fc')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                  >
                    <span style={{ fontSize: 20, width: 28, textAlign: 'center', lineHeight: 1 }}>{s.logo}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: 13, color: '#0f1117', margin: 0 }}>{s.ticker}</p>
                      <p style={{ fontSize: 11, color: '#9aa0b0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</p>
                    </div>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                      background: sc.bg, color: sc.color, letterSpacing: '0.05em', textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}>
                      {s.sentiment} SENTIMENT
                    </span>
                  </button>
                );
              })}
              <div style={{
                display: 'flex', gap: 16, justifyContent: 'flex-end',
                padding: '8px 16px', borderTop: '1px solid #f1f3f5',
                fontSize: 11, color: '#9aa0b0',
              }}>
                {[['↑↓', 'Navigate'], ['↵', 'Select'], ['ESC', 'Cancel']].map(([k, l]) => (
                  <span key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <kbd style={{ padding: '2px 5px', background: '#f1f3f5', borderRadius: 4, fontSize: 10, fontFamily: 'monospace' }}>{k}</kbd> {l}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Trending tickers ──── */}
        <div style={{ marginTop: 40, width: '100%', maxWidth: 560 }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9aa0b0', marginBottom: 14 }}>
            Trending Now
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
            {TRENDING.map(t => (
              <button
                key={t.ticker}
                onClick={() => navigate(`/stock/${t.ticker}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 16px', borderRadius: 999, border: '1px solid #e8eaf0',
                  background: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                  color: '#0f1117', fontFamily: 'inherit', transition: 'box-shadow 0.15s, transform 0.1s',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                {t.ticker}
                <span style={{ fontSize: 11, fontWeight: 700, color: t.up ? '#12a060' : '#e63946' }}>{t.change}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Feature cards ──── */}
        <div style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%', maxWidth: 640 }}>
          {[
            { icon: <Zap style={{ width: 20, height: 20, color: '#3b5bdb' }} />, title: 'AI Sentiment Analysis', desc: 'Processing millions of news articles daily to quantify market emotion with 96% accuracy.' },
            { icon: <BarChart2 style={{ width: 20, height: 20, color: '#3b5bdb' }} />, title: 'Bullish/Bearish Ratios', desc: 'Visualize the tug-of-war between market bulls and bears with our proprietary momentum index.' },
          ].map(card => (
            <div key={card.title} style={{
              background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20,
              padding: '28px 24px', textAlign: 'left',
              transition: 'box-shadow 0.15s, transform 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 12, background: '#eef0fc',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontWeight: 600, fontSize: 15, color: '#0f1117', marginBottom: 8 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: '#5a6070', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid #e8eaf0', background: '#fff', padding: '20px 32px' }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14, color: '#3b5bdb' }}>
            <BarChart2 style={{ width: 16, height: 16 }} /> STOCKVIBE
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 12, color: '#9aa0b0' }}>
            {['Documentation', 'API Access', 'Data Partners', 'Privacy'].map(l => (
              <a key={l} href="#" style={{ textDecoration: 'none', color: 'inherit' }}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 14, color: '#9aa0b0' }}>
            <a href="#"><Twitter style={{ width: 14, height: 14 }} /></a>
            <a href="#"><Github style={{ width: 14, height: 14 }} /></a>
          </div>
        </div>
        <p style={{ textAlign: 'center', fontSize: 11, color: '#c4c9d8', marginTop: 14 }}>
          © 2025 StockVibe ®. High-speed market data delivered by AI-momentum subscribers.
        </p>
      </footer>
    </div>
  );
}
