import { useEffect, useState } from 'react';
import axios from 'axios';

function CodeEditor({ codeblockId, role, socketRef }) {
  const [code, setCode] = useState('');
  const [solutionCode, setSolutionCode] = useState('');

  // Load initial code and solution from the server
  useEffect(() => {
    axios.get(`http://localhost:8000/api/codeblock_by_id/${codeblockId}`)
      .then((res) => {
        setCode(res.data.initial_template || '');
        setSolutionCode(res.data.solution_code || '');
      });
  }, [codeblockId]);

  // Handle real-time code sync
  useEffect(() => {
    const socket = socketRef?.current;
    if (!socket) return;

    const handleCodeUpdate = (data) => {
      setCode(data.code);
    };

    socket.on('code_update', handleCodeUpdate);

    return () => {
      socket.off('code_update', handleCodeUpdate);
    };
  }, [codeblockId, role, socketRef]);

  const isReadOnly = role === 'mentor';
  const isCorrect = code.trim() === solutionCode.trim();

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => {
          const newCode = e.target.value;
          setCode(newCode);
          if (role === 'student') {
            socketRef?.current?.emit('code_update', {
              room: codeblockId,
              code: newCode,
            });
          }
        }}
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
