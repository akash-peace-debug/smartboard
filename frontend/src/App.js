import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StaffUpload from './pages/StaffUpload';
import PrincipalDash from './pages/PrincipalDash';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Login />} />
        <Route path="/staff"     element={<StaffUpload />} />
        <Route path="/principal" element={<PrincipalDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;