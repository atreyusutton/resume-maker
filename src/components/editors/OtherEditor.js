import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import MarkdownTextEditor from '../MarkdownTextEditor';

const OtherList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OtherItem = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  background: ${props => props.enabled ? 'white' : '#f8fafc'};
`;

const OtherHeader = styled.div`
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
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
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
  margin-top: 16px;
  
  &:hover {
    background: #2c5aa0;
  }
`;

function OtherEditor({ data, onChange }) {
  const handleItemChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      [field]: value
    };
    onChange(updatedData);
  };

  const addItem = () => {
    const newItem = {
      id: uuidv4(),
      enabled: true,
      title: '',
      content: ''
    };
    onChange([...data, newItem]);
  };

  const deleteItem = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onChange(updatedData);
  };

  return (
    <div>
      <OtherList>
        {data.map((item, index) => (
          <OtherItem key={item.id} enabled={item.enabled}>
            <OtherHeader>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(e) => handleItemChange(index, 'enabled', e.target.checked)}
                />
                Include this item
              </CheckboxWrapper>
              <DeleteButton onClick={() => deleteItem(index)}>
                <i className="fas fa-trash"></i> Delete
              </DeleteButton>
            </OtherHeader>

            <FormGroup>
              <Label>Title</Label>
              <Input
                type="text"
                value={item.title || ''}
                onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                placeholder="Section title (e.g., Certifications, Awards, Languages)"
              />
            </FormGroup>

            <FormGroup>
              <Label>Content</Label>
              <MarkdownTextEditor
                value={item.content}
                onChange={(value) => handleItemChange(index, 'content', value)}
                placeholder="Describe the details for this section..."
              />
            </FormGroup>
          </OtherItem>
        ))}
      </OtherList>
      
      <AddButton onClick={addItem}>
        <i className="fas fa-plus"></i>
        Add Other Section
      </AddButton>
    </div>
  );
}

export default OtherEditor;
