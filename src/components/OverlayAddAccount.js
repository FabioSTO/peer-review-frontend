import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/overlaynoaccount.css'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const OverlayAddAccount = ({ setIsLoggedOut, setShowOverlay }) => {

  const handleLogout = () => {
    const logoutUrl = 'https://github.com/logout';
    const logoutWindow = window.open(logoutUrl, '_blank');

    const checkLogout = setInterval(() => {
      if (!logoutWindow || logoutWindow.closed) {
        clearInterval(checkLogout);
        setIsLoggedOut(true);
        setShowOverlay(false);
      }
    }, 1000);
  };

  return (
    <div className="overlay">
      <div className="overlay-content" style={{ width: "fit-content", height: "25vh" }}>
      <button onClick={() => setShowOverlay(false)} id='closeOverlayButton' style={{cursor: "pointer"}}><FontAwesomeIcon icon={faTimes} /></button>
        <div class="container">
          <h2 id='title'>You need to logout of GitHub to add another account</h2>
          <a onClick={handleLogout} className='github-btn'>
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub Logo" class="github-logo"/>
              Log out of GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default OverlayAddAccount;