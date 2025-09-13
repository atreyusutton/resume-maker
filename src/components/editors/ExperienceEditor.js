import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import MarkdownTextEditor from '../MarkdownTextEditor';

const ExperienceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ExperienceItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  background: ${props => props.enabled ? 'white' : '#f8fafc'};
`;

const ExperienceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: 16px;
  gap: 12px;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #4a5568;
  margin-right: auto;
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
  transition: background 0.2s ease;
  
  &:hover {
    background: #c53030;
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
  
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

const BulletsSection = styled.div`
  margin-top: 16px;
`;

const BulletItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
`;

const BulletCheckbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #3182ce;
  margin-top: 4px;
`;

const BulletEditor = styled.div`
  flex: 1;
`;

const BulletDeleteButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
  margin-top: 2px;
  
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
  margin-top: 12px;
  
  &:hover {
    background: #2c5aa0;
  }
`;

function ExperienceEditor({ data, onChange }) {
  const handleExperienceChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    onChange(updatedData);
  };

  const handleBulletChange = (expIndex, bulletIndex, field, value) => {
    const updatedData = [...data];
    updatedData[expIndex].bullets[bulletIndex] = {
      ...updatedData[expIndex].bullets[bulletIndex],
      [field]: value
    };
    onChange(updatedData);
  };

  const addExperience = () => {
    const newExperience = {
      id: uuidv4(),
      enabled: true,
      job: '',
      company: '',
      link: '',
      startDate: '',
      endDate: '',
      location: '',
      bullets: []
    };
    onChange([...data, newExperience]);
  };

  const deleteExperience = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  const addBullet = (expIndex) => {
    const updatedData = [...data];
    updatedData[expIndex].bullets.push({
      id: uuidv4(),
      enabled: true,
      text: ''
    });
    onChange(updatedData);
  };

  const deleteBullet = (expIndex, bulletIndex) => {
    const updatedData = [...data];
    updatedData[expIndex].bullets = updatedData[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    onChange(updatedData);
  };

  return (
    <div>
      <ExperienceList>
        {data.map((experience, index) => (
          <ExperienceItem key={experience.id} enabled={experience.enabled}>
            <ExperienceHeader>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  checked={experience.enabled}
                  onChange={(e) => handleExperienceChange(index, 'enabled', e.target.checked)}
                />
                Include this experience
              </CheckboxWrapper>
              <DeleteButton onClick={() => deleteExperience(index)}>
                <i className="fas fa-trash"></i> Delete
              </DeleteButton>
            </ExperienceHeader>

            <FormGrid>
              <FormGroup>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  value={experience.job || ''}
                  onChange={(e) => handleExperienceChange(index, 'job', e.target.value)}
                  placeholder="Your job title"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Company</Label>
                <Input
                  type="text"
                  value={experience.company || ''}
                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                  placeholder="Company name"
                />
              </FormGroup>
              
              <FullWidthGroup>
                <Label>Company Website (optional)</Label>
                <Input
                  type="url"
                  value={experience.link || ''}
                  onChange={(e) => handleExperienceChange(index, 'link', e.target.value)}
                  placeholder="https://company.com"
                />
              </FullWidthGroup>
              
              <FormGroup>
                <Label>Start Date</Label>
                <Input
                  type="text"
                  value={experience.startDate || ''}
                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                  placeholder="January 2023"
                />
              </FormGroup>
              
              <FormGroup>
                <Label>End Date</Label>
                <Input
                  type="text"
                  value={experience.endDate || ''}
                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                  placeholder="Present"
                />
              </FormGroup>
              
              <FullWidthGroup>
                <Label>Location</Label>
                <Input
                  type="text"
                  value={experience.location || ''}
                  onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </FullWidthGroup>
            </FormGrid>

            <BulletsSection>
              <Label>Responsibilities & Achievements</Label>
              {experience.bullets.map((bullet, bulletIndex) => (
                <BulletItem key={bullet.id}>
                  <BulletCheckbox
                    type="checkbox"
                    checked={bullet.enabled}
                    onChange={(e) => handleBulletChange(index, bulletIndex, 'enabled', e.target.checked)}
                  />
                  <BulletEditor>
                    <MarkdownTextEditor
                      value={bullet.text}
                      onChange={(value) => handleBulletChange(index, bulletIndex, 'text', value)}
                      placeholder="Describe your responsibilities and achievements..."
                      simple={true}
                    />
                  </BulletEditor>
                  <BulletDeleteButton onClick={() => deleteBullet(index, bulletIndex)}>
                    <i className="fas fa-trash"></i>
                  </BulletDeleteButton>
                </BulletItem>
              ))}
              <AddButton onClick={() => addBullet(index)}>
                <i className="fas fa-plus"></i>
                Add Bullet Point
              </AddButton>
            </BulletsSection>
          </ExperienceItem>
        ))}
      </ExperienceList>
      
      <AddButton onClick={addExperience}>
        <i className="fas fa-plus"></i>
        Add Experience
      </AddButton>
    </div>
  );
}

export default ExperienceEditor;
