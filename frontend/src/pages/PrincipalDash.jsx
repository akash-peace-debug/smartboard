import { useState } from 'react';
import axios from 'axios';

const subjects = {
  CSE:  ['Data Structures','Operating Systems','DBMS','Computer Networks','Python','Software Engineering'],
  ECE:  ['Signals & Systems','VLSI Design','Analog Circuits','Digital Electronics','Microprocessors','Communication'],
  MECH: ['Thermodynamics','Fluid Mechanics','Manufacturing','Engineering Drawing','Strength of Materials','Machine Design'],
  CIVIL:['Structural Analysis','Surveying','Concrete Technology','Soil Mechanics','Highway Engineering','Environmental Engg'],
  IT:   ['Web Technologies','Cloud Computing','Cyber Security','Data Mining','Mobile App Dev','IoT Systems'],
  AIDS: ['Machine Learning','Deep Learning','NLP','Computer Vision','Big Data','Reinforcement Learning'],
};

const units = ['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5'];

export default function PrincipalDash() {
  const [page, setPage]     = useState(1);
  const [dept, setDept]     = useState('');
  const [year, setYear]     = useState('');
  const [subj, setSubj]     = useState('');
  const [unit, setUnit]     = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const box = {
    background: '#111425', border: '1px solid #1e2240',
    borderRadius: '12px', padding: '18px 14px',
    textAlign: 'center', cursor: 'pointer',
    transition: 'all 0.2s', marginBottom: '10px'
  };
  const hov = { borderColor: '#7c3aed', background: '#1a1d2e' };

  const analyse = async () => {
    setLoading(true); setResult(null);
    const res = await axios.post('http://localhost:5000/api/analyse/unit',
      { department: dept, year, subject: subj, unit });
    setResult(res.data);
    setLoading(false);
    setPage(5);
  };

  const s = { color: '#e2e8f0', background: '#0d0f1a', minHeight: '100vh', padding: '24px' };
  const title = { color: '#a78bfa', fontSize: '15px', fontWeight: '500', marginBottom: '16px' };
  const sub = { color: '#4b5563', fontSize: '12px', marginBottom: '16px' };
  const card = (label, icon, onClick) => (
    <div key={label} style={box}
      onMouseOver={e => Object.assign(e.currentTarget.style, hov)}
      onMouseOut={e => { e.currentTarget.style.borderColor='#1e2240'; e.currentTarget.style.background='#111425'; }}
      onClick={onClick}>
      <div style={{ fontSize: '26px', marginBottom: '6px' }}>{icon}</div>
      <div style={{ color: '#c4b5fd', fontSize: '13px', fontWeight: '500' }}>{label}</div>
    </div>
  );

  return (
    <div style={s}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: '#4b5563', marginBottom: '16px' }}>
          <span style={{ cursor: 'pointer', color: page >= 1 ? '#a78bfa' : '#4b5563' }}
            onClick={() => setPage(1)}>Departments</span>
          {dept && <><span style={{ margin: '0 6px' }}>›</span>
            <span style={{ cursor: 'pointer', color: page >= 2 ? '#a78bfa' : '#4b5563' }}
              onClick={() => setPage(2)}>{dept}</span></>}
          {year && <><span style={{ margin: '0 6px' }}>›</span>
            <span style={{ cursor: 'pointer', color: page >= 3 ? '#a78bfa' : '#4b5563' }}
              onClick={() => setPage(3)}>{year} Year</span></>}
          {subj && <><span style={{ margin: '0 6px' }}>›</span>
            <span style={{ cursor: 'pointer', color: page >= 4 ? '#a78bfa' : '#4b5563' }}
              onClick={() => setPage(4)}>{subj}</span></>}
          {unit && <><span style={{ margin: '0 6px' }}>›</span>
            <span style={{ color: '#c4b5fd' }}>{unit}</span></>}
        </div>

        {/* Page 1: Departments */}
        {page === 1 && <>
          <div style={title}>👨‍💼 Select Department</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[['CSE','💻'],['ECE','📡'],['MECH','⚙️'],['CIVIL','🏗️'],['IT','🖥️'],['AIDS','🤖']]
              .map(([d, ic]) => card(d, ic, () => { setDept(d); setPage(2); }))}
          </div>
        </>}

        {/* Page 2: Years */}
        {page === 2 && <>
          <div style={title}>📅 Select Year</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
            {['1','2','3','4'].map(y => card(`${y} Year`, ['I','II','III','IV'][y-1],
              () => { setYear(y); setPage(3); }))}
          </div>
        </>}

        {/* Page 3: Subjects */}
        {page === 3 && <>
          <div style={title}>📚 Select Subject</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {(subjects[dept] || []).map(s => card(s, '📖',
              () => { setSubj(s); setPage(4); }))}
          </div>
        </>}

        {/* Page 4: Units */}
        {page === 4 && <>
          <div style={title}>📋 Select Unit</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: '10px' }}>
            {units.map((u, i) => card(u, `${i+1}`,
              () => { setUnit(u); setPage(4.5); }))}
          </div>
        </>}

        {/* Page 4.5: Confirm */}
        {page === 4.5 && <>
          <div style={{ background: '#111425', border: '1px solid #2d3460', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
            <div style={{ color: '#c4b5fd', fontSize: '14px', fontWeight: '500', marginBottom: '6px' }}>
              {dept} · {subj} · {unit}
            </div>
            <div style={{ color: '#4b5563', fontSize: '12px' }}>{year} Year</div>
          </div>
          <button onClick={analyse} style={{
            width: '100%', background: '#7c3aed', color: 'white',
            border: 'none', padding: '13px', borderRadius: '9px',
            fontSize: '14px', fontWeight: '500', cursor: 'pointer'
          }}>
            {loading ? '⏳ Analysing...' : '🤖 AI Analyse பண்ணு'}
          </button>
        </>}

        {/* Page 5: Result */}
        {page === 5 && result && <>
          <div style={title}>📊 Analysis Result</div>
          <div style={{ background: '#111425', border: '1px solid #1e2240', borderRadius: '12px', padding: '20px', marginBottom: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '500', color: result.score >= 80 ? '#34d399' : result.score >= 60 ? '#fbbf24' : '#f87171' }}>
              {result.score}%
            </div>
            <div style={{ color: '#4b5563', fontSize: '12px' }}>Content Worth Score</div>
            <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '6px' }}>
              {result.pptCount} PPT(s) found
            </div>
          </div>
          {[
            { label: 'Slide Coverage', val: result.slideCoverage },
            { label: 'Content Depth',  val: result.contentDepth },
            { label: 'Visual Quality', val: result.visualQuality },
            { label: 'Topic Accuracy', val: result.topicAccuracy },
          ].map(m => (
            <div key={m.label} style={{ background: '#111425', border: '1px solid #1e2240', borderRadius: '9px', padding: '12px 14px', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>{m.label}</span>
                <span style={{ fontSize: '12px', color: '#a78bfa' }}>{m.val}%</span>
              </div>
              <div style={{ height: '4px', background: '#1e2240', borderRadius: '2px' }}>
                <div style={{ height: '4px', background: '#7c3aed', borderRadius: '2px', width: `${m.val}%`, transition: 'width 1s' }} />
              </div>
            </div>
          ))}
          <div style={{ background: '#111425', border: '1px solid #1e2240', borderRadius: '10px', padding: '14px', marginBottom: '8px' }}>
            <div style={{ color: '#c4b5fd', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>✅ Strengths</div>
            {result.strengths.map(s => <div key={s} style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>✔️ {s}</div>)}
          </div>
          <div style={{ background: '#111425', border: '1px solid #1e2240', borderRadius: '10px', padding: '14px', marginBottom: '8px' }}>
            <div style={{ color: '#c4b5fd', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>⚠️ Improvements</div>
            {result.improvements.map(s => <div key={s} style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>➡️ {s}</div>)}
          </div>
          <div style={{ background: '#111425', border: '1px solid #1e2240', borderRadius: '10px', padding: '14px' }}>
            <div style={{ color: '#c4b5fd', fontSize: '12px', fontWeight: '500', marginBottom: '6px' }}>💡 Recommendation</div>
            <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.7' }}>{result.recommendation}</div>
          </div>
          <button onClick={() => setPage(1)} style={{
            width: '100%', background: 'transparent', color: '#6b7280',
            border: '1px solid #2d3460', padding: '11px', borderRadius: '9px',
            fontSize: '13px', cursor: 'pointer', marginTop: '12px'
          }}>
            ← மறுபடியும் Analyse பண்ண
          </button>
        </>}
      </div>
    </div>
  );
}