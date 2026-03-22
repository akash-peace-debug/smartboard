import { useState } from 'react';
import axios from 'axios';

export default function StaffUpload() {
  const [file, setFile]       = useState(null);
  const [dept, setDept]       = useState('CSE');
  const [year, setYear]       = useState('1');
  const [subject, setSubject] = useState('');
  const [unit, setUnit]       = useState('Unit 1');
  const [status, setStatus]   = useState('');

  const handleUpload = async () => {
    if (!file) return setStatus('❌ File select பண்ணுங்க!');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('department', dept);
    formData.append('year', year);
    formData.append('subject', subject);
    formData.append('unit', unit);
    formData.append('uploadedBy', localStorage.getItem('name') || 'Staff');
    setStatus('⏳ Uploading...');
    await axios.post('http://localhost:5000/api/ppt/upload', formData);
    setStatus('✅ Board-ல Live ஆச்சு!');
    setFile(null);
  };

  const sel = {
    width: '100%', background: '#0d0f1a', border: '1px solid #2d3460',
    color: '#c4b5fd', padding: '9px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '10px', outline: 'none'
  };

  return (
    <div style={{ background: '#0d0f1a', minHeight: '100vh', padding: '30px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '4px' }}>📤 Staff Upload</h2>
        <p style={{ color: '#4b5563', fontSize: '12px', marginBottom: '24px' }}>
          PPT upload பண்ணி Sense Board-ல display பண்ணுங்க
        </p>
        <div style={{
          border: '2px dashed #2d3460', borderRadius: '10px',
          padding: '30px', textAlign: 'center', marginBottom: '16px',
          background: '#060810', cursor: 'pointer'
        }}>
          <input type="file" accept=".pptx,.pdf"
            onChange={e => setFile(e.target.files[0])}
            style={{ color: '#9ca3af' }} />
          {file && <p style={{ color: '#34d399', fontSize: '12px', marginTop: '8px' }}>
            ✅ {file.name}
          </p>}
        </div>
        <select style={sel} onChange={e => setDept(e.target.value)}>
          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
          <option value="IT">IT</option>
          <option value="AIDS">AI&DS</option>
        </select>
        <select style={sel} onChange={e => setYear(e.target.value)}>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        <input placeholder="Subject name"
          onChange={e => setSubject(e.target.value)}
          style={{ ...sel, color: '#e2e8f0' }} />
        <select style={sel} onChange={e => setUnit(e.target.value)}>
          <option>Unit 1</option>
          <option>Unit 2</option>
          <option>Unit 3</option>
          <option>Unit 4</option>
          <option>Unit 5</option>
        </select>
        <button onClick={handleUpload} style={{
          width: '100%', background: '#7c3aed', color: 'white',
          border: 'none', padding: '12px', borderRadius: '9px',
          fontSize: '13px', fontWeight: '500', cursor: 'pointer'
        }}>
          📤 Sense Board-ல Upload பண்ணு
        </button>
        {status && <p style={{
          marginTop: '12px', fontSize: '13px', textAlign: 'center',
          color: status.includes('✅') ? '#34d399' : '#fbbf24'
        }}>{status}</p>}
      </div>
    </div>
  );
}