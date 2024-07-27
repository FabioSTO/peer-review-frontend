import { useState, useEffect } from 'react';
import fondoProyecto1 from '../img/fondoProyecto1.jpeg';
import fondoProyecto2 from '../img/fondoProyecto2.jpeg';
import fondoProyecto3 from '../img/fondoProyecto3.jpeg';
import Alert from './Alert';
import chatLogo from '../img/chat-logo-white.png'
import '../css/reviewinfo.css'
import "diff2html/bundles/css/diff2html.min.css";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { html, css, javascript, java, python } from 'react-syntax-highlighter/dist/esm/languages/hljs';
import { useUserContext } from '../context/UserContext';
import { sendComment } from '../hooks/sendComment';
import { askAI } from '../hooks/askAI';
import { getComments } from '../hooks/getComments';
import OverlayConfirmClose from './OverlayConfirmClose';
import { setNotPending } from '../hooks/setNotPending';
import OverlayAI from './OverlayAI';
const Diff2Html = require('diff2html');

const ReviewInfo = ({ review, setReviewInfo, setSelectedOption }) => {
  const [error, setError] = useState(null);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [ text1, text2 ] = review.review_content.split("_-#CapeerSpecialSeparator#-_");
  const [ comment, setComment ] = useState("");
  const [ comments, setComments ] = useState("");
  const [randomBackground, setRandomBackground] = useState('');
  const [showConfirmCloseOverlay, setShowConfirmCloseOverlay] = useState(false);
  const [showAIOverlay, setShowAIOverlay] = useState(false);
  const [AIComment, setAIComment] = useState(null);
  const [alreadyAskedAI, setAlreadyAskedAI] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [showAlert, setShowAlert] = useState({show: false, message: ''});

  const { memberAccounts, userID, activeMemberAccount } = useUserContext();

  const imageUrl = `http://localhost:3001${review.review_image}`;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const clickedPending = async (review, state) => {
    try {
      await setNotPending(review.reviewID, activeMemberAccount, state);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleShowAIMessage = (AIShowComment) => {
    setAIComment(AIShowComment);
    setShowAIOverlay(true);
  }



  const handleSendComment = async (event) => {
    event.preventDefault();
    try {
      await sendComment( activeMemberAccount, comment, review.reviewID );
      const commentaries = await getComments( review.reviewID );
      setComments(commentaries)
      setComment("");
      clickedPending(review, true);

    } catch (error) {
      setError(error.message)
    }
  };

  const handleAskAI = async (event) => {
    event.preventDefault();
    try {
      await askAI( review.reviewID );
      const commentaries = await getComments( review.reviewID );
      setComments(commentaries)
      const hasAICapeerUser = commentaries.some(comment => comment.member_account === "AICapeerUser");
      if (hasAICapeerUser) {
        setAlreadyAskedAI(true)
      }
      setComment("");
      clickedPending(review, true);

    } catch (error) {
      setError(error.message)
    }
  };

  const reviewsTest = [
    {
      projectBackgroundPicture: fondoProyecto1
    },
    {
      projectBackgroundPicture: fondoProyecto2
    },{
      projectBackgroundPicture: fondoProyecto3
    }
    // Agrega más objetos de datos aquí si es necesario
  ];

  useEffect(() => {
    const randIndex = Math.floor(Math.random() * reviewsTest.length); // Fondo aleatorio

    setRandomBackground(reviewsTest[randIndex].projectBackgroundPicture);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1350) {
        setShowLineNumbers(true);
      } else {
        setShowLineNumbers(false);
      }
    };

    const fetchData = async () => {
      try {
        const commentaries = await getComments( review.reviewID );
        setComments(commentaries)
        const hasAICapeerUser = commentaries.some(comment => comment.member_account === "AICapeerUser");
        if (hasAICapeerUser) {
          setAlreadyAskedAI(true)
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();

    // Llamada inicial
    handleResize();

    // Agrega un event listener para detectar el cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMemberAccount]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return ( 
      <div className='reviewsContainerInfo'>
        {showAIOverlay && <OverlayAI comment={AIComment} setShowAIOverlay={setShowAIOverlay}/>}
        <div className='singleReviewContainer' style={{cursor: "default"}}>
        {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={imageUrl} alt="Imagen" />
          </div>
        </div>
      )}
        {showConfirmCloseOverlay && <OverlayConfirmClose setShowConfirmCloseOverlay={setShowConfirmCloseOverlay} setShowAlert={setShowAlert} reviewID={review.reviewID} setReviewInfo={setReviewInfo} setSelectedOption={setSelectedOption}/>}
          <div className='singleReviewInfo' id='singleReviewId'>
            <div className='reviewProject' style={{ backgroundImage: `url(${randomBackground})`, borderRadius: '10px 10px 0 0' }}>
              <h1>{review.proname}</h1>
              {(review.member_account === activeMemberAccount) && <h4 onClick={() => setShowConfirmCloseOverlay(true)} id='markAsClosed' style={{color: "orange", backgroundColor : "#201863", cursor: "pointer", padding: "3px", border: "solid 2px", borderRadius: "10px"}}>Mark as closed</h4>}
            </div>
            <div className='reviewsAndTags'>
              <h2 className='reviewTitle'>{review.reviewtitle}</h2>
              <ul className='tagList'>
                {review.tags && review.tags.map((tag, tagIndex) => (
                  <li className='tag' key={tagIndex}>{tag.tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {review.review_image && <h5 onClick={toggleModal} id='seeImg' style={{marginTop: "-5px", marginLeft: "270px", width: 'fit-content', color: "white", backgroundColor : "#201863", cursor: "pointer", padding: "3px", border: "solid 2px", borderRadius: "10px" }}>View image 📷</h5>}
        {comments && review.review_content_type === "Code" && 
        
        <div className='codeAndComments'>
          <div className='singleReviewContainer' style={{cursor: "default"}}>
              <SyntaxHighlighter className='codeContent' language="javascript" style={darcula} showLineNumbers={!showLineNumbers} wrapLongLines>
                {review.review_content}
              </SyntaxHighlighter>
          </div>
          <div className='commentsContainer'>
          <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
            <span id='commentsSpan'>Comments</span>
            {review.member_account === activeMemberAccount && alreadyAskedAI === false && <span id='commentsSpanAI' onClick={handleAskAI}>Ask AI</span>}
          </div>
            <div className='commentContent'>
              {comments && comments.map((comment, index) => (
                <div className={`commentary-wrapper ${comment.member_account === activeMemberAccount ? 'commentary-wrapperMine' : ''}`} key={index}>
                  <div className={`commentary ${comment.member_account === activeMemberAccount ? 'commentaryMine' : ''}`}>
                    {comment.member_account !== activeMemberAccount && 
                      <span className='commentUser'>{comment.member_account}</span>
                    }
                    {comment.member_account === "AICapeerUser" ? <span className='commentMessage' id='commentMessageAI' onClick={() => handleShowAIMessage(comment.comment_content)}>View AI Response</span> : <span className='commentMessage'>{comment.comment_content} </span>}
                    <span className='commentDate'>{new Date(comment.comment_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} </span>
                  </div>
                </div>
              ))}
            </div>
            <form className='formInput' onSubmit={handleSendComment}>
              <input type='text' placeholder='Escribe un mensaje' className='inputForm' id='commentInput' value={comment} onChange={handleCommentChange} required/>
            </form>
          </div>
        </div>
        }

        {comments && review.review_content_type === "Diff" && 

          <div className='codeAndCommentsVertical'>
            <div className='singleReviewContainer'>
              <SyntaxHighlighter className='codeContent' id='text1' language="javascript" style={darcula} showLineNumbers={!showLineNumbers} wrapLongLines>
                {text1}
              </SyntaxHighlighter>
              <SyntaxHighlighter className='codeContent' id='text2' language="javascript" style={darcula} showLineNumbers={!showLineNumbers} wrapLongLines>
                {text2}
              </SyntaxHighlighter>
            </div>
            <div className='commentsContainerDiff'>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
              <span id='commentsSpan'>Comments</span>
              {review.member_account === activeMemberAccount && alreadyAskedAI === false && <span id='commentsSpanAI' onClick={handleAskAI}>Ask AI</span>}
            </div>
              <div className='commentContent'>
                {comments && comments.map((comment, index) => (
                  <div className={`commentary-wrapper ${comment.member_account === activeMemberAccount ? 'commentary-wrapperMine' : ''}`} key={index}>
                    <div className={`commentary ${comment.member_account === activeMemberAccount ? 'commentaryMine' : ''}`}>
                      {comment.member_account !== activeMemberAccount && 
                        <span className='commentUser'>{comment.member_account}</span>
                      }
                      {comment.member_account === "AICapeerUser" ? <span className='commentMessage' id='commentMessageAI' onClick={() => handleShowAIMessage(comment.comment_content)}>View AI Response</span> : <span className='commentMessage'>{comment.comment_content} </span>}
                      <span className='commentDate'>{new Date(comment.comment_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} </span>
                    </div>
                  </div>
                ))}
              </div>
              <form className='formInput' onSubmit={handleSendComment}>
                <input type='text' placeholder='Escribe un mensaje' className='inputForm' id='commentInput' value={comment} onChange={handleCommentChange} required/>
              </form>
            </div>
        </div>
        }

        {comments && review.review_content_type === "Commit" && 
          <div className='codeAndCommentsVertical'>
            <div className='singleReviewContainer'>
              <div className='commitDiffsContainer'>
                <div className='commitFilesContainerContent codeContentCommit'>
                  <div dangerouslySetInnerHTML={{ __html: review.review_content }} />
                </div>
              </div>
            </div>
            <div className='commentsContainerDiff'>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: "20px"}}>
              <span id='commentsSpan'>Comments</span>
              {review.member_account === activeMemberAccount && alreadyAskedAI === false && <span id='commentsSpanAI' onClick={handleAskAI}>Ask AI</span>}
            </div>
              <div className='commentContent'>
                {comments && comments.map((comment, index) => (
                  <div className={`commentary-wrapper ${comment.member_account === activeMemberAccount ? 'commentary-wrapperMine' : ''}`} key={index}>
                    <div className={`commentary ${comment.member_account === activeMemberAccount ? 'commentaryMine' : ''}`}>
                      {comment.member_account !== activeMemberAccount && 
                        <span className='commentUser'>{comment.member_account}</span>
                      }
                      {comment.member_account === "AICapeerUser" ? <span className='commentMessage' id='commentMessageAI' onClick={() => handleShowAIMessage(comment.comment_content)}>View AI Response</span> : <span className='commentMessage'>{comment.comment_content} </span>}
                      <span className='commentDate'>{new Date(comment.comment_date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} </span>
                    </div>
                  </div>
                ))}
              </div>
              <form className='formInput' onSubmit={handleSendComment}>
                <input type='text' placeholder='Escribe un mensaje' className='inputForm' id='commentInput' value={comment} onChange={handleCommentChange} required/>
              </form>
            </div>
          </div>
        }
    </div>
      
  )
}

export default ReviewInfo;

/* 
              <div style={{ width: '37vw', maxHeight: '500px', overflowY: 'auto', borderRadius: '10px', border: '2px solid #dc343c' }}>
                <SyntaxHighlighter language="javascript" style={darcula} showLineNumbers>
                  {text1}
                </SyntaxHighlighter>
              </div>
              <div style={{ width: '37vw', maxHeight: '500px', overflowY: 'auto', borderRadius: '10px', border: '2px solid lightGreen' }}>
                <SyntaxHighlighter language="javascript" style={darcula} showLineNumbers>
                  {text2}
                </SyntaxHighlighter>
              </div>
*/