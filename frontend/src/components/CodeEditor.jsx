import { useEffect, useState } from 'react';
import axios from 'axios';

function CodeEditor({ codeblockId }) {
  const [code, setCode] = useState('');
  const [solutionCode, setSolutionCode] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/codeblock_by_id/${codeblockId}`)
      .then((res) => {
        setCode(res.data.initial_template || '');
        setSolutionCode(res.data.solution_code || '');
      });
  }, [codeblockId]);
  const isCorrect = code.trim() === solutionCode.trim();

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={60}
        style={{ fontFamily: 'monospace', fontSize: '1rem' }}
      />
      {isCorrect && <div style={{ fontSize: '3rem', marginTop: '1rem' }}>😊</div>}
    </div>
  );
}

export default CodeEditor;
