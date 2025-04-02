import { useEffect, useState } from 'react';
import axios from 'axios';

function CodeEditor({ codeblockId, role }) {
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
  const isReadOnly = role === 'mentor';

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={60}
        readOnly={isReadOnly}
        style={{
          fontFamily: 'monospace',
          fontSize: '1rem',
          backgroundColor: isReadOnly ? '#f0f0f0' : 'white',
          cursor: isReadOnly ? 'not-allowed' : 'text',
        }}
      />
      {isCorrect && role === 'student' && (
        <div style={{ fontSize: '3rem', marginTop: '1rem' }}>Well done! 😊</div>
      )}
    </div>
  );
}


export default CodeEditor;
