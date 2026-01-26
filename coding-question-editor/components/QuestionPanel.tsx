import React from 'react';
import { QuestionData } from '../types';

interface QuestionPanelProps {
  data: QuestionData;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ data }) => {
  return (
    <section className="w-full lg:w-1/2 xl:w-[45%] flex flex-col border-r border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark overflow-hidden h-full">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-8">
        <div className="mb-2">
          <span className="text-primary font-bold text-sm tracking-wide uppercase">Coding Question - {data.id}</span>
        </div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{data.title}</h2>
        </div>
        
        {/* Description */}
        <div 
          className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 font-body leading-relaxed mb-8 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Examples */}
        <div className="space-y-6">
          {data.examples.map((example, index) => (
            <div key={example.id} className="rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden">
              <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-2 border-b border-border-light dark:border-border-dark flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Example {index + 1}</span>
              </div>
              <div className="p-4 grid grid-cols-[80px_1fr] gap-y-2 text-sm font-mono">
                <div className="text-slate-500">Input:</div>
                <div className="text-slate-800 dark:text-slate-200">{example.input}</div>
                <div className="text-slate-500">Output:</div>
                <div className="text-slate-800 dark:text-slate-200">{example.output}</div>
                {example.explanation && (
                  <>
                    <div className="text-slate-500">Explanation:</div>
                    <div className="text-slate-800 dark:text-slate-200">{example.explanation}</div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Constraints</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 font-mono">
            {data.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuestionPanel;
