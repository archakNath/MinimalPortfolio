import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
// You can import any theme from 'react-syntax-highlighter/dist/esm/styles/prism'

const CodeBlock = ({ language, children }) => {
  return (
    <div className="code-block-wrapper my-4 rounded-lg overflow-hidden border border-border-color">
      <div className="px-4 py-2 border-b border-border-color bg-bg-primary text-text-secondary text-xs font-mono">
        {language || 'code'}
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={vscDarkPlus}
        showLineNumbers={true} // Enable line numbers
        wrapLines={true} // Allows lines to be wrapped
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'var(--bg-secondary)',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        lineNumberStyle={{
          color: 'var(--text-secondary)',
          fontSize: '0.75rem',
          minWidth: '2.5em',
          paddingRight: '1em',
          textAlign: 'right',
          userSelect: 'none',
        }}
      >
        {String(children).trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;