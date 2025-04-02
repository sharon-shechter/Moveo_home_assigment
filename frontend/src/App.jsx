import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CodeBlockPage from './pages/CodeBlockPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/codeblock/:codeblockId" element={<CodeBlockPage />} />
      </Routes>
    </Router>
  );
}

export default App;
