import React from 'react';
import styled from 'styled-components';
import { getFontFamily } from '../../styles/fonts';

const EditorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  font-family: ${getFontFamily()};
  
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

const FullWidthGroup = styled(FormGroup)`
  grid-column: 1 / -1;
`;

function PersonalEditor({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <EditorGrid>
      <FullWidthGroup>
        <Label>Full Name</Label>
        <Input
          type="text"
          value={data.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Your full name"
        />
      </FullWidthGroup>
      
      <FormGroup>
        <Label>Location</Label>
        <Input
          type="text"
          value={data.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, State"
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Email</Label>
        <Input
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="your.email@example.com"
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Phone</Label>
        <Input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="(123) 456-7890"
        />
      </FormGroup>
      
      <FormGroup>
        <Label>LinkedIn URL</Label>
        <Input
          type="url"
          value={data.linkedin || ''}
          onChange={(e) => handleChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </FormGroup>
      
      <FormGroup>
        <Label>GitHub URL</Label>
        <Input
          type="url"
          value={data.github || ''}
          onChange={(e) => handleChange('github', e.target.value)}
          placeholder="https://github.com/yourusername"
        />
      </FormGroup>
      
      <FormGroup>
        <Label>Personal Website</Label>
        <Input
          type="url"
          value={data.personalSite || ''}
          onChange={(e) => handleChange('personalSite', e.target.value)}
          placeholder="https://yoursite.com"
        />
      </FormGroup>
    </EditorGrid>
  );
}

export default PersonalEditor;
