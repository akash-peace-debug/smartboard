import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://smartboard-12j5.onrender.com',
        { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      if (res.data.role === 'principal')
        navigate('/principal');
      else
        navigate('/staff');
    } catch (err) {
      setError('Invalid email or password!');
    }
  };

  return (
    <div style={{
      background: '#0d0f1a', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#111425', padding: '40px', borderRadius: '14px',
        border: '1px solid #1e2240', width: '340px'
      }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '8px' }}>📋 SmartBoard</h2>
        <p style={{ color: '#4b5563', fontSize: '13px', marginBottom: '24px' }}>
          Login to continue
        </p>
        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%', background: '#0d0f1a', border: '1px solid #2d3460',
            color: '#e2e8f0', padding: '10px', borderRadius: '8px',
            fontSize: '13px', marginBottom: '10px', outline: 'none'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%', background: '#0d0f1a', border: '1px solid #2d3460',
            color: '#e2e8f0', padding: '10px', borderRadius: '8px',
            fontSize: '13px', marginBottom: '16px', outline: 'none'
          }}
        />
        {error && <p style={{ color: '#f87171', fontSize: '12px', marginBottom: '10px' }}>{error}</p>}
        <button
          onClick={handleLogin}
          style={{
            width: '100%', background: '#7c3aed', color: 'white',
            border: 'none', padding: '11px', borderRadius: '8px',
            fontSize: '13px', fontWeight: '500', cursor: 'pointer'
          }}
        >
          Login →
        </button>
      </div>
    </div>
  );
}