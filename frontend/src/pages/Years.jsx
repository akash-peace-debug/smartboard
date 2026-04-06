import { useNavigate, useParams } from 'react-router-dom';

const years = [
  { num: '1', roman: 'I', label: '1st Year' },
  { num: '2', roman: 'II', label: '2nd Year' },
  { num: '3', roman: 'III', label: '3rd Year' },
  { num: '4', roman: 'IV', label: '4th Year' },
];

export default function Years() {
  const { dept } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#0d0f1a', minHeight: '100vh',
      padding: '24px 16px', color: '#e2e8f0'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} style={{
          background: 'transparent', border: '1px solid #2d3460',
          color: '#6b7280', padding: '6px 12px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '13px'
        }}>← Back</button>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '500', color: '#a78bfa', margin: 0 }}>
            {dept}
          </h2>
          <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>Select Year</p>
        </div>
      </div>

      {/* Years Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {years.map(y => (
          <div
            key={y.num}
            onClick={() => navigate(`/subjects/${dept}/${y.num}`)}
            style={{
              background: '#111425',
              border: '1px solid #1e2240',
              borderRadius: '12px',
              padding: '32px 12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#7c3aed'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#1e2240'}
          >
            <div style={{ fontSize: '32px', fontWeight: '600', color: '#a78bfa', marginBottom: '8px' }}>
              {y.roman}
            </div>
            <div style={{ fontSize: '13px', color: '#9ca3af' }}>{y.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}