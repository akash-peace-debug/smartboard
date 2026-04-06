import { useNavigate, useParams } from 'react-router-dom';

const subjectData = {
  CSE:  ['Data Structures','Operating Systems','DBMS','Computer Networks','Python','Software Engineering'],
  ECE:  ['Signals & Systems','VLSI Design','Analog Circuits','Digital Electronics','Microprocessors','Communication'],
  MECH: ['Thermodynamics','Fluid Mechanics','Manufacturing','Engineering Drawing','Strength of Materials','Machine Design'],
  CIVIL:['Structural Analysis','Surveying','Concrete Technology','Soil Mechanics','Highway Engineering','Environmental Engg'],
  IT:   ['Web Technologies','Cloud Computing','Cyber Security','Data Mining','Mobile App Dev','IoT Systems'],
  AIDS: ['Machine Learning','Deep Learning','NLP','Computer Vision','Big Data','Reinforcement Learning'],
};

export default function Subjects() {
  const { dept, year } = useParams();
  const navigate = useNavigate();
  const subjects = subjectData[dept] || [];
  const yearLabel = ['','1st','2nd','3rd','4th'][year];

  return (
    <div style={{
      background: '#0d0f1a', minHeight: '100vh',
      padding: '24px 16px', color: '#e2e8f0'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate(`/years/${dept}`)} style={{
          background: 'transparent', border: '1px solid #2d3460',
          color: '#6b7280', padding: '6px 12px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '13px'
        }}>← Back</button>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#a78bfa', margin: 0 }}>
            {dept} — {yearLabel} Year
          </h2>
          <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>Select Subject</p>
        </div>
      </div>

      {/* Subjects List */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        maxWidth: '500px', margin: '0 auto'
      }}>
        {subjects.map((s, i) => (
          <div
            key={s}
            onClick={() => navigate(`/units/${dept}/${year}/${encodeURIComponent(s)}`)}
            style={{
              background: '#111425',
              border: '1px solid #1e2240',
              borderRadius: '12px',
              padding: '16px 18px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#7c3aed'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#1e2240'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: '#1a1040', border: '1px solid #7c3aed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '600', color: '#a78bfa'
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: '14px', color: '#c4b5fd', fontWeight: '500' }}>{s}</div>
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563' }}>5 Units →</div>
          </div>
        ))}
      </div>
    </div>
  );
}