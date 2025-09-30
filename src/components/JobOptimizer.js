import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { getFontFamily } from '../styles/fonts';
import AppHeader from './AppHeader';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8fafc;
  font-family: ${getFontFamily()};
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Left = styled.div`
  flex: 1;
  background: white;
  border-right: 2px solid #e2e8f0;
  overflow-y: auto;
  padding: 20px;
`;

const Right = styled.div`
  flex: 1;
  background: #f1f5f9;
  overflow-y: auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 12px 0;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 240px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  outline: none;
  font-family: ${getFontFamily()};
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const Button = styled.button`
  background: ${p => p.variant === 'primary' ? '#6366f1' : '#3182ce'};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 500;
`;

const Card = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

function JobOptimizer({ resumeData, onApplyToResume, onUseCoverLetter }) {
  const [jobText, setJobText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showDetails, setShowDetails] = useState(true);

  const handleGenerate = useCallback(async () => {
    if (!jobText.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://localhost:5001/api/optimize-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobText, resumeData })
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const msg = err?.error || `Request failed (${response.status})`;
        throw new Error(msg);
      }
      const data = await response.json();
      setResult(data);
    } catch (e) {
      alert(`Optimization failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [jobText, resumeData]);

  const applyResume = useCallback(() => {
    if (!result) return;
    onApplyToResume?.(result);
    try { alert('Applied to resume.'); } catch (_) {}
  }, [result, onApplyToResume]);

  const useCoverLetter = useCallback(() => {
    if (!result) return;
    onUseCoverLetter?.(result.coverLetter);
    try { alert('Cover letter applied. Open the Cover Letter page to review.'); } catch (_) {}
  }, [result, onUseCoverLetter]);

  return (
    <Page>
      <AppHeader />
      <Body>
        <Left>
          <Title>Paste Job Listing</Title>
          <TextArea value={jobText} onChange={e => setJobText(e.target.value)} placeholder={'Paste the full job description here...'} />
          <Row>
            <Button variant="primary" onClick={handleGenerate} disabled={loading}>{loading ? 'Generating...' : 'Generate'}</Button>
          </Row>
        </Left>
        <Right>
          <Title>AI Suggestions</Title>
          {!result ? (
            <Card>Results will appear here after generation.</Card>
          ) : (
            <>
              <Card>
                <strong>Objective</strong>
                <div style={{ marginTop: 8 }}>{result.updatedObjective}</div>
              </Card>
              <Card>
                <strong>Matched Keywords</strong>
                <div style={{ marginTop: 8, color: '#334155', fontSize: 13 }}>
                  {(result.keywordList || []).slice(0, 60).map((k, i) => (
                    <span key={i} style={{ display: 'inline-block', background: '#eef2ff', color: '#3730a3', padding: '2px 6px', borderRadius: 9999, margin: 2 }}>
                      {k}
                    </span>
                  ))}
                </div>
              </Card>
              <Card>
                <strong>Experience Bullets</strong>
                <div style={{ marginTop: 8 }}>
                  {Object.entries(result.updatedExperienceBullets || {}).map(([expId, bullets]) => (
                    <div key={expId} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: '#64748b' }}>Experience ID: {expId}</div>
                      <ul style={{ margin: '6px 0 0 18px' }}>
                        {(bullets || []).map((b, i) => (<li key={i}>{b}</li>))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <strong>Project Rewrites</strong>
                <div style={{ marginTop: 8 }}>
                  {Object.entries(result.updatedProjects || {}).map(([projId, upd]) => (
                    <div key={projId} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: '#64748b' }}>Project ID: {projId}</div>
                      <div style={{ fontWeight: 600, marginTop: 4 }}>Bullets</div>
                      <ul style={{ margin: '6px 0 0 18px' }}>
                        {(upd.descriptionBullets || []).map((b, i) => (<li key={i}>{b}</li>))}
                      </ul>
                      {Array.isArray(upd.skillsUsed) && upd.skillsUsed.length > 0 && (
                        <div style={{ marginTop: 6 }}>Skills: {upd.skillsUsed.join(', ')}</div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <strong>Additional Information Rewrites</strong>
                <div style={{ marginTop: 8 }}>
                  {Object.entries(result.updatedOther || {}).map(([otherId, content]) => (
                    <div key={otherId} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 12, color: '#64748b' }}>Item ID: {otherId}</div>
                      <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{content}</pre>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <strong>Company-Specific Missing Skills</strong>
                <div style={{ marginTop: 8 }}>
                  <div><em>{result.companyName ? `Skills for ${result.companyName}` : 'Company-specific skills'}</em></div>
                  <div style={{ marginTop: 6 }}>
                    {(result.missingSkills || []).map((s, i) => (
                      <span key={i} style={{ display: 'inline-block', background: '#ecfeff', color: '#155e75', padding: '2px 6px', borderRadius: 9999, margin: 2 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </Card>

              <Card>
                <strong>Visibility Changes & Additions</strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Visibility Changes & Additions</strong>
                  <button onClick={() => setShowDetails(s => !s)} style={{ border: 'none', background: '#e2e8f0', padding: '4px 8px', borderRadius: 6, cursor: 'pointer' }}>
                    {showDetails ? 'Hide' : 'Show'}
                  </button>
                </div>
                {showDetails && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Experience Visibility</div>
                      <ul style={{ margin: '0 0 0 18px' }}>
                        {Object.entries(result.experienceVisibility || {}).map(([id, v]) => (
                          <li key={id}>ID {id}: {v ? 'Show' : 'Hide'}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Education Visibility</div>
                      <ul style={{ margin: '0 0 0 18px' }}>
                        {Object.entries(result.educationVisibility || {}).map(([id, v]) => (
                          <li key={id}>ID {id}: {v ? 'Show' : 'Hide'}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>Projects Visibility</div>
                      <ul style={{ margin: '0 0 0 18px' }}>
                        {Object.entries(result.projectVisibility || {}).map(([id, v]) => (
                          <li key={id}>ID {id}: {v ? 'Show' : 'Hide'}</li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>New Skill Categories</div>
                      {(result.newSkillCategories || []).length === 0 ? (
                        <div style={{ color: '#64748b' }}>None</div>
                      ) : (
                        <ul style={{ margin: '0 0 0 18px' }}>
                          {(result.newSkillCategories || []).map((c, i) => (
                            <li key={i}><strong>{c.category}:</strong> {(c.skills || []).join(', ')}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 4 }}>New Projects</div>
                      {(result.newProjects || []).length === 0 ? (
                        <div style={{ color: '#64748b' }}>None</div>
                      ) : (
                        <ul style={{ margin: '0 0 0 18px' }}>
                          {(result.newProjects || []).map((p, i) => (
                            <li key={i}><strong>{p.title}</strong>{p.skillsUsed?.length ? ` — ${p.skillsUsed.join(', ')}` : ''}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}
              </Card>
              <Card>
                <strong>Cover Letter</strong>
                <div style={{ marginTop: 8, whiteSpace: 'pre-wrap' }}>{result.coverLetter}</div>
              </Card>
              <Row>
                <Button onClick={applyResume}>Apply to Resume</Button>
                <Button onClick={useCoverLetter}>Use as Cover Letter</Button>
              </Row>
            </>
          )}
        </Right>
      </Body>
    </Page>
  );
}

export default JobOptimizer;


