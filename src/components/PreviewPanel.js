import React, { useRef } from 'react';
import styled from 'styled-components';
import { getFontFamily } from '../styles/fonts';

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: ${getFontFamily()};
  position: relative;
`;

const PreviewHeader = styled.div`
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PreviewTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PreviewIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;

const PreviewViewport = styled.div`
  flex: 1;
  overflow: auto;
  background: #f1f5f9;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
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
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
`;

const DownloadButton = styled.button`
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 18px;
  font-size: 14px;
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

function NewPreviewPanel({ resumeData }) {
  const iframeRef = useRef(null);

  const handleDownloadPDF = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Use the iframe's print function
      iframeRef.current.contentWindow.print();
    }
  };

  return (
    <PreviewContainer>
      <PreviewHeader>
        <PreviewTitle>
          <PreviewIcon>
            <i className="fas fa-eye"></i>
          </PreviewIcon>
          Resume Preview
        </PreviewTitle>
      </PreviewHeader>
      
      <PreviewViewport>
        <PrintIframe
          ref={iframeRef}
          src="/print"
          title="Resume Print Preview"
          sandbox="allow-same-origin allow-scripts allow-modals allow-popups"
        />
      </PreviewViewport>

      <FloatingControls>
        <DownloadButton onClick={handleDownloadPDF}>
          <i className="fas fa-download"></i>
          Print PDF
        </DownloadButton>
      </FloatingControls>
    </PreviewContainer>
  );
}

export default NewPreviewPanel;
