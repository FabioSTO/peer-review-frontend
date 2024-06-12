import { useState, useEffect } from 'react';
import chatLogo from '../img/chat-logo-white.png'
import '../css/reviewinfo.css'
import "diff2html/bundles/css/diff2html.min.css";
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { html, css, javascript, java, python } from 'react-syntax-highlighter/dist/esm/languages/hljs';
const Diff2Html = require('diff2html');

const ReviewInfo = ({ review }) => {
  const [error, setError] = useState(null);
  const [showLineNumbers, setShowLineNumbers] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1350) {
        setShowLineNumbers(true);
      } else {
        setShowLineNumbers(false);
      }
    };

    // Llamada inicial
    handleResize();

    // Agrega un event listener para detectar el cambio de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
      <div className='reviewsContainer'>
        <div className='singleReviewContainer'>
          <div className='singleReview'>
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
        <div className='codeAndComments'>
        {review.review_content_type === "Code" && 
          <div className='singleReviewContainer'>
              <SyntaxHighlighter className='codeContent' language="javascript" style={darcula} showLineNumbers={!showLineNumbers} wrapLongLines>
                {review.review_content}
              </SyntaxHighlighter>
          </div>
        }
        {review.review_content_type === "Diff" && 
          <></>
        }
        <div className='commentsContainer'>A</div>
      </div>
      </div>
  )
}

export default ReviewInfo;

/* 

          {review.review_content_type === "Code" && 
            <div className='singleReviewContainer' style={{ maxHeight: '500px', overflowY: 'auto', resize: 'vertical'}}>
                <SyntaxHighlighter className='codeContent' language="javascript" style={darcula} showLineNumbers>
                  {review.review_content}
                </SyntaxHighlighter>
            </div>
          }
*/