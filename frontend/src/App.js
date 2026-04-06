import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Years from './pages/Years';
import Subjects from './pages/Subjects';
import Units from './pages/Units';
import Viewer from './pages/Viewer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/years/:dept" element={<Years />} />
        <Route path="/subjects/:dept/:year" element={<Subjects />} />
        <Route path="/units/:dept/:year/:subject" element={<Units />} />
        <Route path="/viewer/:dept/:year/:subject/:unit" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;