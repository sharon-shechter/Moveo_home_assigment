import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/home.css'; // Optional styling

function Home() {
  const [codeblocks, setCodeblocks] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const navigate = useNavigate();

  // Fetch codeblock list from the server
  useEffect(() => {
    axios.get('http://localhost:8000/api/codeblocks')
      .then((res) => setCodeblocks(res.data))
      .catch((err) => console.error('Error fetching codeblocks', err));
  }, []);

  const handleNavigate = () => {
    if (selectedId) {
      navigate(`/codeblock/${selectedId}`);
    }
  };

  return (
    <div className="home-container">
      <h1>👨‍💻 Welcome to Tom's Coding App</h1>
      <p>Select a code block to start coding:</p>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="dropdown"
      >
        <option value="">-- Choose a Code Block --</option>
        {codeblocks.map(cb => (
        <option key={cb.id} value={cb.id}>
            {cb.title || `Codeblock ${cb.id}`}
        </option>
        ))}
      </select>

      <button onClick={handleNavigate} disabled={!selectedId} className="start-button">
        🚀 Go to Codeblock
      </button>
    </div>
  );
}

export default Home;
