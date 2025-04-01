import { useParams } from 'react-router-dom';
import CodeEditor from "../components/CodeEditor";
import UserCount from "../components/UserCount";

function CodeBlockPage() {
  const { codeblockId } = useParams();

  return (
    <div style={{ padding: '2rem' }}>
      <UserCount codeblockId={codeblockId} />
      <CodeEditor codeblockId={codeblockId} />
    </div>
  );
}

export default CodeBlockPage;
