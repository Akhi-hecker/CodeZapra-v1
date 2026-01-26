import React, { useState } from 'react';
import QuestionPanel from './components/QuestionPanel';
import CodeEditor from './components/CodeEditor';
import TestCasesPanel from './components/TestCasesPanel';
import { QUESTION_DATA, DEFAULT_TEST_CASES, INITIAL_CODE_JS } from './constants';
import { TestCase } from './types';

const App: React.FC = () => {
  const [code, setCode] = useState(INITIAL_CODE_JS);
  const [language, setLanguage] = useState('javascript');
  const [testCases, setTestCases] = useState<TestCase[]>(DEFAULT_TEST_CASES);

  const handleTestCaseChange = (id: number, field: string, value: string) => {
    setTestCases(prev => prev.map(tc => {
      if (tc.id === id) {
        return {
          ...tc,
          inputs: {
            ...tc.inputs,
            [field]: value
          }
        };
      }
      return tc;
    }));
  };

  const handleReset = () => {
    if (confirm("Reset code to default?")) {
      setCode(INITIAL_CODE_JS);
    }
  };

  return (
    <main className="flex-1 flex flex-col lg:flex-row overflow-hidden h-screen w-full bg-background-light dark:bg-background-dark">
      {/* Left Panel: Question Description */}
      <QuestionPanel data={QUESTION_DATA} />

      {/* Right Panel: Code Editor & Test Cases */}
      <section className="w-full lg:w-1/2 xl:w-[55%] flex flex-col bg-code-bg relative overflow-hidden">
        
        {/* Top: Code Editor */}
        <CodeEditor 
          code={code} 
          onChange={setCode}
          language={language}
          onLanguageChange={setLanguage}
          onReset={handleReset}
        />

        {/* Bottom: Test Cases & Actions */}
        <TestCasesPanel 
          testCases={testCases}
          onTestCaseChange={handleTestCaseChange}
        />
        
      </section>
    </main>
  );
};

export default App;
