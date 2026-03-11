// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  // Line 9 is likely here. 
  // Ensure you aren't calling hooks inside a conditional like:
  // if (true) { const ref = useRef(); } 

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Your other routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;