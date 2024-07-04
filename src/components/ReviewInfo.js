import { useState, useEffect } from 'react';
import chatLogo from '../img/chat-logo-white.png'
import '../css/reviewinfo.css'
import "diff2html/bundles/css/diff2html.min.css";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { html, css, javascript, java, python } from 'react-syntax-highlighter/dist/esm/languages/hljs';
import { useUserContext } from '../context/UserContext';
import { sendComment } from '../hooks/sendComment';
import { getComments } from '../hooks/getComments';
const Diff2Html = require('diff2html');

const ReviewInfo = ({ review }) => {
  const [error, setError] = useState(null);
  const [showLineNumbers, setShowLineNumbers] = useState(false);
  const [ text1, text2 ] = review.review_content.split("_-#CapeerSpecialSeparator#-_");
  const [ comment, setComment ] = useState("");
  const [ comments, setComments ] = useState("");

  const { memberAccounts, userID, activeMemberAccount } = useUserContext();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSendComment = async (event) => {
    event.preventDefault();
    try {
      await sendComment( activeMemberAccount, comment, review.reviewID );
      const commentaries = await getComments( review.reviewID );
      setComments(commentaries)
      setComment("");

    } catch (error) {
      setError(error.message)
    }
  };

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

  return ( 
      <div className='reviewsContainerInfo'>
        <div className='singleReviewContainer'>
          <div className='singleReviewInfo'>
            <div className='reviewProject' style={{ borderRadius: '10px 10px 0 0' }}>
              <h1>{review.proname}</h1>
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
        {comments && review.review_content_type === "Code" && 
        
        <div className='codeAndComments'>
          <div className='singleReviewContainer'>
              <SyntaxHighlighter className='codeContent' language="javascript" style={darcula} showLineNumbers={!showLineNumbers} wrapLongLines>
                {review.review_content}
              </SyntaxHighlighter>
          </div>
          <div className='commentsContainer'>
            <div className='commentContent'>
              {comments && comments.map((comment, index) => (
                <div className={`commentary-wrapper ${comment.member_account === activeMemberAccount ? 'commentary-wrapperMine' : ''}`} key={index}>
                  <div className={`commentary ${comment.member_account === activeMemberAccount ? 'commentaryMine' : ''}`}>
                    {comment.member_account !== activeMemberAccount && 
                      <span className='commentUser'>{comment.member_account}</span>
                    }
                    <span className='commentMessage'>{comment.comment_content} </span>
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
              <div className='commentContent'>
                {comments && comments.map((comment, index) => (
                  <div className={`commentary-wrapper ${comment.member_account === activeMemberAccount ? 'commentary-wrapperMine' : ''}`} key={index}>
                    <div className={`commentary ${comment.member_account === activeMemberAccount ? 'commentaryMine' : ''}`}>
                      {comment.member_account !== activeMemberAccount && 
                        <span className='commentUser'>{comment.member_account}</span>
                      }
                      <span className='commentMessage'>{comment.comment_content} </span>
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
              <div className='commentContent'>
                {comments && comments.map((comment, index) => (
                  <div className={`commentary-wrapper ${comment.member_account === activeMemberAccount ? 'commentary-wrapperMine' : ''}`} key={index}>
                    <div className={`commentary ${comment.member_account === activeMemberAccount ? 'commentaryMine' : ''}`}>
                      {comment.member_account !== activeMemberAccount && 
                        <span className='commentUser'>{comment.member_account}</span>
                      }
                      <span className='commentMessage'>{comment.comment_content} </span>
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