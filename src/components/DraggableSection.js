import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';
import { getFontFamily } from '../styles/fonts';

const SectionContainer = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  opacity: ${props => props.isDragging ? 0.5 : 1};
  font-family: ${getFontFamily()};
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  background: ${props => props.enabled ? 'white' : '#f8fafc'};
  border-radius: 8px 8px 0 0;
`;

const SectionTitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  color: #718096;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  margin-right: 8px;
  
  &:hover {
    color: #4a5568;
    background: #f7fafc;
  }
`;

const DragHandle = styled.div`
  cursor: grab;
  color: #718096;
  font-size: 16px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #4a5568;
    background: #f7fafc;
  }
  
  &:active {
    cursor: grabbing;
  }
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.enabled ? '#1a202c' : '#718096'};
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

const SectionContent = styled.div`
  padding: 20px;
  display: ${props => props.enabled && props.expanded ? 'block' : 'none'};
`;

const ItemType = 'SECTION';

function DraggableSection({ 
  index, 
  section, 
  sectionTitle, 
  onToggleEnabled, 
  onReorder, 
  children 
}) {
  const ref = useRef(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        onReorder(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  // Combine drag and drop refs
  drag(ref);
  drop(ref);
  preview(drop(ref));

  return (
    <SectionContainer ref={ref} isDragging={isDragging}>
      <SectionHeader enabled={section.enabled}>
        <SectionTitleArea>
          <DragHandle>
            <i className="fas fa-grip-vertical"></i>
          </DragHandle>
          <SectionTitle enabled={section.enabled}>
            {sectionTitle}
          </SectionTitle>
        </SectionTitleArea>
        
        <CollapseButton onClick={() => setIsExpanded(!isExpanded)}>
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
        </CollapseButton>
        
        <CheckboxWrapper>
          <Checkbox
            type="checkbox"
            checked={section.enabled}
            onChange={onToggleEnabled}
          />
          Include in resume
        </CheckboxWrapper>
      </SectionHeader>
      
      <SectionContent enabled={section.enabled} expanded={isExpanded}>
        {children}
      </SectionContent>
    </SectionContainer>
  );
}

export default DraggableSection;
