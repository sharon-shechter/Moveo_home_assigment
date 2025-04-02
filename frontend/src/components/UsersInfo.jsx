function UsersInfo({ codeblockId, userCount, role }) {
  console.log("👥 userCount:", userCount, "role:", role);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Code Block: {codeblockId}</h2>
      <p>👥 Students in room: {userCount}</p>
      {role && <p>🧑‍🏫 You are: <strong>{role}</strong></p>}
    </div>
  );
}

export default UsersInfo;
