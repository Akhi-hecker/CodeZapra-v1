// Custom Code Editor Component
// Fully custom-built with manual syntax highlighting

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface CodeEditorProps {
    isLocked: boolean;
}

type Language = 'python' | 'java' | 'cpp';

const LANGUAGE_CONFIG: Record<Language, {
    label: string;
    keywords: string[];
    starter: string;
}> = {
    python: {
        label: 'Python',
        keywords: ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'range', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'and', 'or', 'not', 'True', 'False', 'None', 'print', 'len', 'self'],
        starter: '# Write your solution here\n\ndef solution():\n    pass\n'
    },
    java: {
        label: 'Java',
        keywords: ['public', 'private', 'protected', 'class', 'static', 'void', 'int', 'String', 'boolean', 'return', 'if', 'else', 'for', 'while', 'new', 'import', 'package', 'extends', 'implements', 'try', 'catch', 'finally', 'throw', 'throws', 'this', 'super', 'null', 'true', 'false'],
        starter: '// Write your solution here\n\npublic class Solution {\n    public static void main(String[] args) {\n        \n    }\n}\n'
    },
    cpp: {
        label: 'C++',
        keywords: ['include', 'using', 'namespace', 'std', 'int', 'void', 'return', 'if', 'else', 'for', 'while', 'class', 'public', 'private', 'protected', 'struct', 'template', 'typename', 'const', 'static', 'new', 'delete', 'nullptr', 'true', 'false', 'cout', 'cin', 'endl', 'vector', 'string', 'auto'],
        starter: '// Write your solution here\n\n#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n'
    }
};

export const CodeEditor = ({ isLocked }: CodeEditorProps) => {
    const [language, setLanguage] = useState<Language>('python');
    const [code, setCode] = useState(LANGUAGE_CONFIG.python.starter);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Update starter code when language changes
    useEffect(() => {
        setCode(LANGUAGE_CONFIG[language].starter);
    }, [language]);

    // Get line numbers
    const lineCount = code.split('\n').length;
    const lineNumbers = Array.from({ length: Math.max(lineCount, 20) }, (_, i) => i + 1);

    // Simple syntax highlighter
    const highlightCode = useCallback((text: string) => {
        const config = LANGUAGE_CONFIG[language];
        const lines = text.split('\n');

        return lines.map((line, lineIdx) => {
            const result: React.ReactNode[] = [];
            let remaining = line;

            // Handle comments
            const commentIdx = language === 'python' ? remaining.indexOf('#') : remaining.indexOf('//');
            if (commentIdx !== -1) {
                const before = remaining.slice(0, commentIdx);
                const comment = remaining.slice(commentIdx);
                remaining = before;
                result.push(highlightLine(remaining, config.keywords, `${lineIdx}-pre`));
                result.push(<span key={`${lineIdx}-comment`} className="syntax-comment">{comment}</span>);
                return <div key={lineIdx}>{result}</div>;
            }

            // Process line for keywords and strings
            return <div key={lineIdx}>{highlightLine(remaining, config.keywords, `${lineIdx}`)}</div>;
        });
    }, [language]);

    const highlightLine = (text: string, keywords: string[], keyPrefix: string): React.ReactNode[] => {
        const result: React.ReactNode[] = [];

        // Regex patterns
        const stringPattern = /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g;
        const numberPattern = /\b\d+\.?\d*\b/g;

        let lastIndex = 0;
        const matches: { start: number; end: number; type: string; content: string }[] = [];

        // Find strings
        let match;
        while ((match = stringPattern.exec(text)) !== null) {
            matches.push({ start: match.index, end: match.index + match[0].length, type: 'string', content: match[0] });
        }

        // Find numbers
        while ((match = numberPattern.exec(text)) !== null) {
            matches.push({ start: match.index, end: match.index + match[0].length, type: 'number', content: match[0] });
        }

        // Find keywords
        keywords.forEach(kw => {
            const kwPattern = new RegExp(`\\b${kw}\\b`, 'g');
            while ((match = kwPattern.exec(text)) !== null) {
                matches.push({ start: match.index, end: match.index + match[0].length, type: 'keyword', content: match[0] });
            }
        });

        // Sort by position
        matches.sort((a, b) => a.start - b.start);

        // Remove overlapping
        const filtered: typeof matches = [];
        matches.forEach(m => {
            if (filtered.length === 0 || m.start >= filtered[filtered.length - 1].end) {
                filtered.push(m);
            }
        });

        // Build result
        filtered.forEach((m, idx) => {
            if (m.start > lastIndex) {
                result.push(text.slice(lastIndex, m.start));
            }
            const className = m.type === 'string' ? 'syntax-string'
                : m.type === 'number' ? 'syntax-number'
                    : 'syntax-keyword';
            result.push(<span key={`${keyPrefix}-${idx}`} className={className}>{m.content}</span>);
            lastIndex = m.end;
        });

        if (lastIndex < text.length) {
            result.push(text.slice(lastIndex));
        }

        return result;
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
    };

    const handleRun = () => {
        // Placeholder for code execution
        console.log('Running code:', code);
        alert('Code execution coming soon! Your code has been logged to the console.');
    };

    return (
        <div className={`code-editor-container ${isLocked ? 'editor-locked' : ''}`}>
            {/* Locked Overlay */}
            {isLocked && (
                <div className="locked-overlay">
                    <svg
                        className="locked-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <p className="locked-text">
                        Explain your logic first. The code editor unlocks after verification.
                    </p>
                </div>
            )}

            {/* Header */}
            <div className="code-editor-header">
                <div className="editor-title">
                    <span className="editor-dot"></span>
                    Solution Editor
                </div>
                <select
                    className="language-selector"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    disabled={isLocked}
                >
                    {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
                        <option key={key} value={key}>{config.label}</option>
                    ))}
                </select>
            </div>

            {/* Editor Body */}
            <div className="code-editor-body">
                <div className="line-numbers">
                    {lineNumbers.map(num => (
                        <div key={num}>{num}</div>
                    ))}
                </div>
                <div className="code-input-wrapper">
                    {/* Syntax Highlighted Overlay */}
                    <div className="syntax-overlay" aria-hidden="true">
                        {highlightCode(code)}
                    </div>
                    {/* Actual Textarea */}
                    <textarea
                        ref={textareaRef}
                        className="code-textarea"
                        value={code}
                        onChange={handleCodeChange}
                        placeholder="Start typing your solution..."
                        spellCheck={false}
                        disabled={isLocked}
                        style={{ color: 'transparent', caretColor: 'var(--logic-code-accent)' }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="code-editor-footer">
                <span className="editor-stats">
                    {lineCount} lines • {code.length} characters
                </span>
                <button
                    className="run-btn"
                    onClick={handleRun}
                    disabled={isLocked}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Run Code
                </button>
            </div>
        </div>
    );
};
