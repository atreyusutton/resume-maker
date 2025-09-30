import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import { initialResumeData } from '../data/resumeData';
import './PrintableResume.css';

const RESUME_STORAGE_KEY = 'dynamic-resume-data';
const COVER_LETTER_STORAGE_KEY = 'cover-letter-content';

// Configure marked options
marked.setOptions({ breaks: true, gfm: true });

function PrintableCoverLetter() {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [coverLetterHtml, setCoverLetterHtml] = useState('');

  useEffect(() => {
    try {
      const savedResume = localStorage.getItem(RESUME_STORAGE_KEY);
      if (savedResume) {
        const parsed = JSON.parse(savedResume);
        setResumeData({ ...initialResumeData, ...parsed });
      }
    } catch (_) {}

    try {
      const savedCL = localStorage.getItem(COVER_LETTER_STORAGE_KEY) || '';
      setCoverLetterHtml(marked(savedCL));
    } catch (_) {}
  }, []);

  const personal = resumeData?.personal?.data || {};

  return (
    <div className="print-page">
      <div className="resume-content">
        <div className="personal-section">
          {personal.name && <h1 className="name">{personal.name}</h1>}
          <div className="contact-info">
            {personal.location && <span className="contact-item">{personal.location}</span>}
            {personal.email && <span className="contact-item">{personal.email}</span>}
            {personal.phone && <span className="contact-item">{personal.phone}</span>}
            {personal.linkedin && (
              <span className="contact-item"><a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
            )}
            {personal.github && (
              <span className="contact-item"><a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>
            )}
            {personal.personalSite && (
              <span className="contact-item"><a href={personal.personalSite} target="_blank" rel="noopener noreferrer">Personal Site</a></span>
            )}
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Cover Letter</h2>
          <div className="section-content" dangerouslySetInnerHTML={{ __html: coverLetterHtml }} />
        </div>
      </div>
    </div>
  );
}

export default PrintableCoverLetter;


