
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { generateAssistantResponse } from '../services/geminiService';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your AI Studio guide. How can I help you explore this app today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, content: m.content }));
    const responseText = await generateAssistantResponse(input, history);

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <aside className={`fixed inset-y-0 right-0 w-80 glass z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:relative lg:translate-x-0 flex flex-col`}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-robot text-indigo-400"></i>
          Guide
        </h2>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-3 rounded-2xl animate-pulse flex gap-1">
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="Ask anything..."
            className="w-full bg-slate-900 border border-white/10 rounded-xl py-2 px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none min-h-[44px]"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 bottom-2 text-indigo-500 hover:text-indigo-400 disabled:opacity-50"
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
