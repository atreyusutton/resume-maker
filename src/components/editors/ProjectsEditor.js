import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import MarkdownTextEditor from '../MarkdownTextEditor';
import { getFontFamily } from '../../styles/fonts';

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: ${getFontFamily()};
`;

const ProjectItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  background: ${props => props.enabled ? 'white' : '#f8fafc'};
`;

const ProjectHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #3182ce;
`;

const DeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background: #c53030;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-family: ${getFontFamily()};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const SkillsInput = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  min-height: 60px;
  font-family: ${getFontFamily()};
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const HelpText = styled.p`
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
`;

const AddButton = styled.button`
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  
  &:hover {
    background: #2c5aa0;
  }
`;

function ProjectsEditor({ data, onChange }) {
  const handleProjectChange = (index, field, value) => {
    const updatedData = [...data];
    if (field === 'skillsUsed' && typeof value === 'string') {
      // Convert comma-separated string to array
      updatedData[index][field] = value.split(',').map(skill => skill.trim()).filter(skill => skill);
    } else {
      updatedData[index][field] = value;
    }
    onChange(updatedData);
  };

  const addProject = () => {
    const newProject = {
      id: uuidv4(),
      enabled: true,
      title: '',
      skillsUsed: [],
      description: ''
    };
    onChange([...data, newProject]);
  };

  const deleteProject = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  return (
    <div>
      <ProjectsList>
        {data.map((project, index) => (
          <ProjectItem key={project.id} enabled={project.enabled}>
            <ProjectHeader>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  checked={project.enabled}
                  onChange={(e) => handleProjectChange(index, 'enabled', e.target.checked)}
                />
                Include this project
              </CheckboxWrapper>
              <DeleteButton onClick={() => deleteProject(index)}>
                <i className="fas fa-trash"></i> Delete
              </DeleteButton>
            </ProjectHeader>

            <FormGroup>
              <Label>Project Title</Label>
              <Input
                type="text"
                value={project.title || ''}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                placeholder="Project name"
              />
            </FormGroup>

            <FormGroup>
              <Label>Skills Used</Label>
              <SkillsInput
                value={project.skillsUsed.join(', ')}
                onChange={(e) => handleProjectChange(index, 'skillsUsed', e.target.value)}
                placeholder="Enter skills separated by commas"
              />
              <HelpText>
                Separate each skill with a comma
              </HelpText>
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <MarkdownTextEditor
                value={project.description}
                onChange={(value) => handleProjectChange(index, 'description', value)}
                placeholder="Describe the project, your role, and key achievements..."
              />
            </FormGroup>
          </ProjectItem>
        ))}
      </ProjectsList>
      
      <AddButton onClick={addProject}>
        <i className="fas fa-plus"></i>
        Add Project
      </AddButton>
    </div>
  );
}

export default ProjectsEditor;
