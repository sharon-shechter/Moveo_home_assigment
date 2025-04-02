import '../styles/usersInfo.css';

function UsersInfo({ codeblockId, userCount, role }) {

  return (
    <div className="users-info">
      <h2>Code Block: {codeblockId}</h2>
      <p>👥 Students in room: {userCount}</p>
      {role && <p>🧑‍🏫 You are: <strong>{role}</strong></p>}
    </div>
  );
}

export default UsersInfo;
