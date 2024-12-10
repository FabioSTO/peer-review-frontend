import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/overlaynoaccount.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/*const OverlayAI = ({ comment, setShowAIOverlay }) => {

  return (
    <div className="overlay">
      <div className="overlay-content" language="javascript" style={darcula}>
      <button onClick={() => setShowAIOverlay(false)} id='closeOverlayButton' style={{cursor: "pointer"}}><FontAwesomeIcon icon={faTimes} /></button>
        <div class="container" style={{ height: "30vh" }}>
          <h2 id='title'>AI Response</h2>
          <h4 className='invitationsOverlay' id='aiCommentOver' style={{overflow: "auto", padding: "20px" }}>{comment}</h4>
        </div>
      </div>
    </div>
  );
};

export default OverlayAI;*/

const processContent = (content) => {
  const codeRegex = /<\| c \|>(.*?)<\|\/ c \|>/gs;
  const codeMatches = [...content.matchAll(codeRegex)];
  let lastIndex = 0;
  const processedSections = [];

  codeMatches.forEach((match, index) => {
    if (match.index > lastIndex) {
      processedSections.push(
        <p key={`text-${index}`}>{content.substring(lastIndex, match.index).trim()}</p>
      );
    }

    processedSections.push(
      <SyntaxHighlighter key={`code-${index}`} language="javascript" style={darcula}>
        {match[1].trim()}
      </SyntaxHighlighter>
    );
    lastIndex = match.index + match[0].length;
  });

  if (lastIndex < content.length) {
    processedSections.push(
      <p key={`text-last`}>{content.substring(lastIndex).trim()}</p>
    );
  }

  return processedSections;
};

const OverlayAI = ({ comment, setShowAIOverlay }) => {

  const processedComment = processContent(comment);

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ padding: '20px', backgroundColor: '#2e2e2e', borderRadius: '10px', maxHeight: '80vh', overflowY: 'auto' }}>
        <button onClick={() => setShowAIOverlay(false)} id='closeOverlayButton' style={{ cursor: "pointer", background: "transparent", border: "none", fontSize: "24px", color: "#fff", position: 'absolute', top: '10px', right: '10px' }}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 id='title' style={{ color: '#fff', marginBottom: '10px' }}>AI Response</h2>
        <div className='invitationsOverlay' id='aiCommentOver' style={{ color: '#ddd' }}>
          {processedComment}
        </div>
      </div>
    </div>
  );
};

export default OverlayAI;