
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const targetUrl = "https://ai.studio/apps/drive/1QfqOzddN3eB4cBxDMnJayuRZg3f3kXmm?fullscreenApplet=true";

  return (
    <div className="flex h-screen w-full bg-slate-950 font-sans text-slate-200 overflow-hidden">
      {/* Navigation / Header */}
      <div className="fixed top-0 left-0 right-0 h-16 glass z-40 px-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gemini-gradient flex items-center justify-center shadow-lg">
            <i className="fas fa-microchip text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AI Studio <span className="text-indigo-400 font-normal">Hub</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-widest">APPLET VIEWER v1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-2"
          >
            <i className={`fas ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'} text-indigo-400`}></i>
            <span className="text-xs font-semibold hidden md:inline">Guide</span>
          </button>
          
          <div className="hidden md:flex gap-2">
             <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
               <i className="fas fa-user text-xs text-indigo-400"></i>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex flex-1 pt-16 h-full transition-all duration-300">
        <Viewer url={targetUrl} />
        
        {/* Chat Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      </main>

      {/* Background Decorative Elements */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

export default App;
