import React, { useState } from 'react';
import { marked } from 'marked';
import styled from 'styled-components';
import { getFontFamily } from '../styles/fonts';

const EditorContainer = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  background: white;
`;

const TabBar = styled.div`
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
`;

const Tab = styled.button`
  padding: 8px 16px;
  border: none;
  background: ${props => props.active ? 'white' : 'transparent'};
  color: ${props => props.active ? '#1a202c' : '#64748b'};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? '#3182ce' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    color: #1a202c;
    background: ${props => props.active ? 'white' : '#f1f5f9'};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: ${props => props.simple ? '80px' : '120px'};
  padding: 12px;
  border: none;
  outline: none;
  font-family: ${getFontFamily()};
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  cursor: text;
  user-select: text;
  
  &::placeholder {
    color: #9ca3af;
    font-style: normal;
  }
`;

const PreviewContainer = styled.div`
  padding: 12px;
  min-height: ${props => props.simple ? '80px' : '120px'};
  font-family: ${getFontFamily()};
  font-size: 14px;
  line-height: 1.5;
  color: #1a202c;
  background: #f9fafb;
  border-top: 1px solid #e2e8f0;
  cursor: text;
  user-select: text;
  
  p {
    margin: 0 0 8px 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  strong {
    font-weight: 600;
  }
  
  em {
    font-style: italic;
  }
  
  a {
    color: #3182ce;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  ul, ol {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 4px;
  }
`;

const HelpText = styled.div`
  padding: 8px 12px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  font-size: 11px;
  color: #64748b;
  line-height: 1.4;
`;

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
});

function MarkdownTextEditor({ value, onChange, placeholder, simple = false }) {
  const [activeTab, setActiveTab] = useState('write');
  
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  
  // Parse markdown to HTML and remove wrapping <p> tags for simple content
  const parseMarkdown = (text) => {
    if (!text) return '';
    try {
      let html = marked(text);
      // Remove wrapping <p> tags if it's simple content (single paragraph)
      if (simple && html.startsWith('<p>') && html.endsWith('</p>') && (html.match(/<p>/g) || []).length === 1) {
        html = html.slice(3, -4); // Remove <p> and </p>
      }
      return html;
    } catch (error) {
      return text; // Fallback to plain text if parsing fails
    }
  };

  return (
    <EditorContainer>
      <TabBar>
        <Tab 
          active={activeTab === 'write'} 
          onClick={() => setActiveTab('write')}
        >
          Write
        </Tab>
        <Tab 
          active={activeTab === 'preview'} 
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </Tab>
      </TabBar>
      
      {activeTab === 'write' ? (
        <TextArea
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          simple={simple}
        />
      ) : (
        <PreviewContainer 
          simple={simple}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
        />
      )}
      
      <HelpText>
        <strong>Markdown syntax:</strong> **bold**, *italic*, [link text](URL)
        {!simple && ', - bullets, 1. numbered lists'}
      </HelpText>
    </EditorContainer>
  );
}

export default MarkdownTextEditor;
