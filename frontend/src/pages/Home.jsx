import { useNavigate } from 'react-router-dom';

const depts = [
  { name: 'CSE', icon: '💻', sub: 'Computer Science' },
  { name: 'ECE', icon: '📡', sub: 'Electronics & Comm' },
  { name: 'MECH', icon: '⚙️', sub: 'Mechanical Engg' },
  { name: 'CIVIL', icon: '🏗️', sub: 'Civil Engineering' },
  { name: 'IT', icon: '🖥️', sub: 'Information Tech' },
  { name: 'AIDS', icon: '🤖', sub: 'AI & Data Science' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#0d0f1a', minHeight: '100vh',
      padding: '24px 16px', color: '#e2e8f0'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎓</div>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#a78bfa', margin: '0 0 4px' }}>
          C-Cube
        </h1>
        <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>
          Centralized Classroom Content
        </p>
      </div>

      {/* Department Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {depts.map(d => (
          <div
            key={d.name}
            onClick={() => navigate(`/years/${d.name}`)}
            style={{
              background: '#111425',
              border: '1px solid #1e2240',
              borderRadius: '12px',
              padding: '20px 12px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = '#7c3aed'}
            onMouseOut={e => e.currentTarget.style.borderColor = '#1e2240'}
          >
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>{d.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: '500', color: '#c4b5fd' }}>
              {d.name}
            </div>
            <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '4px' }}>
              {d.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}