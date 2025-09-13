import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';

const EducationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EducationItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  background: ${props => props.enabled ? 'white' : '#f8fafc'};
`;

const EducationHeader = styled.div`
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
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
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
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

function EducationEditor({ data, onChange }) {
  const handleEducationChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    onChange(updatedData);
  };

  const addEducation = () => {
    const newEducation = {
      id: uuidv4(),
      enabled: true,
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: '',
      location: ''
    };
    onChange([...data, newEducation]);
  };

  const deleteEducation = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  return (
    <div>
      <EducationList>
        {data.map((education, index) => (
          <EducationItem key={education.id} enabled={education.enabled}>
            <EducationHeader>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  checked={education.enabled}
                  onChange={(e) => handleEducationChange(index, 'enabled', e.target.checked)}
                />
                Include this education
              </CheckboxWrapper>
              <DeleteButton onClick={() => deleteEducation(index)}>
                <i className="fas fa-trash"></i> Delete
              </DeleteButton>
            </EducationHeader>

            <FormGrid>
              <FullWidthGroup>
                <Label>School/Institution</Label>
                <Input
                  type="text"
                  value={education.school || ''}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  placeholder="University name"
                />
              </FullWidthGroup>
              
              <FullWidthGroup>
                <Label>Degree/Program</Label>
                <Input
                  type="text"
                  value={education.degree || ''}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  placeholder="e.g., B.S. Computer Science, M.S. Engineering"
                />
              </FullWidthGroup>
              
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="text"
                  value={education.startDate || ''}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                  placeholder="August 2020"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>End Date</Label>
                <Input
                  type="text"
                  value={education.endDate || ''}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                  placeholder="May 2024"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>GPA (optional)</Label>
                <Input
                  type="text"
                  value={education.gpa || ''}
                  onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                  placeholder="3.8 GPA"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={education.location || ''}
                  onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </FormGroup>
            </FormGrid>
          </EducationItem>
        ))}
      </EducationList>
      
      <AddButton onClick={addEducation}>
        <i className="fas fa-plus"></i>
        Add Education
      </AddButton>
    </div>
  );
}

export default EducationEditor;
