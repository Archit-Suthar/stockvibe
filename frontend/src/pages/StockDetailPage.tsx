import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, BarChart2, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';

type Sentiment = 'BULLISH' | 'NEUTRAL' | 'BEARISH';

interface NewsItem {
  date: string;
  score: number;
  headline: string;
  source: string;
  impact: string;
  sentiment: Sentiment;
}

interface StockData {
  ticker: string;
  name: string;
  price: string;
  change: string;
  changeUp: boolean;
  vibeScore: number;
  vibeLabel: string;
  summary: string;
  bullishDrivers: string[];
  bearishRisks: string[];
  news: NewsItem[];
}

const STOCK_DATA: Record<string, StockData> = {
  NVDA: {
    ticker: 'NVDA', name: 'NVIDIA Corporation', price: '$875.40', change: '+14.2%', changeUp: true,
    vibeScore: 78, vibeLabel: 'BULLISH SENTIMENT',
    summary: `Sentiment for NVDA remains strongly positive despite macro volatility. Bullishness is driven by a 40% surge in mentions of "next-gen Blackwell architecture" and positive analyst revisions following recent data center reports. Retail sentiment is lagging behind institutional conviction, suggesting potential for further upside.`,
    bullishDrivers: ['Supply Chain Recovery — Lead times fell to 4x; chips shortened by 15% this quarter', 'Analyst Upgrades — Three major banks raised price targets to $900+ this morning'],
    bearishRisks: ['Regulatory Headwinds — Increased scrutiny on market dominance in specialized AI hardware', 'Overcrowded Trade — Hedge fund exposure reached a 12-month high last Friday'],
    news: [
      { date: 'JAN 12', score: +12, headline: 'Tech Giants Expand Data Center Spend: A Massive Win for AI Infrastructure', source: 'Bloomberg', impact: 'High', sentiment: 'BULLISH' },
      { date: 'JAN 12', score: -4,  headline: 'Chip Export Limitations Re-evaluated by Regional Trade Council',           source: 'Reuters',   impact: 'Medium', sentiment: 'NEUTRAL' },
      { date: 'JAN 11', score: +8,  headline: 'Proprietary Benchmarks Show 2x Performance Gain in Next-Gen Architecture', source: 'TechWire',  impact: 'Medium', sentiment: 'BULLISH' },
    ],
  },
  AAPL: {
    ticker: 'AAPL', name: 'Apple Inc.', price: '$197.20', change: '+2.14%', changeUp: true,
    vibeScore: 62, vibeLabel: 'BULLISH SENTIMENT',
    summary: `Apple sentiment is moderately bullish, buoyed by strong iPhone 16 upgrade cycle data and sustained services revenue growth. Vision Pro media coverage has normalized, keeping institutional interest elevated. However, China exposure and regulatory pressure in the EU create headwinds.`,
    bullishDrivers: ['iPhone 16 Cycle — Early sales data suggests 18% YoY upgrade adoption', 'Services Revenue — Record $24B quarter driven by App Store and Apple TV+'],
    bearishRisks: ['China Headwinds — Huawei competition intensifying in premium segment', 'EU DMA Compliance — Regulatory costs estimated at $800M annually'],
    news: [
      { date: 'JAN 14', score: +9, headline: 'iPhone 16 Breaks Pre-order Records in Key Asian Markets', source: 'Bloomberg', impact: 'High',   sentiment: 'BULLISH' },
      { date: 'JAN 13', score: -3, headline: 'EU Regulators Open New DMA Probe Into App Store Policies', source: 'Reuters',   impact: 'Medium', sentiment: 'BEARISH' },
      { date: 'JAN 13', score: +5, headline: 'Apple Services Revenue Hits All-Time High for Third Straight Quarter', source: 'CNBC', impact: 'Medium', sentiment: 'BULLISH' },
    ],
  },
  TSLA: {
    ticker: 'TSLA', name: 'Tesla, Inc.', price: '$248.50', change: '+1.08%', changeUp: true,
    vibeScore: 44, vibeLabel: 'NEUTRAL SENTIMENT',
    summary: `Tesla sentiment is split between optimism around the Cybertruck ramp and FSD v12 progress, and concern over Q4 delivery miss and intensifying EV competition from BYD and legacy automakers. Retail holders remain bullish while institutional flows have been broadly negative since January.`,
    bullishDrivers: ['FSD Progress — v12 beta expanding; milestone autonomy metrics improving', 'Cybertruck Ramp — Production hitting 1,200 units/week ahead of schedule'],
    bearishRisks: ['Delivery Miss — Q4 deliveries 3% below consensus estimates', 'EV Competition — BYD surpassed Tesla in global EV sales for first time'],
    news: [
      { date: 'JAN 15', score: -6, headline: 'Tesla Q4 Deliveries Fall Short of Analyst Expectations by 3%', source: 'Reuters',    impact: 'High',   sentiment: 'BEARISH' },
      { date: 'JAN 14', score: +4, headline: 'FSD Version 12 Beta Expansion to 500K Vehicles This Month',   source: 'TechCrunch', impact: 'Medium', sentiment: 'BULLISH' },
      { date: 'JAN 13', score: 0,  headline: 'Cybertruck Production Hits Weekly Milestone Ahead of Schedule',source: 'Electrek',   impact: 'Low',    sentiment: 'NEUTRAL' },
    ],
  },
  MSFT: {
    ticker: 'MSFT', name: 'Microsoft Corporation', price: '$415.32', change: '-0.2%', changeUp: false,
    vibeScore: 69, vibeLabel: 'BULLISH SENTIMENT',
    summary: `Microsoft maintains strong bullish sentiment driven by Azure AI adoption and Copilot enterprise momentum. The slight dip in stock price is attributed to profit-taking after a strong run. Azure growth numbers continue to beat consensus, with AI workloads now representing 35% of incremental cloud revenue.`,
    bullishDrivers: ['Azure AI — AI workloads driving 35% of incremental cloud revenue', 'Copilot Enterprise — 500K+ seats added in Q4, ahead of guidance'],
    bearishRisks: ['Valuation Stretched — Forward P/E at 33x vs 5-year average of 28x', 'Regulatory Risk — DOJ review of OpenAI partnership ongoing'],
    news: [
      { date: 'JAN 15', score: +10, headline: 'Azure AI Services Revenue Grows 60% YoY, Beats Consensus', source: 'Bloomberg', impact: 'High',   sentiment: 'BULLISH' },
      { date: 'JAN 14', score: -2,  headline: 'DOJ Expands Review of Microsoft-OpenAI AI Partnership',     source: 'WSJ',       impact: 'Medium', sentiment: 'NEUTRAL' },
      { date: 'JAN 14', score: +7,  headline: 'Microsoft Copilot Reaches 1M Enterprise Users Milestone',   source: 'CNBC',      impact: 'Medium', sentiment: 'BULLISH' },
    ],
  },
  AMZN: {
    ticker: 'AMZN', name: 'Amazon.com, Inc.', price: '$186.94', change: '+0.98%', changeUp: true,
    vibeScore: 73, vibeLabel: 'BULLISH SENTIMENT',
    summary: `Amazon sentiment is bullish, led by AWS AI services growth and strong holiday retail numbers. Advertising revenue continues to outperform, growing at 26% YoY. Logistics cost improvements and Kuiper satellite program milestones are providing additional positive tailwinds.`,
    bullishDrivers: ['AWS AI — Bedrock and SageMaker adoption accelerating among enterprise', 'Ad Revenue — 26% YoY growth, outpacing Meta and Alphabet growth rates'],
    bearishRisks: ['Antitrust Risk — FTC lawsuit over marketplace practices proceeding', 'CapEx Surge — $75B in planned 2025 AI infrastructure spend raises margin concern'],
    news: [
      { date: 'JAN 16', score: +11, headline: 'AWS Bedrock Announces 200 New Enterprise Customers in Q4',              source: 'TechCrunch', impact: 'High',   sentiment: 'BULLISH' },
      { date: 'JAN 15', score: -5,  headline: 'FTC Moves Forward with Antitrust Case Against Amazon Marketplace',      source: 'Reuters',    impact: 'Medium', sentiment: 'BEARISH' },
      { date: 'JAN 14', score: +6,  headline: 'Amazon Advertising Revenue Hits Record $17B in Holiday Quarter',        source: 'Bloomberg',  impact: 'Medium', sentiment: 'BULLISH' },
    ],
  },
};

const DEFAULT_DATA = (ticker: string): StockData => ({
  ticker, name: `${ticker} Corp.`, price: '$150.00', change: '+0.00%', changeUp: true,
  vibeScore: 50, vibeLabel: 'NEUTRAL SENTIMENT',
  summary: `No detailed sentiment data available for ${ticker} yet. Our AI is actively processing news.`,
  bullishDrivers: ['General market tailwinds supporting sector growth', 'Recent volume spike suggesting institutional accumulation'],
  bearishRisks: ['Limited public data for accurate sentiment scoring', 'Market-wide uncertainty creating sector headwinds'],
  news: [
    { date: 'JAN 15', score: 0, headline: `${ticker} trades in line with broader market indices`, source: 'MarketWatch', impact: 'Low', sentiment: 'NEUTRAL' },
  ],
});

const sentimentColors: Record<Sentiment, { bg: string; color: string }> = {
  BULLISH: { bg: '#d3f9e2', color: '#12a060' },
  NEUTRAL: { bg: '#fff4de', color: '#f4a200' },
  BEARISH: { bg: '#fde8ea', color: '#e63946' },
};

function vibeColor(score: number) {
  if (score >= 65) return '#12a060';
  if (score >= 40) return '#f4a200';
  return '#e63946';
}

function VibeMeter({ score }: { score: number }) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div style={{ position: 'relative', padding: '0 8px' }}>
      {/* Gradient bar */}
      <div style={{
        height: 12, borderRadius: 99, margin: '0 0 8px',
        background: 'linear-gradient(90deg, #e63946 0%, #f4a200 38%, #f4a200 52%, #12a060 100%)',
        position: 'relative',
      }}>
        {/* Pill indicator */}
        <div style={{
          position: 'absolute', top: '50%', transform: 'translate(-50%, -50%)',
          left: `${pct}%`, width: 22, height: 22, borderRadius: '50%',
          background: vibeColor(score), border: '3px solid #fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)', transition: 'left 0.4s ease',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9aa0b0', marginTop: 4 }}>
        <span>Panic</span>
        <span>Neutral</span>
        <span>Euphoria</span>
      </div>
    </div>
  );
}

export default function StockDetailPage() {
  const { ticker } = useParams<{ ticker: string }>();
  const navigate = useNavigate();
  const [query, setQuery] = useState(ticker?.toUpperCase() ?? '');
  const stock = ticker ? (STOCK_DATA[ticker.toUpperCase()] ?? DEFAULT_DATA(ticker.toUpperCase())) : DEFAULT_DATA('UNKNOWN');
  const sc = sentimentColors[stock.vibeLabel.includes('BULLISH') ? 'BULLISH' : stock.vibeLabel.includes('BEARISH') ? 'BEARISH' : 'NEUTRAL'];

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && query.trim()) navigate(`/stock/${query.trim().toUpperCase()}`);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fc' }}>
      {/* ── Sticky nav ─────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40,
        borderBottom: '1px solid #e8eaf0', background: '#fff',
      }}>
        <div style={{
          maxWidth: 900, margin: '0 auto', padding: '0 32px',
          height: 56, display: 'flex', alignItems: 'center', gap: 16,
        }}>
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              fontWeight: 700, fontSize: 14, color: '#3b5bdb',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', flexShrink: 0,
              padding: 0,
            }}
          >
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
            <p style={{ fontWeight: 700, fontSize: 14, color: stock.changeUp ? '#12a060' : '#e63946', margin: 0, lineHeight: 1.3 }}>
              {stock.ticker} {stock.change}
            </p>
            <p style={{ fontSize: 11, color: '#9aa0b0', margin: 0 }}>{stock.name}</p>
          </div>
        </div>
      </nav>

      {/* ── Main ─────────────────────────────────────────── */}
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Vibe Meter card */}
        <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '28px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f1117', margin: 0, marginBottom: 4 }}>The Vibe Meter</h2>
              <p style={{ fontSize: 12, color: '#9aa0b0', margin: 0 }}>Real-time aggregate sentiment from 4,200+ sources</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 56, fontWeight: 800, color: vibeColor(stock.vibeScore), margin: 0, lineHeight: 1 }}>{stock.vibeScore}</p>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                background: sc.bg, color: sc.color, letterSpacing: '0.06em',
                textTransform: 'uppercase', display: 'inline-block', marginTop: 6,
              }}>
                {stock.vibeLabel}
              </span>
            </div>
          </div>
          <VibeMeter score={stock.vibeScore} />
        </div>

        {/* AI Vibe Summary */}
        <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 20, padding: '24px 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, background: '#3b5bdb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <BarChart2 style={{ width: 13, height: 13, color: '#fff' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 12, color: '#3b5bdb', letterSpacing: '0.06em', textTransform: 'uppercase' }}>AI Vibe Summary</span>
          </div>
          <p style={{ fontSize: 14, color: '#3730a3', lineHeight: 1.7, margin: 0 }}>
            {stock.summary}
          </p>
        </div>

        {/* Drivers & Risks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Bullish */}
          <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <TrendingUp style={{ width: 15, height: 15, color: '#12a060' }} />
              <span style={{ fontWeight: 600, fontSize: 13, color: '#12a060' }}>Bullish Drivers</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {stock.bullishDrivers.map((d, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#5a6070', lineHeight: 1.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#12a060', flexShrink: 0, marginTop: 6 }} />
                  {d}
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
              {stock.bearishRisks.map((r, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#5a6070', lineHeight: 1.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e63946', flexShrink: 0, marginTop: 6 }} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* News */}
        <div style={{ background: '#fff', border: '1px solid #e8eaf0', borderRadius: 20, overflow: 'hidden' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '18px 28px', borderBottom: '1px solid #e8eaf0',
          }}>
            <h3 style={{ fontWeight: 600, fontSize: 14, color: '#0f1117', margin: 0 }}>Latest Vibe-Shifting News</h3>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 12, fontWeight: 600, color: '#3b5bdb',
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              VIEW ALL NEWS <ChevronRight style={{ width: 12, height: 12 }} />
            </button>
          </div>
          {stock.news.map((item, i) => {
            const nsc = sentimentColors[item.sentiment];
            return (
              <div
                key={i}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  padding: '18px 28px',
                  borderBottom: i < stock.news.length - 1 ? '1px solid #f1f3f5' : 'none',
                  cursor: 'pointer', transition: 'background 0.12s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#fafbfc')}
                onMouseLeave={e => (e.currentTarget.style.background = 'none')}
              >
                {/* Date + score */}
                <div style={{ flexShrink: 0, textAlign: 'center', width: 52 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: '#9aa0b0', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.date}</p>
                  <p style={{
                    fontSize: 14, fontWeight: 700, margin: '4px 0 0',
                    color: item.score > 0 ? '#12a060' : item.score < 0 ? '#e63946' : '#f4a200',
                  }}>
                    {item.score > 0 ? `+${item.score}` : item.score}
                  </p>
                </div>
                {/* Headline */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#0f1117', margin: 0, marginBottom: 4, lineHeight: 1.45 }}>
                    {item.headline}
                  </p>
                  <p style={{ fontSize: 11, color: '#9aa0b0', margin: 0 }}>
                    Source: {item.source} · Impact: {item.impact}
                  </p>
                </div>
                {/* Sentiment badge */}
                <span style={{
                  flexShrink: 0, fontSize: 10, fontWeight: 700, padding: '3px 10px',
                  borderRadius: 20, background: nsc.bg, color: nsc.color,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>
                  {item.sentiment}
                </span>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
}
