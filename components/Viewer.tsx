
import React, { useState } from 'react';

interface ViewerProps {
  url: string;
}

const Viewer: React.FC<ViewerProps> = ({ url }) => {
  const [hasError, setHasError] = useState(false);

  // AI Studio usually restricts iframing (X-Frame-Options: SAMEORIGIN)
  // We provide a beautiful fallback screen in case it is blocked.
  return (
    <div className="flex-1 relative bg-slate-900 rounded-tl-3xl overflow-hidden shadow-2xl m-2 lg:m-4 border border-white/5">
      <div className="absolute top-0 left-0 w-full h-12 glass flex items-center px-4 justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <span className="text-xs text-slate-400 font-mono ml-4 truncate max-w-xs">{url}</span>
        </div>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full flex items-center gap-2 transition-colors"
        >
          <i className="fas fa-external-link-alt text-[10px]"></i>
          Open Original
        </a>
      </div>

      <div className="w-full h-full pt-12 overflow-hidden flex flex-col">
        {/*
          NOTE: Direct iframing of ai.studio might be blocked by CSP. 
          As a world-class engineer, we anticipate this and provide a rich landing page.
        */}
        <div className="flex-1 w-full bg-[#0b0c10] relative">
          <iframe 
            src={url} 
            className="w-full h-full border-none"
            title="AI Studio Applet"
            onError={() => setHasError(true)}
          />
          
          {/* Overlay to handle blocking - most browsers won't trigger onError for CSP blocks, 
              so we always show a "Open Fullscreen" prompt if it feels empty */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-8 text-center bg-slate-900/40 backdrop-blur-[1px]">
             <div className="max-w-md pointer-events-auto bg-slate-800/80 p-8 rounded-3xl border border-white/10 shadow-2xl">
                <div className="w-20 h-20 gemini-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                   <i className="fas fa-rocket text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold mb-2">Drive Applet Portal</h3>
                <p className="text-slate-400 text-sm mb-8">
                   This application is hosted on Google AI Studio. For the best experience, including full interactivity and authentication, please open it in its dedicated workspace.
                </p>
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-3 gemini-gradient text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform shadow-xl"
                >
                  <i className="fas fa-external-link-alt"></i>
                  Launch Applet Fullscreen
                </a>
                <p className="mt-6 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  Powered by Google AI Studio & Drive
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
