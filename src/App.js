import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { initialResumeData } from './data/resumeData';
import { getFontFamily } from './styles/fonts';
import EditorPanel from './components/EditorPanel';
import PreviewPanel from './components/PreviewPanel';
import PrintableResume from './components/PrintableResume';
import './App.css';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
  font-family: ${getFontFamily()};
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const EditorSection = styled.div`
  flex: 1;
  background: white;
  border-right: 2px solid #e2e8f0;
  overflow-y: auto;
  padding: 20px;
`;

const PreviewSection = styled.div`
  flex: 1;
  background: #f1f5f9;
  overflow-y: auto;
  padding: 20px;
`;

const STORAGE_KEY = 'dynamic-resume-data';

function App() {
  // Load data from localStorage on initial load
  const [resumeData, setResumeData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Merge with initial data to ensure new fields are added if structure changes
        return { ...initialResumeData, ...parsed };
      }
    } catch (error) {
      console.error('Error loading saved resume data:', error);
    }
    return initialResumeData;
  });

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  }, [resumeData]);

  const updateSection = useCallback((sectionId, newData) => {
    setResumeData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        ...newData
      }
    }));
  }, []);

  const toggleSectionEnabled = useCallback((sectionId) => {
    setResumeData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        enabled: !prev[sectionId].enabled
      }
    }));
  }, []);

  const reorderSections = useCallback((dragIndex, hoverIndex) => {
    const sections = Object.values(resumeData).sort((a, b) => a.order - b.order);
    const draggedSection = sections[dragIndex];
    const hoveredSection = sections[hoverIndex];
    
    setResumeData(prev => ({
      ...prev,
      [draggedSection.id]: {
        ...prev[draggedSection.id],
        order: hoveredSection.order
      },
      [hoveredSection.id]: {
        ...prev[hoveredSection.id],
        order: draggedSection.order
      }
    }));
  }, [resumeData]);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <DndProvider backend={HTML5Backend}>
            <AppContainer>
              <MainContent>
                <EditorSection>
                  <EditorPanel
                    resumeData={resumeData}
                    updateSection={updateSection}
                    toggleSectionEnabled={toggleSectionEnabled}
                    reorderSections={reorderSections}
                  />
                </EditorSection>
                <PreviewSection>
                  <PreviewPanel resumeData={resumeData} />
                </PreviewSection>
              </MainContent>
            </AppContainer>
          </DndProvider>
        )}
      />
      <Route path="/print" element={<PrintableResume />} />
    </Routes>
  );
}

export default App;
