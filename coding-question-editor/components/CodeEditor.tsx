import React, { useState, useEffect, useRef } from 'react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onReset: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onLanguageChange,
  onReset
}) => {
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines);
  }, [code]);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (linesRef.current) {
      linesRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-code-bg min-h-0">
      {/* Header */}
      <div className="h-14 shrink-0 bg-surface-light dark:bg-[#151b26] border-b border-border-light dark:border-border-dark px-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="appearance-none bg-slate-100 dark:bg-slate-800 border-none text-slate-700 dark:text-slate-200 text-sm font-medium rounded pl-3 pr-8 py-1.5 focus:ring-1 focus:ring-primary cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors outline-none"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python 3</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none text-lg">
              arrow_drop_down
            </span>
          </div>
        </div>
        <button
          onClick={onReset}
          className="text-slate-500 hover:text-red-500 transition-colors p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
          title="Reset Code"
        >
          <span className="material-symbols-outlined text-xl">restart_alt</span>
        </button>
      </div>

      {/* Editor Area */}
      <div className="flex-1 overflow-hidden relative flex font-mono text-sm leading-6">
        {/* Line Numbers */}
        <div
          ref={linesRef}
          className="w-12 shrink-0 bg-[#0d1117] text-slate-600 flex flex-col items-end pr-3 pt-4 select-none border-r border-slate-800/50 overflow-hidden"
          aria-hidden="true"
        >
          {Array.from({ length: Math.max(lineCount, 15) }).map((_, i) => (
            <div key={i + 1} className="h-6 leading-6">{i + 1}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 bg-[#0d1117] text-slate-300 p-4 border-none outline-none resize-none custom-scrollbar font-mono leading-6 whitespace-pre"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </div>
    </div>
  );
};

export default CodeEditor;
