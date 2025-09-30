import React from 'react';
import styled from 'styled-components';
import { sectionTypes } from '../data/resumeData';
import { getFontFamily } from '../styles/fonts';
import DraggableSection from './DraggableSection';
import PersonalEditor from './editors/PersonalEditor';
import ObjectiveEditor from './editors/ObjectiveEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import SkillsEditor from './editors/SkillsEditor';
import EducationEditor from './editors/EducationEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import OtherEditor from './editors/OtherEditor';

const EditorContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: ${getFontFamily()};
`;

const EditorTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const EditorIcon = styled.div`
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

const SectionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 16px;
`;

const IndexCol = styled.div`
  position: sticky;
  top: 16px;
  height: max-content;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  width: max-content;
`;

const IndexHeader = styled.div`
  padding: 10px 12px;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
`;

const IndexList = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndexLink = styled.button`
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #374151;
  white-space: nowrap;
  &:hover { background: #f8fafc; }
`;

const IndexActions = styled.div`
  border-top: 1px solid #e2e8f0;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


const ActionButton = styled.button`
  width: 100%;
  background: ${props => props.variant === 'save' ? '#10b981' : '#ef4444'};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
`;

const FloatingLeftControls = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
`;

const getEditorComponent = (sectionType) => {
  const editors = {
    personal: PersonalEditor,
    objective: ObjectiveEditor,
    experience: ExperienceEditor,
    skills: SkillsEditor,
    education: EducationEditor,
    projects: ProjectsEditor,
    other: OtherEditor
  };
  return editors[sectionType] || null;
};

function EditorPanel({ resumeData, updateSection, toggleSectionEnabled, reorderSections, onReset, onSaveToCode }) {
  // Sort sections by order
  const sortedSections = Object.values(resumeData).sort((a, b) => a.order - b.order);

  const handleJump = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <EditorContainer>
      {/* Top action bar removed per request */}

      <Layout>
        <IndexCol>
          <IndexHeader>Sections</IndexHeader>
          <IndexList>
            {sortedSections.map((s) => (
              <IndexLink key={s.id} onClick={() => handleJump(s.id)}>
                {sectionTypes[s.type]}
              </IndexLink>
            ))}
          </IndexList>
          {/* Moved actions to floating controls at bottom-left */}
        </IndexCol>

        <SectionsList>
          {sortedSections.map((section, index) => {
            const EditorComponent = getEditorComponent(section.type);
            
            return (
              <div id={`section-${section.id}`} key={section.id}>
                <DraggableSection
                  index={index}
                  section={section}
                  sectionTitle={sectionTypes[section.type]}
                  onToggleEnabled={() => toggleSectionEnabled(section.id)}
                  onReorder={reorderSections}
                >
                  {EditorComponent && (
                    <EditorComponent
                      data={section.data}
                      onChange={(newData) => updateSection(section.id, { data: newData })}
                    />
                  )}
                </DraggableSection>
              </div>
            );
          })}
        </SectionsList>
      </Layout>
      {/* Floating left controls removed; actions moved to preview panel */}
    </EditorContainer>
  );
}

export default EditorPanel;
