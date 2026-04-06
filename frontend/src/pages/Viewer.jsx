import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Viewer() {
  const { dept, year, subject, unit } = useParams();
  const navigate = useNavigate();
  const decodedSubject = decodeURIComponent(subject);
  const [ppts, setPpts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPPTs();
  }, []);

  const fetchPPTs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/ppt/list', {
        params: {
          department: dept,
          year,
          subject: decodedSubject,
          unit: unit.replace('Unit', 'Unit '),
        }
      });
      setPpts(res.data);
    } catch {
      setPpts([]);
    }
    setLoading(false);
  };

  const handleView = (filename) => {
    const url = `http://localhost:5000/uploads/${filename}`;
    const googleViewer = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    window.open(googleViewer, '_blank');
  };

  const handleDownload = (filename) => {
    window.open(`http://localhost:5000/uploads/${filename}`, '_blank');
  };

  return (
    <div style={{
      background: '#0d0f1a', minHeight: '100vh',
      padding: '24px 16px', color: '#e2e8f0'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate(-1)} style={{
          background: 'transparent', border: '1px solid #2d3460',
          color: '#6b7280', padding: '6px 12px', borderRadius: '8px',
          cursor: 'pointer', fontSize: '13px'
        }}>← Back</button>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#a78bfa', margin: 0 }}>
            {unit.replace('Unit', 'Unit ')}
          </h2>
          <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>
            {decodedSubject} — {dept}
          </p>
        </div>
      </div>

      {/* PPT List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#4b5563' }}>
          ⏳ Loading...
        </div>
      ) : ppts.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '40px',
          background: '#111425', borderRadius: '12px',
          border: '1px solid #1e2240'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>📭</div>
          <div style={{ color: '#4b5563', fontSize: '13px' }}>
            No PPTs uploaded yet
          </div>
        </div>
      ) : (
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '10px',
          maxWidth: '500px', margin: '0 auto'
        }}>
          {ppts.map((ppt) => (
            <div
              key={ppt._id}
              style={{
                background: '#111425',
                border: '1px solid #1e2240',
                borderRadius: '12px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#7c3aed'}
              onMouseOut={e => e.currentTarget.style.borderColor = '#1e2240'}
            >
              {/* File info — click to view */}
              <div
                onClick={() => handleView(ppt.filename)}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: '12px', cursor: 'pointer', flex: 1
                }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '8px',
                  background: '#1a1040', border: '1px solid #7c3aed',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '16px'
                }}>
                  📄
                </div>
                <div>
                  <div style={{
                    fontSize: '13px', color: '#c4b5fd', fontWeight: '500'
                  }}>
                    {ppt.filename.substring(14)}
                  </div>
                  <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
                    Tap to view · {new Date(ppt.uploadedAt).toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Download button */}
              <button
                onClick={() => handleDownload(ppt.filename)}
                style={{
                  background: '#065f46', color: '#34d399',
                  border: '1px solid #34d39944',
                  padding: '7px 12px', borderRadius: '7px',
                  fontSize: '12px', cursor: 'pointer',
                  fontWeight: '500', flexShrink: 0
                }}>
                ⬇️
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}