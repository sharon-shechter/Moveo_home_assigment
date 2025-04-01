import UserCount from '../components/userCount';
import '../styles/home.css';

function Home() {
  

  return (
    <div className="home-container">
      <h1 className="home-title">👨‍💻 Welcome to Tom's Online Coding App</h1>
      <p className="home-description">Collaborate and code together in real-time!</p>
      <UserCount />
      <button className="start-button" >
        🚀 Start Coding
      </button>
    </div>
  );
}

export default Home;
