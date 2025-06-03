
import React, { useState, useCallback } from 'react';

interface GeneratedPromptDisplayProps {
  indonesianPrompt: string;
  englishPrompt: string;
  onIndonesianPromptChange: (newPrompt: string) => void;
  isLoading: boolean;
}

const GeneratedPromptDisplay: React.FC<GeneratedPromptDisplayProps> = ({
  indonesianPrompt,
  englishPrompt,
  onIndonesianPromptChange,
  isLoading,
}) => {
  const [copiedIndonesian, setCopiedIndonesian] = useState(false);
  const [copiedEnglish, setCopiedEnglish] = useState(false);

  const handleCopy = useCallback(async (textToCopy: string, setCopiedState: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!textToCopy) return;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2500);
    } catch (err) {
      console.error('Gagal menyalin prompt:', err);
      alert('Gagal menyalin prompt. Silakan coba salin secara manual.');
    }
  }, []);

  if (isLoading) {
    return (
      <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-xl text-center" aria-live="polite">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
        <p className="text-xl font-semibold text-indigo-400">
          Membuat &amp; menerjemahkan prompt dengan AI...
        </p>
        <p className="text-gray-400">Ini mungkin memerlukan beberapa saat.</p>
      </div>
    );
  }

  if (!indonesianPrompt && !englishPrompt) {
    return null;
  }

  return (
    <div className="mt-10 space-y-8">
      {indonesianPrompt && (
        <div className="p-6 bg-gray-800 rounded-xl shadow-xl">
          <h3 className="text-xl font-semibold text-indigo-400 mb-3">
            Prompt (Bahasa Indonesia - Dapat Diedit)
          </h3>
          <textarea
            value={indonesianPrompt}
            onChange={(e) => onIndonesianPromptChange(e.target.value)}
            className="w-full p-4 bg-gray-900 border border-gray-700 rounded-md text-gray-300 whitespace-pre-wrap break-words min-h-[150px] max-h-[400px] overflow-y-auto focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            rows={6}
            aria-label="Prompt Bahasa Indonesia yang dapat diedit"
          />
          <button
            onClick={() => handleCopy(indonesianPrompt, setCopiedIndonesian)}
            className="mt-4 w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 disabled:opacity-50"
            disabled={!indonesianPrompt}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>{copiedIndonesian ? 'Berhasil Disalin!' : 'Salin Prompt Indonesia'}</span>
          </button>
        </div>
      )}

      {englishPrompt && (
        <div className="p-6 bg-gray-800 rounded-xl shadow-xl">
          <h3 className="text-xl font-semibold text-teal-400 mb-3">
            Final Prompt (English - Tidak Dapat Diedit)
          </h3>
          <div 
            className="p-4 bg-gray-900 rounded-md text-gray-300 whitespace-pre-wrap break-words min-h-[150px] max-h-[400px] overflow-y-auto"
            aria-label="Prompt Final Bahasa Inggris"
          >
            {englishPrompt}
          </div>
          <button
            onClick={() => handleCopy(englishPrompt, setCopiedEnglish)}
            className="mt-4 w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 flex items-center justify-center space-x-2 disabled:opacity-50"
            disabled={!englishPrompt}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>{copiedEnglish ? 'Berhasil Disalin!' : 'Salin Prompt Inggris'}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratedPromptDisplay;
