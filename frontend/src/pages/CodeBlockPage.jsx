import { useParams, useNavigate } from 'react-router-dom';
import CodeEditor from "../components/CodeEditor";
import UsersInfo from "../components/UsersInfo";
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

function CodeBlockPage() {
  const { codeblockId } = useParams();
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const [userCount, setUserCount] = useState(0);
  const [role, setRole] = useState('');

  useEffect(() => {
    socketRef.current = io("http://localhost:8000", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socketRef.current.emit('join_room', { room: codeblockId });

    socketRef.current.on('user_count', (data) => {
      console.log("👥 user_count event:", data);
      setUserCount(data.count);
      setRole(data.role);
    });

    socketRef.current.on('mentor_left', () => {
      alert('🚨 Mentor has left the session! Redirecting to home...');
      navigate('/');
    });

    return () => {
      socketRef.current.emit('leave_room', { room: codeblockId });
      socketRef.current.disconnect();
    };
  }, [codeblockId, navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <UsersInfo codeblockId={codeblockId} userCount={userCount} role={role} />
      <CodeEditor codeblockId={codeblockId} socketRef={socketRef} role={role} />
    </div>
  );
}

export default CodeBlockPage;
