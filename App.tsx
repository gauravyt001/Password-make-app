import React, { useState, useEffect, useCallback } from 'react';
import { Copy, RefreshCw, ShieldCheck, Check, Info, ArrowLeft, Instagram, ExternalLink, User } from 'lucide-react';
import { generatePassword, calculateStrength } from './utils/passwordGenerator';
import { Checkbox } from './components/Checkbox';
import { StrengthIndicator } from './components/StrengthIndicator';

const App: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [includeLetters, setIncludeLetters] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');

  const handleGenerate = useCallback(() => {
    const newPassword = generatePassword({
      length,
      includeLetters,
      includeNumbers,
      includeSymbols,
    });
    setPassword(newPassword);
    setCopied(false);
  }, [length, includeLetters, includeNumbers, includeSymbols]);

  // Generate on initial mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  // Ensure at least one option is selected
  const handleOptionChange = (setter: (val: boolean) => void, currentValue: boolean, otherValues: boolean[]) => {
    if (currentValue && otherValues.every(v => !v)) {
      return; // Prevent unchecking the last option
    }
    setter(!currentValue);
  };

  const toggleView = () => {
    setCurrentView(prev => prev === 'home' ? 'about' : 'home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      
      {/* Main Card */}
      <main className="w-full max-w-md bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden relative">
        
        {/* Header */}
        <header className="bg-blue-600 p-6 text-center relative">
          {/* Navigation Button */}
          <button 
            onClick={toggleView}
            className="absolute top-6 right-6 text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
            title={currentView === 'home' ? "About Us" : "Back to Generator"}
          >
            {currentView === 'home' ? <Info size={24} /> : <ArrowLeft size={24} />}
          </button>

          <div className="flex justify-center mb-3">
            <div className="p-3 bg-white/10 rounded-full">
              <ShieldCheck className="text-white w-8 h-8" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {currentView === 'home' ? 'Classic Generator' : 'About Us'}
          </h1>
          <p className="text-blue-100 text-sm mt-1 opacity-90">
            {currentView === 'home' ? 'Secure passwords instantly' : 'Developer & Legal Info'}
          </p>
        </header>

        {/* Content Body */}
        <div className="p-8">
          
          {currentView === 'home' ? (
            /* --- HOME VIEW: GENERATOR --- */
            <div className="space-y-8">
              {/* Output Section */}
              <div className="space-y-2">
                 <label className="block text-sm font-medium text-slate-600 uppercase tracking-wide">Generated Password</label>
                 <div className="relative group">
                    <div className="w-full bg-slate-100 border-2 border-slate-200 rounded-lg p-4 pr-14 font-mono text-lg text-slate-800 break-all min-h-[3.5rem] flex items-center transition-colors group-hover:border-blue-300">
                      {password}
                    </div>
                    <button 
                      onClick={copyToClipboard}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                      title="Copy to clipboard"
                    >
                      {copied ? <span className="text-xs font-bold text-green-600">Copied!</span> : <Copy size={20} />}
                    </button>
                 </div>
                 <StrengthIndicator strength={calculateStrength(password)} />
              </div>

              <hr className="border-slate-100" />

              {/* Controls Section */}
              <div className="space-y-6">
                
                {/* Length Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-700 font-medium">Password Length</label>
                    <span className="bg-blue-50 text-blue-700 font-bold py-1 px-3 rounded-md text-sm border border-blue-100 min-w-[3rem] text-center">
                      {length}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="4" 
                    max="32" 
                    value={length} 
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                {/* Options */}
                <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Character Types</p>
                  <Checkbox 
                    label="Include Letters (A-z)" 
                    checked={includeLetters} 
                    onChange={() => handleOptionChange(setIncludeLetters, includeLetters, [includeNumbers, includeSymbols])}
                  />
                  <Checkbox 
                    label="Include Numbers (0-9)" 
                    checked={includeNumbers} 
                    onChange={() => handleOptionChange(setIncludeNumbers, includeNumbers, [includeLetters, includeSymbols])}
                  />
                  <Checkbox 
                    label="Include Symbols (!@#)" 
                    checked={includeSymbols} 
                    onChange={() => handleOptionChange(setIncludeSymbols, includeSymbols, [includeLetters, includeNumbers])}
                  />
                </div>

                {/* Generate Button */}
                <button 
                  onClick={handleGenerate}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 px-4 rounded-lg shadow-md shadow-blue-600/20 transition-all duration-200 flex items-center justify-center space-x-2 group"
                >
                  <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span>Generate New Password</span>
                </button>

              </div>
            </div>
          ) : (
            /* --- ABOUT VIEW --- */
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Developer Section */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center border-2 border-blue-100">
                  <User size={40} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Gaurav</h2>
                  <p className="text-slate-500 text-sm">Lead Developer</p>
                </div>
                
                <a 
                  href="https://instagram.com/gauravyt_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2.5 rounded-full font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Instagram size={18} />
                  <span>Follow @gauravyt_</span>
                  <ExternalLink size={14} className="opacity-70" />
                </a>
              </div>

              <hr className="border-slate-100" />

              {/* Disclaimer & Policy */}
              <div className="space-y-6 text-sm text-slate-600">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                    <span className="w-1 h-4 bg-blue-600 rounded-full block"></span>
                    <span>Disclaimer</span>
                  </h3>
                  <p className="leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    This application generates random passwords locally on your device using the browser's cryptographic API. No password data is transmitted to any server or stored by us. Please use generated passwords at your own risk and store them securely.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-slate-800 flex items-center space-x-2">
                    <span className="w-1 h-4 bg-blue-600 rounded-full block"></span>
                    <span>Copyright Policy</span>
                  </h3>
                  <p className="leading-relaxed">
                    &copy; {new Date().getFullYear()} Classic Password Generator. All rights reserved. 
                    Unauthorized reproduction or distribution of this software, or any portion of it, may result in severe civil and criminal penalties.
                  </p>
                </div>
              </div>

              {/* Back Button (Duplicate for convenience) */}
              <button 
                onClick={toggleView}
                className="w-full mt-4 py-3 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <ArrowLeft size={16} />
                <span>Back to Generator</span>
              </button>
            </div>
          )}

        </div>
        
        {/* Footer */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">Classic Password Generator &copy; {new Date().getFullYear()}</p>
        </div>
      </main>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center space-x-2 transition-all duration-300 transform ${copied ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-green-500 rounded-full p-1">
          <Check size={12} strokeWidth={4} />
        </div>
        <span className="font-medium text-sm">Password copied to clipboard</span>
      </div>

    </div>
  );
};

export default App;