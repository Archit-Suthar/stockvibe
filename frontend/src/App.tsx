import { TrendingUp } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-6 shadow-2xl">
            <TrendingUp className="w-16 h-16 text-pink-300" strokeWidth={2} />
          </div>
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
          StockVibe
        </h1>
        
        <p className="text-xl text-purple-200 mb-2">
          Hello World! 🚀
        </p>
        
        <p className="text-lg text-purple-300/80 max-w-md mx-auto">
          Your financial dashboard is ready to analyze the vibe of any stock ticker through AI-powered news processing.
        </p>
        
        <div className="mt-8 flex gap-4 justify-center">
          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
            <span className="text-white font-semibold">React 19</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
            <span className="text-white font-semibold">Tailwind CSS</span>
          </div>
          <div className="bg-white/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/10">
            <span className="text-white font-semibold">Vite</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
