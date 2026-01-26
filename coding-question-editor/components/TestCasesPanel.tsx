import React, { useState } from 'react';
import { TestCase } from '../types';

interface TestCasesPanelProps {
  testCases: TestCase[];
  onTestCaseChange: (id: number, field: string, value: string) => void;
}

const TestCasesPanel: React.FC<TestCasesPanelProps> = ({
  testCases,
  onTestCaseChange
}) => {
  const [activeCaseId, setActiveCaseId] = useState(testCases[0]?.id || 1);
  const [isExpanded, setIsExpanded] = useState(true);

  const activeCase = testCases.find(tc => tc.id === activeCaseId) || testCases[0];

  return (
    <div className="shrink-0 bg-surface-light dark:bg-[#151b26] border-t border-border-light dark:border-border-dark flex flex-col z-10">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
      >
        <div className="flex items-center gap-2">
          <span className={`material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors ${isExpanded ? 'text-primary' : ''}`}>
            terminal
          </span>
          <span className={`text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors ${isExpanded ? 'text-primary' : ''}`}>
            Custom Input / Test Cases
          </span>
        </div>
        <span className={`material-symbols-outlined text-slate-500 transform transition-transform text-lg ${isExpanded ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 border-b border-border-light dark:border-border-dark animate-in slide-in-from-bottom-2 duration-200">
          <div className="flex gap-4 mb-3 overflow-x-auto no-scrollbar">
            {testCases.map((tc) => (
              <button
                key={tc.id}
                onClick={() => setActiveCaseId(tc.id)}
                className={`text-xs font-bold whitespace-nowrap pb-1 transition-colors border-b-2 ${
                  activeCaseId === tc.id
                    ? 'text-primary border-primary'
                    : 'text-slate-500 hover:text-slate-300 border-transparent'
                }`}
              >
                {tc.label}
              </button>
            ))}
            <button className="ml-auto text-xs font-medium text-slate-500 flex items-center gap-1 hover:text-primary whitespace-nowrap">
              <span className="material-symbols-outlined text-sm">add</span> Add Case
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(activeCase.inputs).map(([key, value]) => (
              <div key={key}>
                <label className="block text-xs font-mono text-slate-500 mb-1">{key} =</label>
                <input
                  className="w-full bg-slate-100 dark:bg-[#0d1117] border border-border-light dark:border-slate-700 rounded px-3 py-1.5 text-sm font-mono text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                  type="text"
                  value={value}
                  onChange={(e) => onTestCaseChange(activeCase.id, key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Bar inside the panel container to match layout */}
      <div className="h-16 shrink-0 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark px-6 flex items-center justify-end z-10">
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-lg border border-border-light dark:border-slate-600 text-slate-700 dark:text-slate-200 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">play_arrow</span>
            Run
          </button>
          <button className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-sm shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">cloud_upload</span>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCasesPanel;
