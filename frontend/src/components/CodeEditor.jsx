import { useEffect, useState } from 'react';
import axios from 'axios';

function CodeEditor({ codeblockId }) {
  const [code, setCode] = useState('');
  const [solution, setSolution] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/codeblock_by_id/${codeblockId}`)
      .then((res) => {
        setCode(res.data.initial_code || '');
        setSolution(res.data.solution || '');
      });
  }, [codeblockId]);

  const isCorrect = code.trim() === solution.trim();

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={60}
        style={{ fontFamily: 'monospace', fontSize: '1rem' }}
      />
      {isCorrect && <div style={{ fontSize: '3rem' }}>😊</div>}
    </div>
  );
}

export default CodeEditor;
