import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { getFontFamily } from '../styles/fonts';

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  font-family: ${getFontFamily()};
`;

const Brand = styled.div`
  font-weight: 700;
  color: #1f2937;
`;

const Nav = styled.nav`
  display: flex;
  gap: 8px;
`;

const NavLink = styled(Link)`
  padding: 8px 12px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  color: ${props => props.$active ? '#fff' : '#374151'};
  background: ${props => props.$active ? '#6366f1' : 'transparent'};
  border: 1px solid ${props => props.$active ? '#6366f1' : '#e5e7eb'};
  &:hover { background: ${props => props.$active ? '#5558ef' : '#f3f4f6'}; }
`;

function AppHeader() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <Bar>
      <Brand>Resume Maker</Brand>
      <Nav>
        <NavLink to="/apply-job" $active={path === '/apply-job'}>Job Optimizer</NavLink>
        <NavLink to="/" $active={path === '/'}>Resume</NavLink>
        <NavLink to="/cover-letter" $active={path.startsWith('/cover-letter')}>Cover Letter</NavLink>
      </Nav>
    </Bar>
  );
}

export default AppHeader;


