import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ text, content }) => {
  const value = typeof content === 'string' ? content : text;
  if (!value) return <span className="text-gray-400">No content</span>;
  return <ReactMarkdown className="prose prose-invert">{value}</ReactMarkdown>;
};

export default MarkdownRenderer;
