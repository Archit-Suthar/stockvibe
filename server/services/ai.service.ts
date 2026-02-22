import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Interface matching the structured JSON format from the prompt
 */
export interface AIVibeAnalysis {
  ticker: string;
  vibeMeter: {
    score: number;
    label: 'PANIC' | 'BEARISH' | 'NEUTRAL' | 'BULLISH' | 'EUPHORIA';
  };
  aiVibeSummary: string;
  bullishDrivers: Array<{ title: string; detail: string }>;
  bearishRisks: Array<{ title: string; detail: string }>;
}

/**
 * Calls Gemini API to perform a "Vibe Check" on a stock based on recent news.
 * @param ticker - The stock ticker symbol.
 * @param articles - Array of formatted news strings or objects.
 */
export async function analyzeStockVibe(ticker: string, articles: any[]): Promise<AIVibeAnalysis> {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    throw new Error('AI_API_KEY is not set in environment variables');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-2.5-flash as the default fast/cheap analysis model
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }, { apiVersion: 'v1beta' });

  // Format articles for the prompt
  const newsContext = articles
    .map((a, i) => `[Article ${i + 1}]\nHeadline: ${a.title}\nSummary: ${a.description || 'N/A'}\nDate: ${a.publishedAt}`)
    .join('\n\n');

  const prompt = `Act as a Senior Quantitative Analyst. Your task is to perform a "Vibe Check" on ${ticker} based ONLY on the provided news headlines and summaries. 

### CONSTRAINTS:
- DO NOT provide financial advice (no "Buy/Sell/Hold").
- Base all metrics strictly on the provided text.
- Return ONLY a valid JSON object.

### ANALYSIS INSTRUCTIONS:
1. VIBE SCORE: Calculate a sentiment score from 0 (Panic) to 100 (Euphoria).
2. SUMMARY: Write a 4-6 sentences (1-2 paragraphs) overview of the current sentiment trajectory.
3. DRIVERS: Identify 2 specific "Bullish Drivers" and 2 "Bearish Risks." Each driver must include a "Detail" string (e.g., "Lead times shortened by 15%").

### JSON SCHEMA:
{
  "ticker": "${ticker}",
  "vibeMeter": {
    "score": number,
    "label": "PANIC" | "BEARISH" | "NEUTRAL" | "BULLISH" | "EUPHORIA"
  },
  "aiVibeSummary": string,
  "bullishDrivers": [
    { "title": string, "detail": string },
    { "title": string, "detail": string }
  ],
  "bearishRisks": [
    { "title": string, "detail": string },
    { "title": string, "detail": string }
  ]
}

### INPUT DATA:
Stock symbol: ${ticker}
You can search about this stock and also use below articles(if needed) to perform the analysis:
News Articles:
${newsContext}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Strip Markdown code block backticks if present (e.g., ```json\n...\n```)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  const jsonStr = jsonMatch ? jsonMatch[1] : text;

  try {
    const analysis = JSON.parse(jsonStr) as AIVibeAnalysis;
    return analysis;
  } catch (error) {
    console.error('[ai.service] Failed to parse Gemini response. Raw text:', text);
    throw new Error('Gemini returned invalid JSON');
  }
}
