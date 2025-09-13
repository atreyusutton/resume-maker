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

function EditorPanel({ resumeData, updateSection, toggleSectionEnabled, reorderSections }) {
  // Sort sections by order
  const sortedSections = Object.values(resumeData).sort((a, b) => a.order - b.order);

  return (
    <EditorContainer>
      <EditorTitle>
        <EditorIcon>
          <i className="fas fa-edit"></i>
        </EditorIcon>
        Resume Editor
      </EditorTitle>
      
      <SectionsList>
        {sortedSections.map((section, index) => {
          const EditorComponent = getEditorComponent(section.type);
          
          return (
            <DraggableSection
              key={section.id}
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
          );
        })}
      </SectionsList>
    </EditorContainer>
  );
}

export default EditorPanel;
