import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { getFontFamily } from '../../styles/fonts';

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  font-family: ${getFontFamily()};
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
  cursor: text;
  user-select: text;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: ${getFontFamily()};
  transition: border-color 0.2s ease;
  cursor: text;
  user-select: text;
  
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
  font-style: italic;
`;

const ObjectivesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const ObjectiveItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  background: ${props => props.active ? '#f0f9ff' : 'white'};
  position: relative;
`;

const ObjectiveHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const RadioButton = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #3182ce;
`;

const ActiveLabel = styled.span`
  font-size: 12px;
  color: #059669;
  font-weight: 500;
  background: #d1fae5;
  padding: 2px 8px;
  border-radius: 12px;
`;

const DeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
  margin-left: auto;
  
  &:hover {
    background: #c53030;
  }
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
  margin-bottom: 16px;
  
  &:hover {
    background: #2c5aa0;
  }
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  font-family: ${getFontFamily()};
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

function ObjectiveEditor({ data, onChange }) {
  const handleObjectiveChange = (index, field, value) => {
    const updatedObjectives = [...data.objectives];
    updatedObjectives[index] = {
      ...updatedObjectives[index],
      [field]: value
    };
    onChange({
      ...data,
      objectives: updatedObjectives
    });
  };

  const setActiveObjective = (index) => {
    onChange({
      ...data,
      activeIndex: index
    });
  };

  const addObjective = () => {
    const newObjective = {
      id: uuidv4(),
      jobTitle: '',
      content: ''
    };
    onChange({
      ...data,
      objectives: [...data.objectives, newObjective]
    });
  };

  const deleteObjective = (index) => {
    if (data.objectives.length <= 1) return; // Keep at least one
    
    const updatedObjectives = data.objectives.filter((_, i) => i !== index);
    const newActiveIndex = data.activeIndex >= index && data.activeIndex > 0 
      ? data.activeIndex - 1 
      : data.activeIndex;
    
    onChange({
      ...data,
      objectives: updatedObjectives,
      activeIndex: Math.min(newActiveIndex, updatedObjectives.length - 1)
    });
  };

  return (
    <div>
      <FormGroup>
        <Label>Active Objective for Resume</Label>
        <Select 
          value={data.activeIndex || 0}
          onChange={(e) => setActiveObjective(parseInt(e.target.value))}
        >
          {data.objectives.map((obj, index) => (
            <option key={obj.id} value={index}>
              {obj.jobTitle || `Objective ${index + 1}`}
            </option>
          ))}
        </Select>
        <HelpText>
          Select which objective to show on your resume
        </HelpText>
      </FormGroup>

      <AddButton onClick={addObjective}>
        <i className="fas fa-plus"></i>
        Add New Objective
      </AddButton>

      <ObjectivesList>
        {data.objectives.map((objective, index) => (
          <ObjectiveItem key={objective.id} active={index === data.activeIndex}>
            <ObjectiveHeader>
              <RadioButton
                type="radio"
                name="activeObjective"
                checked={index === data.activeIndex}
                onChange={() => setActiveObjective(index)}
              />
              {index === data.activeIndex && <ActiveLabel>Active</ActiveLabel>}
              {data.objectives.length > 1 && (
                <DeleteButton onClick={() => deleteObjective(index)}>
                  <i className="fas fa-trash"></i>
                </DeleteButton>
              )}
            </ObjectiveHeader>

            <FormGroup>
              <Label>Target Job Title</Label>
              <Input
                type="text"
                value={objective.jobTitle || ''}
                onChange={(e) => handleObjectiveChange(index, 'jobTitle', e.target.value)}
                placeholder="e.g., Full Stack Developer"
              />
              <HelpText>
                This is for your reference only and won't appear on the resume
              </HelpText>
            </FormGroup>
            
            <FormGroup>
              <Label>Objective Statement</Label>
              <Textarea
                value={objective.content || ''}
                onChange={(e) => handleObjectiveChange(index, 'content', e.target.value)}
                placeholder="Write a brief statement about your career goals and what you hope to achieve in this role..."
              />
              <HelpText>
                Keep it concise and focused on what you can offer to the employer
              </HelpText>
            </FormGroup>
          </ObjectiveItem>
        ))}
      </ObjectivesList>
    </div>
  );
}

export default ObjectiveEditor;
