import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

function UsersInfo({ codeblockId = 'codeblock-1' }) {
  const [userCount, setUserCount] = useState(0);
  const [role, setRole] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:8000", {
      path: "/socket.io",
      transports: ["websocket"],
    });

    socketRef.current.emit('join_room', { room: codeblockId });

    socketRef.current.on('user_count', (data) => {
      setUserCount(data.count);
      setRole(data.role); // 👈 role comes from server!
    });

    return () => {
      socketRef.current.emit('leave_room', { room: codeblockId });
      socketRef.current.disconnect();
    };
  }, [codeblockId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Code Block: {codeblockId}</h2>
      <p>👥 Students in room: {userCount}</p>
      {role && <p>🧑‍🏫 You are: <strong>{role}</strong></p>}
    </div>
  );
}

export default UsersInfo;
