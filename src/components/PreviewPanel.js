import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { getFontFamily } from '../styles/fonts';

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: ${getFontFamily()};
  position: relative;
`;

// Removed top header per user request

const PreviewViewport = styled.div`
  flex: 1;
  overflow: visible;
  background: #f1f5f9;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ScaledIframeWrapper = styled.div`
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

const DownloadButton = styled.button`
  background: #3182ce;
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
    background: #2c5aa0;
    transform: translateY(-1px);
  }
`;

const SaveButton = styled(DownloadButton)`
  background: #10b981;
  &:hover { background: #0ea371; }
`;

const ResetButton = styled(DownloadButton)`
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
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  &:hover { background: #f3f4f6; }
`;

const ZoomSlider = styled.input`
  appearance: none;
  width: 140px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 9999px;
  outline: none;
  &::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
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

function NewPreviewPanel({ resumeData, onSaveToCode, onReset }) {
  const iframeRef = useRef(null);
  const BASE_WIDTH = 850;
  const BASE_HEIGHT = 1100;
  const [zoom, setZoom] = useState(0.8);
  const clampedZoom = useMemo(() => Math.min(2, Math.max(0.5, zoom)), [zoom]);
  const [docHeight, setDocHeight] = useState(BASE_HEIGHT);

  const incrementZoom = useCallback(() => setZoom((z) => Math.min(2, Math.round((z + 0.1) * 100) / 100)), []);
  const decrementZoom = useCallback(() => setZoom((z) => Math.max(0.5, Math.round((z - 0.1) * 100) / 100)), []);
  const handleSlider = useCallback((e) => setZoom(parseFloat(e.target.value)), []);

  const handleDownloadPDF = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Use the iframe's print function
      iframeRef.current.contentWindow.print();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      try {
        if (!iframeRef.current || !iframeRef.current.contentWindow) return;
        const doc = iframeRef.current.contentWindow.document;
        if (!doc) return;
        const h = Math.max(
          doc.body?.scrollHeight || 0,
          doc.documentElement?.scrollHeight || 0,
          BASE_HEIGHT
        );
        if (h !== docHeight) setDocHeight(h);
      } catch (_) {
        // cross-origin or access issue; ignore
      }
    }, 500);
    return () => clearInterval(interval);
  }, [docHeight]);

  return (
    <PreviewContainer>
      <PreviewViewport>
        <ScaledIframeWrapper style={{ width: BASE_WIDTH * clampedZoom, height: docHeight * clampedZoom }}>
          <PrintIframe
            ref={iframeRef}
            src="/print"
            title="Resume Print Preview"
            sandbox="allow-same-origin allow-scripts allow-modals allow-popups"
            style={{ transform: `scale(${clampedZoom})`, transformOrigin: 'top left', height: `${docHeight}px` }}
          />
        </ScaledIframeWrapper>
      </PreviewViewport>

      <FloatingControls>
        {onSaveToCode && (
          <SaveButton onClick={() => { onSaveToCode(); try { alert('Resume saved to code.'); } catch (_) {} }}>
            <i className="fas fa-save"></i>
            Save to Code
          </SaveButton>
        )}
        {onReset && (
          <ResetButton onClick={() => { onReset(); try { alert('Resume data reset.'); } catch (_) {} }}>
            <i className="fas fa-undo"></i>
            Reset Data
          </ResetButton>
        )}
        <DownloadButton onClick={handleDownloadPDF}>
          <i className="fas fa-download"></i>
          Print PDF
        </DownloadButton>
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
    </PreviewContainer>
  );
}

export default NewPreviewPanel;
