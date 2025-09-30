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
import CoverLetterMaker from './components/CoverLetterMaker';
import PrintableCoverLetter from './components/PrintableCoverLetter';
import JobOptimizer from './components/JobOptimizer';
import './App.css';
import AppHeader from './components/AppHeader';

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

  const resetResumeData = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing saved resume data:', error);
    }
    setResumeData(initialResumeData);
  }, []);

  const applyOptimizationToResume = useCallback((optimization) => {
    setResumeData(prev => {
      const next = { ...prev };
      // Add a new objective entry using parsed job title and the updated objective text
      if (next.objective?.data?.objectives) {
        const jobTitle = optimization.parsedJobTitle || next.objective.data.objectives[0]?.jobTitle || 'Target Role';
        const newObjective = {
          ...next.objective.data.objectives[0],
          id: `${Date.now()}-obj`,
          jobTitle,
          content: optimization.updatedObjective || next.objective.data.objectives[0]?.content || ''
        };
        next.objective = {
          ...next.objective,
          data: {
            ...next.objective.data,
            objectives: [newObjective, ...next.objective.data.objectives],
            activeIndex: 0
          }
        };
      }

      // Experience: rewrite bullets per experience id
      const expArray = next.experience?.data || [];
      const updatedMap = optimization.updatedExperienceBullets || {};
      next.experience = {
        ...next.experience,
        data: expArray.map(exp => {
          const bulletsFromAI = updatedMap[exp.id];
          const updatedBullets = (bulletsFromAI
            ? bulletsFromAI.map((text, idx) => ({
                id: exp.bullets?.[idx]?.id || `${exp.id}-b${idx}`,
                enabled: true,
                text
              }))
            : (exp.bullets || [])
          );
          return { ...exp, bullets: updatedBullets };
        })
      };

      // Projects: rewrite description into bullets and update skillsUsed
      if (next.projects?.data && optimization.updatedProjects) {
        const projMap = optimization.updatedProjects || {};
        next.projects = {
          ...next.projects,
          data: next.projects.data.map(p => {
            const upd = projMap[p.id];
            if (!upd) return p;
            const description = Array.isArray(upd.descriptionBullets)
              ? upd.descriptionBullets.map(b => `- ${b}`).join('\n')
              : (p.description || '');
            const skillsUsed = Array.isArray(upd.skillsUsed) ? upd.skillsUsed : (p.skillsUsed || []);
            return { ...p, description, skillsUsed };
          })
        };
      }

      // Other: rewrite content for each item
      if (next.other?.data && optimization.updatedOther) {
        const updatedOther = optimization.updatedOther || {};
        next.other = {
          ...next.other,
          data: next.other.data.map(o => ({
            ...o,
            content: typeof updatedOther[o.id] === 'string' ? updatedOther[o.id] : o.content
          }))
        };
      }

      // Skills: append a new category "Skills for {companyName}" with missing skills (capitalized)
      if (next.skills?.data) {
        const companyName = optimization.companyName || 'Company';
        const missingSkills = Array.isArray(optimization.missingSkills) ? optimization.missingSkills : [];
        const capitalized = missingSkills.map(s => (s || '').toString().trim()).filter(Boolean).map(s => s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
        if (capitalized.length) {
          next.skills = {
            ...next.skills,
            data: [
              ...next.skills.data,
              {
                id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                enabled: true,
                category: `Skills for ${companyName}`,
                skills: capitalized
              }
            ]
          };
        }
      }

      return next;
    });
  }, []);

  const useCoverLetterFromOptimization = useCallback((text) => {
    try {
      localStorage.setItem('cover-letter-content', text || '');
      alert('Cover letter applied. Open the Cover Letter page to review.');
    } catch (_) {}
  }, []);

  const saveResumeToCode = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5001/api/save-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resumeData)
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Failed to save');
      }
      alert('Saved to src/data/resumeData.js');
    } catch (error) {
      console.error('Save failed:', error);
      alert(`Save failed: ${error.message}. Is the local API running?`);
    }
  }, [resumeData]);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <DndProvider backend={HTML5Backend}>
            <AppContainer>
              <AppHeader />
              <MainContent>
                <EditorSection>
                  <EditorPanel
                    resumeData={resumeData}
                    updateSection={updateSection}
                    toggleSectionEnabled={toggleSectionEnabled}
                    reorderSections={reorderSections}
                    onReset={resetResumeData}
                    onSaveToCode={saveResumeToCode}
                  />
                </EditorSection>
                <PreviewSection>
                  <PreviewPanel 
                    resumeData={resumeData} 
                    onSaveToCode={saveResumeToCode}
                    onReset={resetResumeData}
                  />
                </PreviewSection>
              </MainContent>
            </AppContainer>
          </DndProvider>
        )}
      />
      <Route path="/print" element={<PrintableResume />} />
      <Route path="/cover-letter/print" element={<PrintableCoverLetter />} />
      <Route path="/cover-letter" element={<CoverLetterMaker resumeData={resumeData} />} />
      <Route path="/apply-job" element={(
        <JobOptimizer
          resumeData={resumeData}
          onApplyToResume={applyOptimizationToResume}
          onUseCoverLetter={useCoverLetterFromOptimization}
        />
      )} />
    </Routes>
  );
}

export default App;
