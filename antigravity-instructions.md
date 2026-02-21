1. Core Tech Stack
Frontend: React 19 (Vite), Tailwind CSS v4, Lucide React (Icons).

Backend: Node.js (Express), dotenv (Security), cors.

AI: Gemini 1.5 Flash (via @google/generative-ai).

Data: Finnhub API (REST).

Storage: localStorage for search history (No DB).

2. Architectural Boundaries
The "Proxy" Rule: The Frontend is prohibited from calling Finnhub or Gemini directly. All requests must go through the Node.js server to protect API keys and centralize logic.

Service Pattern: Logic must be split into service files.

server/services/finance.service.js (API calls to Finnhub).

server/services/ai.service.js (Prompt logic and Gemini calls).

Component Purity: Keep UI components under 150 lines. If a component grows larger, extract sub-components (e.g., VibeMeter.jsx, ProsConsList.jsx).

3. AI Safety & Compliance (Strict)
Neutrality: The AI must never use advisory verbs (buy, sell, hold, invest). Use descriptive adjectives (bullish, volatile, optimistic).

Fact-Anchoring: Summaries must be strictly derived from the provided headlines. If headlines are missing, return: "Insufficient current news for analysis."

Formatting: The AI must always return data in JSON format to prevent the frontend from breaking on "conversational" AI text.

4. Code Quality Standards
Modern JS: Use Optional Chaining (?.), Nullish Coalescing (??), and Async/Await.

Tailwind: Use utility classes only. No custom .css files unless strictly necessary for complex animations.

Responsive: All components must be mobile-first (use md: and lg: prefixes).