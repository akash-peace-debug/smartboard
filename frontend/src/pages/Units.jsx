import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const unitNames = {
  'Data Structures':      ['Arrays & Linked List','Stacks & Queues','Trees','Graphs','Hashing'],
  'Operating Systems':    ['Process Management','CPU Scheduling','Memory Management','File Systems','Deadlocks'],
  'DBMS':                 ['ER Model','Relational Algebra','SQL','Normalization','Transactions'],
  'Computer Networks':    ['OSI Model','Data Link Layer','Network Layer','Transport Layer','Application Layer'],
  'Python':               ['Basics','OOP','File Handling','Libraries','Projects'],
  'Software Engineering': ['SDLC','Requirements','Design','Testing','Maintenance'],
  'Signals & Systems':    ['Signals','LTI Systems','Fourier Series','Fourier Transform','Laplace'],
  'VLSI Design':          ['MOS Transistor','CMOS Logic','Memory','PLDs','Testing'],
  'Analog Circuits':      ['Diodes','BJT','FET','Amplifiers','Oscillators'],
  'Digital Electronics':  ['Boolean Algebra','Combinational','Sequential','ADC & DAC','PLDs'],
  'Microprocessors':      ['8085 Architecture','Instruction Set','Interrupts','8086','Interfacing'],
  'Communication':        ['AM Modulation','FM Modulation','Digital Comm','Multiplexing','Antenna'],
  'Thermodynamics':       ['Basic Concepts','1st Law','2nd Law','Cycles','Gas Dynamics'],
  'Fluid Mechanics':      ['Properties','Statics','Kinematics','Dynamics','Flow Measurement'],
  'Manufacturing':        ['Casting','Forming','Machining','Welding','Metrology'],
  'Engineering Drawing':  ['Projections','Isometric','Section Views','Development','Assembly'],
  'Strength of Materials':['Stress & Strain','Beams','Shear Force','Columns','Springs'],
  'Machine Design':       ['Design Process','Fatigue','Shafts','Gears','Bearings'],
  'Structural Analysis':  ['Trusses','Beams','Frames','Arches','Cables'],
  'Surveying':            ['Chain Survey','Compass','Levelling','Plane Table','Total Station'],
  'Concrete Technology':  ['Materials','Mix Design','Workability','Curing','Testing'],
  'Soil Mechanics':       ['Phase Relations','Permeability','Consolidation','Shear Strength','Bearing Capacity'],
  'Highway Engineering':  ['Road Types','Geometric Design','Pavement','Traffic','Drainage'],
  'Environmental Engg':   ['Water Supply','Waste Water','Air Pollution','Solid Waste','EIA'],
  'Web Technologies':     ['HTML & CSS','JavaScript','React','Node.js','REST APIs'],
  'Cloud Computing':      ['Cloud Basics','AWS','Azure','Docker','Kubernetes'],
  'Cyber Security':       ['Threats','Cryptography','Network Security','Web Security','Ethical Hacking'],
  'Data Mining':          ['Intro','Classification','Clustering','Association Rules','Evaluation'],
  'Mobile App Dev':       ['Android Basics','UI Design','APIs','Database','Publishing'],
  'IoT Systems':          ['Architecture','Sensors','Protocols','Cloud Integration','Projects'],
  'Machine Learning':     ['Supervised Learning','Unsupervised','Feature Engg','Model Evaluation','Deep Learning'],
  'Deep Learning':        ['Neural Networks','CNN','RNN','Transformers','GANs'],
  'NLP':                  ['Text Processing','Embeddings','Seq2Seq','BERT','Applications'],
  'Computer Vision':      ['Image Processing','Object Detection','Segmentation','Face Recognition','Projects'],
  'Big Data':             ['Hadoop','Spark','Data Lakes','Stream Processing','Visualization'],
  'Reinforcement Learning':['MDP','Q-Learning','Policy Gradient','Actor Critic','Applications'],
};

export default function Units() {
  const { dept, year, subject } = useParams();
  const navigate = useNavigate();
  const decodedSubject = decodeURIComponent(subject);
  const units = unitNames[decodedSubject] || ['Unit 1','Unit 2','Unit 3','Unit 4','Unit 5'];
  const yearLabel = ['','1st','2nd','3rd','4th'][year];

  const [selectedUnit, setSelectedUnit] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [analysing, setAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const fileRef = useRef();
  const longPressTimer = useRef();

  const handleLongPressStart = (unit, idx) => {
    longPressTimer.current = setTimeout(() => {
      setSelectedUnit({ name: unit, idx });
    }, 600);
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimer.current);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedUnit) return;
    setUploading(true);
    setUploadMsg('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('department', dept);
    formData.append('year', year);
    formData.append('subject', decodedSubject);
    formData.append('unit', `Unit ${selectedUnit.idx + 1}`);
    try {
      await axios.post('http://localhost:5000/api/ppt/upload', formData);
      setUploadMsg('✅ Upload success!');
    } catch {
      setUploadMsg('❌ Upload failed!');
    }
    setUploading(false);
    setTimeout(() => setUploadMsg(''), 3000);
    setSelectedUnit(null);
  };

  const handleAnalyse = async () => {
    if (!selectedUnit) return;
    setAnalysing(true);
    setAnalysis(null);
    try {
      const res = await axios.post('http://localhost:5000/api/analyse/unit', {
        department: dept,
        year,
        subject: decodedSubject,
        unit: `Unit ${selectedUnit.idx + 1}`,
      });
      setAnalysis(res.data);
    } catch {
      setAnalysis({ score: 0, recommendation: 'Error analysing!' });
    }
    setAnalysing(false);
  };

  return (
    <div style={{
      background: '#0d0f1a', minHeight: '100vh',
      padding: '24px 16px', color: '#e2e8f0'
    }}>
      <input
        type="file" ref={fileRef} style={{ display: 'none' }}
        accept=".pptx,.pdf" onChange={handleUpload}
      />

      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => navigate(`/subjects/${dept}/${year}`)} style={{
            background: 'transparent', border: '1px solid #2d3460',
            color: '#6b7280', padding: '6px 12px', borderRadius: '8px',
            cursor: 'pointer', fontSize: '13px'
          }}>← Back</button>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '500', color: '#a78bfa', margin: 0 }}>
              {decodedSubject}
            </h2>
            <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>
              {dept} — {yearLabel} Year
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => {
              if (selectedUnit) fileRef.current.click();
              else alert('Long press a unit first!');
            }}
            style={{
              background: '#7c3aed', color: 'white', border: 'none',
              padding: '8px 14px', borderRadius: '8px', fontSize: '12px',
              fontWeight: '500', cursor: 'pointer'
            }}>
            📤 Upload
          </button>
          <button
            onClick={() => {
              if (selectedUnit) handleAnalyse();
              else alert('Long press a unit first!');
            }}
            style={{
              background: '#065f46', color: '#34d399',
              border: '1px solid #34d39944',
              padding: '8px 14px', borderRadius: '8px', fontSize: '12px',
              fontWeight: '500', cursor: 'pointer'
            }}>
            🔬 Analyse
          </button>
        </div>
      </div>

      {/* Upload status */}
      {uploadMsg && (
        <div style={{
          background: '#111425', border: '1px solid #1e2240',
          borderRadius: '8px', padding: '10px 14px', marginBottom: '12px',
          fontSize: '13px', textAlign: 'center',
          color: uploadMsg.includes('✅') ? '#34d399' : '#f87171'
        }}>
          {uploading ? '⏳ Uploading...' : uploadMsg}
        </div>
      )}

      {/* Selected unit */}
      {selectedUnit && (
        <div style={{
          background: '#1a1040', border: '1px solid #7c3aed',
          borderRadius: '8px', padding: '8px 14px', marginBottom: '12px',
          fontSize: '12px', color: '#a78bfa', textAlign: 'center'
        }}>
          Selected: Unit {selectedUnit.idx + 1} — {selectedUnit.name}
          <span onClick={() => setSelectedUnit(null)}
            style={{ marginLeft: '10px', cursor: 'pointer', color: '#f87171' }}>✕</span>
        </div>
      )}

      {/* Units List */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '10px',
        maxWidth: '500px', margin: '0 auto'
      }}>
        {units.map((u, i) => (
          <div
            key={u}
            onClick={() => navigate(`/viewer/${dept}/${year}/${subject}/Unit${i + 1}`)}
            onMouseDown={() => handleLongPressStart(u, i)}
            onMouseUp={handleLongPressEnd}
            onTouchStart={() => handleLongPressStart(u, i)}
            onTouchEnd={handleLongPressEnd}
            style={{
              background: selectedUnit?.idx === i ? '#1a1040' : '#111425',
              border: `1px solid ${selectedUnit?.idx === i ? '#7c3aed' : '#1e2240'}`,
              borderRadius: '12px', padding: '16px 18px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.2s', userSelect: 'none',
            }}
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
              <div>
                <div style={{ fontSize: '14px', color: '#c4b5fd', fontWeight: '500' }}>
                  Unit {i + 1}
                </div>
                <div style={{ fontSize: '11px', color: '#4b5563', marginTop: '2px' }}>
                  {u}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '11px', color: '#4b5563' }}>Hold to select</div>
          </div>
        ))}
      </div>

      {/* Analysis Result */}
      {analysing && (
        <div style={{ textAlign: 'center', padding: '24px', color: '#a78bfa' }}>
          ⏳ Analysing...
        </div>
      )}
      {analysis && (
        <div style={{
          background: '#111425', border: '1px solid #1e2240',
          borderRadius: '12px', padding: '20px',
          marginTop: '20px', maxWidth: '500px', margin: '20px auto 0'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{
              fontSize: '48px', fontWeight: '600',
              color: analysis.score >= 80 ? '#34d399' : analysis.score >= 60 ? '#fbbf24' : '#f87171'
            }}>
              {analysis.score}%
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563' }}>Content Worth Score</div>
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '1.7' }}>
            {analysis.recommendation}
          </div>
          <button onClick={() => setAnalysis(null)} style={{
            width: '100%', background: 'transparent',
            border: '1px solid #2d3460', color: '#6b7280',
            padding: '10px', borderRadius: '8px',
            fontSize: '12px', cursor: 'pointer', marginTop: '12px'
          }}>Close</button>
        </div>
      )}
    </div>
  );
}