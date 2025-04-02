import { useEffect, useState } from 'react';
import axios from 'axios';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript'; 
import 'prismjs/themes/prism.css';
import '../styles/codeEditor.css';


function CodeEditor({ codeblockId, role, socketRef }) {
  const [code, setCode] = useState('');
  const [solutionCode, setSolutionCode] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/codeblock_by_id/${codeblockId}`)
      .then((res) => {
        setCode(res.data.initial_template || '');
        setSolutionCode(res.data.solution_code || '');
      });
  }, [codeblockId]);

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
    <div className="code-editor-container">
      <Editor
        value={code}
        onValueChange={(newCode) => {
          setCode(newCode);
          if (role === 'student') {
            socketRef?.current?.emit('code_update', {
              room: codeblockId,
              code: newCode,
            });
          }
        }}
        highlight={(code) =>
          Prism.highlight(code, Prism.languages.javascript, 'javascript')
        }
        padding={0} 
        className={`code-editor ${isReadOnly ? 'read-only' : ''}`}
        readOnly={isReadOnly}
      />
      {isCorrect && role === 'student' && (
        <div className="code-editor-result">✅ Well done!</div>
      )}
    </div>
  );
}

export default CodeEditor;
