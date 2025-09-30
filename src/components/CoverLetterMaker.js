import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { marked } from 'marked';
import { getFontFamily } from '../styles/fonts';
import MarkdownTextEditor from './MarkdownTextEditor';
import AppHeader from './AppHeader';
import './PrintableResume.css';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
  font-family: ${getFontFamily()};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftPane = styled.div`
  flex: 1;
  background: white;
  border-right: 2px solid #e2e8f0;
  overflow-y: auto;
  padding: 20px;
`;

const RightPane = styled.div`
  flex: 1;
  background: #f1f5f9;
  overflow-y: auto;
  padding: 20px;
  position: relative;
`;

const Heading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 12px 0;
`;

const HelperText = styled.p`
  margin: 0 0 16px 0;
  color: #64748b;
  font-size: 13px;
`;

const STORAGE_KEY = 'cover-letter-content';

const PreviewViewport = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ScaledWrapper = styled.div`
  position: relative;
`;

const PrintIframe = styled.iframe`
  width: 850px;
  height: 1100px;
  border: none;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

const FloatingControls = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: ${props => props.variant === 'save' ? '#10b981' : '#3182ce'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover {
    transform: translateY(-1px);
    background: ${props => props.variant === 'save' ? '#0ea371' : '#2c5aa0'};
  }
`;

const ResetButton = styled(Button)`
  background: #ef4444;
  &:hover { background: #dc2626; }
`;

const ZoomControls = styled.div`
  position: fixed;
  bottom: 20px;
  left: calc(50% + 20px);
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const ZoomButton = styled.button`
  background: #ffffff;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: #f3f4f6; }
`;

const ZoomSlider = styled.input`
  appearance: none;
  width: 160px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 9999px;
  outline: none;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #6366f1;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }
`;

const ZoomLabel = styled.span`
  min-width: 48px;
  text-align: right;
  color: #374151;
  font-size: 12px;
`;

const NavRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-bottom: 12px;
`;

const NavLink = styled(Link)`
  background: #6366f1;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
`;

// Configure marked options
marked.setOptions({ breaks: true, gfm: true });

function CoverLetterMaker({ resumeData }) {
  const [coverLetterText, setCoverLetterText] = useState('');
  const iframeRef = useRef(null);
  const BASE_WIDTH = 850;
  const BASE_HEIGHT = 1100;
  const [zoom, setZoom] = useState(0.8);
  const clampedZoom = useMemo(() => Math.min(2, Math.max(0.5, zoom)), [zoom]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCoverLetterText(saved);
    } catch (_) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, coverLetterText);
    } catch (_) {
      // ignore
    }
  }, [coverLetterText]);

  const coverLetterHtml = useMemo(() => {
    try {
      return marked(coverLetterText || '');
    } catch (_) {
      return coverLetterText || '';
    }
  }, [coverLetterText]);

  const personal = resumeData?.personal?.data || {};

  const handlePrint = useCallback(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  }, []);

  const incrementZoom = useCallback(() => setZoom((z) => Math.min(2, Math.round((z + 0.1) * 100) / 100)), []);
  const decrementZoom = useCallback(() => setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 100) / 100)), []);
  const handleSlider = useCallback((e) => setZoom(parseFloat(e.target.value)), []);

  const saveCoverLetterToCode = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/api/save-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: coverLetterText })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Failed to save');
      }
      alert('Saved to src/data/coverLetterData.js');
    } catch (error) {
      console.error('Save failed:', error);
      alert(`Save failed: ${error.message}. Is the local API running?`);
    }
  }, [coverLetterText]);

  return (
    <PageContainer>
      <AppHeader />
      <Content>
        <LeftPane>
          {/* Back to Resume removed per request */}
          <Heading>Cover Letter Content</Heading>
          <HelperText>Paste or write your cover letter. Markdown supported for basic formatting.</HelperText>
          <MarkdownTextEditor
            value={coverLetterText}
            onChange={setCoverLetterText}
            placeholder={'Dear Hiring Manager,\n\nI am writing to express my interest in ...'}
          />
        </LeftPane>
        <RightPane>
          <PreviewViewport>
            <ScaledWrapper style={{ width: BASE_WIDTH * clampedZoom, height: BASE_HEIGHT * clampedZoom }}>
              <PrintIframe
                ref={iframeRef}
                src="/cover-letter/print"
                title="Cover Letter Print Preview"
                sandbox="allow-same-origin allow-scripts allow-modals allow-popups"
                style={{ transform: `scale(${clampedZoom})`, transformOrigin: 'top left' }}
              />
            </ScaledWrapper>
          </PreviewViewport>

          <FloatingControls>
            <Button onClick={() => { saveCoverLetterToCode(); try { alert('Cover letter saved to code.'); } catch (_) {} }} variant="save">
              <i className="fas fa-save"></i>
              Save to Code
            </Button>
            <ResetButton onClick={() => { localStorage.removeItem('cover-letter-content'); try { alert('Cover letter content cleared.'); } catch (_) {} }}>
              <i className="fas fa-undo"></i>
              Reset Data
            </ResetButton>
            <Button onClick={handlePrint}>
              <i className="fas fa-download"></i>
              Print PDF
            </Button>
          </FloatingControls>

          <ZoomControls>
            <ZoomButton onClick={decrementZoom}>−</ZoomButton>
            <ZoomSlider
              type="range"
              min="0.5"
              max="2"
              step="0.05"
              value={clampedZoom}
              onChange={handleSlider}
              aria-label="Zoom"
            />
            <ZoomButton onClick={incrementZoom}>+</ZoomButton>
            <ZoomLabel>{Math.round(clampedZoom * 100)}%</ZoomLabel>
          </ZoomControls>
        </RightPane>
      </Content>
    </PageContainer>
  );
}

export default CoverLetterMaker;


