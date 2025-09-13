import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { initialResumeData } from '../data/resumeData';
import './PrintableResume.css';

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true
});

const STORAGE_KEY = 'dynamic-resume-data';

function PrintableResume({ resumeData: propResumeData }) {
  const [resumeData, setResumeData] = useState(propResumeData || initialResumeData);

  // Load data from localStorage if no prop data (for iframe route)
  useEffect(() => {
    if (!propResumeData) {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setResumeData({ ...initialResumeData, ...parsed });
        }
      } catch (error) {
        console.error('Error loading saved resume data:', error);
        setResumeData(initialResumeData);
      }
    }
  }, [propResumeData]);

  // Parse markdown to HTML safely
  const parseMarkdown = (text) => {
    if (!text) return '';
    try {
      return marked(text);
    } catch (error) {
      return text; // Fallback to plain text if parsing fails
    }
  };

  // Sort sections by order and filter enabled ones
  const enabledSections = Object.values(resumeData)
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order);

  const renderPersonal = (data) => (
    <div className="personal-section">
      <h1 className="name">{data.name}</h1>
      <div className="contact-info">
        {data.location && <span className="contact-item">{data.location}</span>}
        {data.email && <span className="contact-item">{data.email}</span>}
        {data.phone && <span className="contact-item">{data.phone}</span>}
        {data.linkedin && (
          <span className="contact-item">
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </span>
        )}
        {data.github && (
          <span className="contact-item">
            <a href={data.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </span>
        )}
        {data.personalSite && (
          <span className="contact-item">
            <a href={data.personalSite} target="_blank" rel="noopener noreferrer">
              Personal Site
            </a>
          </span>
        )}
      </div>
    </div>
  );

  const renderObjective = (data) => {
    const activeObjective = data.objectives[data.activeIndex] || data.objectives[0];
    return (
      <div className="section avoid-break">
        <h2 className="section-title">Objective</h2>
        <div className="section-content">
          <p>{activeObjective.content}</p>
        </div>
      </div>
    );
  };

  const renderExperience = (data) => (
    <div className="section">
      <h2 className="section-title">Experience</h2>
      <div className="section-content">
        {data.filter(exp => exp.enabled).map(exp => (
          <div key={exp.id} className="experience-item avoid-break">
            <div className="experience-header">
              <div className="experience-title">
                <h3 className="job-title">{exp.job}</h3>
                <div className="company">
                  {exp.link ? (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer">
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                  {exp.location && ` • ${exp.location}`}
                </div>
              </div>
              <div className="experience-details">
                {exp.startDate} - {exp.endDate}
              </div>
            </div>
            {exp.bullets.filter(bullet => bullet.enabled).length > 0 && (
              <ul className="bullet-list">
                {exp.bullets.filter(bullet => bullet.enabled).map(bullet => (
                  <li key={bullet.id} className="bullet-item" dangerouslySetInnerHTML={{ __html: parseMarkdown(bullet.text) }} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = (data) => (
    <div className="section avoid-break">
      <h2 className="section-title">Skills</h2>
      <div className="section-content">
        <div className="skills-stack">
          {data.filter(category => category.enabled).map(category => (
            <div key={category.id} className="skill-category">
              <span className="skill-category-title">{category.category}:</span>
              <span className="skills-list">{category.skills.join(', ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEducation = (data) => (
    <div className="section avoid-break">
      <h2 className="section-title">Education</h2>
      <div className="section-content">
        {data.filter(edu => edu.enabled).map(edu => (
          <div key={edu.id} className="education-item">
            <div className="education-header">
              <div className="education-title">
                <h4 className="school">{edu.school}</h4>
                <div className="degree">
                  {edu.degree}
                  {edu.gpa && ` • ${edu.gpa}`}
                </div>
              </div>
              <div className="education-right">
                <div>{edu.startDate} - {edu.endDate}</div>
                {edu.location && <div>{edu.location}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = (data) => (
    <div className="section">
      <h2 className="section-title">Projects</h2>
      <div className="section-content">
        {data.filter(project => project.enabled).map(project => (
          <div key={project.id} className="project-item avoid-break">
            <h4 className="project-title">{project.title}</h4>
            {project.skillsUsed.length > 0 && (
              <div className="project-skills">Skills: {project.skillsUsed.join(', ')}</div>
            )}
            <div className="project-description" dangerouslySetInnerHTML={{ __html: parseMarkdown(project.description) }} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderOther = (data) => (
    <div className="section avoid-break">
      <h2 className="section-title">Additional Information</h2>
      <div className="section-content">
        {data.filter(item => item.enabled).map(item => (
          <div key={item.id} className="other-item">
            <h4 className="other-title">{item.title}</h4>
            <div className="other-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(item.content) }} />
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = (section) => {
    switch (section.type) {
      case 'personal':
        return renderPersonal(section.data);
      case 'objective':
        return renderObjective(section.data);
      case 'experience':
        return renderExperience(section.data);
      case 'skills':
        return renderSkills(section.data);
      case 'education':
        return renderEducation(section.data);
      case 'projects':
        return renderProjects(section.data);
      case 'other':
        return renderOther(section.data);
      default:
        return null;
    }
  };

  return (
    <div className="print-page">
      <div className="resume-content">
        {enabledSections.map(section => (
          <div key={section.id}>
            {renderSection(section)}
          </div>
        ))}
        
        {/* Development note for multi-page testing */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            border: '1px dashed #cbd5e0', 
            fontSize: '12px', 
            color: '#6b7280',
            backgroundColor: '#f9fafb'
          }} className="no-print">
            <strong>Multi-page Preview:</strong> This document will automatically flow to multiple pages when printed if content exceeds one page. 
            Page breaks are indicated by the gray lines above. Add more content to your resume to test multi-page functionality.
          </div>
        )}
      </div>
    </div>
  );
}

export default PrintableResume;
