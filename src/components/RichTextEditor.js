import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { getFontFamily } from '../styles/fonts';

const EditorContainer = styled.div`
  .ql-toolbar {
    border-top: 1px solid #e2e8f0;
    border-left: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    background: #f8fafc;
    border-radius: 6px 6px 0 0;
  }
  
  .ql-container {
    border-bottom: 1px solid #e2e8f0;
    border-left: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    border-radius: 0 0 6px 6px;
    font-family: ${getFontFamily()};
  }
  
  .ql-editor {
    font-family: ${getFontFamily()};
    font-size: 14px;
    line-height: 1.5;
    min-height: ${props => props.simple ? '60px' : '120px'};
    cursor: text;
    user-select: text;
  }
  
  .ql-editor.ql-blank::before {
    font-style: normal;
    color: #9ca3af;
  }
`;

function RichTextEditor({ value, onChange, placeholder, simple = false }) {
  const modules = useMemo(() => ({
    toolbar: simple 
      ? [
          ['bold', 'italic'],
          ['link']
        ]
      : [
          ['bold', 'italic', 'underline'],
          ['link'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['clean']
        ]
  }), [simple]);

  const formats = [
    'bold', 'italic', 'underline',
    'link', 'list', 'bullet'
  ];

  return (
    <EditorContainer simple={simple}>
      <ReactQuill
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        theme="snow"
      />
    </EditorContainer>
  );
}

export default RichTextEditor;
