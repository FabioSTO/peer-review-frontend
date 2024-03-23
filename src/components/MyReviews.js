import chatLogo from '../img/chat-logo-white.png'
import { useState, useEffect } from 'react';
import '../css/mysubmissions.css';
import fondoProyecto1 from '../img/fondoProyecto1.jpeg';
import fondoProyecto2 from '../img/fondoProyecto2.jpeg';
import fondoProyecto3 from '../img/fondoProyecto3.jpeg';
import { useUserContext } from '../context/UserContext';

function MyReviews() {
  // Estado para controlar los elementos pulsados
  const [isChatLogOpen, setIsChatLogOpen] = useState([]);
  const [showAllComments, setShowAllComments] = useState(window.innerWidth > 1350);

  // Manejador para alternar el estado de un elemento
  const handleLogChat = (index) => {
    setIsChatLogOpen(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setShowAllComments(window.innerWidth > 1350);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Datos de ejemplo para renderizar
  const reviews = [
    {
      projectName: 'Project Dumbo',
      projectBackgroundPicture: fondoProyecto1,
      reviewTitle: 'Get API implementation',
      tags: ['#APIServerSide', '#JAVA', '#APIUnLolete'],
      userLogs: [
        { user: 'Pepe', log: 'Commited' },
        { user: 'Paco', log: 'Comment added' }
      ]
    },
    {
      projectName: 'Project Dumbo',
      projectBackgroundPicture: fondoProyecto2,
      reviewTitle: 'Get API implementation',
      tags: ['#APIServerSide', '#JAVA', '#APIUnLolete'],
      userLogs: [
        { user: 'Pepe', log: 'Commited' },
        { user: 'Paco', log: 'Comment added' }
      ]
    },{
      projectName: 'Project Dumbo',
      projectBackgroundPicture: fondoProyecto3,
      reviewTitle: 'Get API implementation',
      tags: ['#APIServerSide', '#JAVA', '#APIUnLolete'],
      userLogs: [
        { user: 'Pepe', log: 'Commited' },
        { user: 'Paco', log: 'Comment added' }
      ]
    }
    // Agrega más objetos de datos aquí si es necesario
  ];

  return (
    <div className='reviewsContainer'>
      {reviews.map((review, index) => (
        <div className='singleReviewContainer' key={index}>
          <div className='singleReview'>
            <div className='reviewProject' style={{ backgroundImage: `url(${review.projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}>
              <h1>{review.projectName}</h1>
              <img className='chatLogo' src={chatLogo} onClick={() => handleLogChat(index)}/>
            </div>
            <div className='reviewsAndTags'>
              <h2 className='reviewTitle'>{review.reviewTitle}</h2>
              <ul className='tagList'>
                {review.tags.map((tag, tagIndex) => (
                  <li className='tag' key={tagIndex}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
          {(isChatLogOpen[index] || showAllComments) && (
            <div className='reviewLog'>
              {review.userLogs.map((log, logIndex) => (
                <div className='userAndLog' key={logIndex}>
                  <h3 className='userLogUser'>{log.user}:</h3>
                  <h3 className='userLog'>{log.log}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyReviews;