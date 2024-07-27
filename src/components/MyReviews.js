import chatLogo from '../img/chat-logo-white.png'
import { useState, useEffect } from 'react';
import '../css/mysubmissions.css';
import fondoProyecto1 from '../img/fondoProyecto1.jpeg';
import fondoProyecto2 from '../img/fondoProyecto2.jpeg';
import fondoProyecto3 from '../img/fondoProyecto3.jpeg';
import { getSubmissions } from '../hooks/getSubmissions';
import { getReviews } from '../hooks/getReviews';
import { setNotPending } from '../hooks/setNotPending';
import { useUserContext } from '../context/UserContext';
import NewReview from './NewReview';
import ReviewInfo from './ReviewInfo';

function MyReviews() {
  // Estado para controlar los elementos pulsados
  const [isChatLogOpen, setIsChatLogOpen] = useState([]);
  const [ selectedOption, setSelectedOption ] = useState("reviews");
  const [error, setError] = useState(null);
  const [ submissions, setSubmissions ] = useState([]);
  const [ reviews, setReviews ] = useState([]);
  const [ reviewInfo, setReviewInfo ] = useState(null);
  const [showAllComments, setShowAllComments] = useState(window.innerWidth > 1350);
  const { memberAccounts, userID, activeMemberAccount } = useUserContext();
  const [ totalPendingSubmissions, setTotalPendingSubmissions] = useState(0);
  const [ totalPendingReviews, setTotalPendingReviews] = useState(0);

  // Manejador para alternar el estado de un elemento
  const handleLogChat = (index) => {
    setIsChatLogOpen(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const clickedPending = async (review, state) => {
    try {
      await setNotPending(review.reviewID, activeMemberAccount, state);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleReviewInfo = (submission) => {
    setSelectedOption(null);
    clickedPending(submission, false);
    setReviewInfo(submission);
  };

  const getOptionClassName = (option) => {
    return selectedOption === option ? 'reviewOption selected' : 'reviewOption';
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const submissions = await getSubmissions(activeMemberAccount);
        const reviews = await getReviews(activeMemberAccount);
        setSubmissions(submissions);
        setReviews(reviews);

        const pendingSubmissions = submissions.filter(submission => submission.pending === 1);
        setTotalPendingSubmissions(pendingSubmissions.length);

        const pendingReviews = reviews.filter(review => review.pending === 1);
        setTotalPendingReviews(pendingReviews.length);
        

      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();

    const handleResize = () => {
      setShowAllComments(window.innerWidth > 1350);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeMemberAccount, selectedOption]);

  // Datos de ejemplo para renderizar
  const reviewsTest = [
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
    <div className='reviewsPage'>

      {!reviewInfo && 
        <div className='reviewOptions'>
          <h2 id='reviewOption' className={getOptionClassName("reviews")} onClick={() => setSelectedOption("reviews")}>Reviews</h2>
          <h2 id='reviewOption' className={getOptionClassName("submissions")} onClick={() => setSelectedOption("submissions")}>Submissions</h2>
          <h2 id='reviewOption' className={getOptionClassName("new")} onClick={() => setSelectedOption("new")}>New</h2>
        </div>
      }

      {selectedOption === "reviews" && reviews &&
      <div className='reviewsContainer'>
      {totalPendingReviews !== 0 ? (<h5 className='invitationsNotice'>You have {totalPendingReviews} pending reviews for today! </h5>) : <></>}
      {reviews.map((review, index) => (
        <div className='singleReviewContainer' key={index}>
          <div className='singleReview' id={review.pending === 1 ? 'pending' : undefined} onClick={() => handleReviewInfo(review)}>
            <div className='reviewProject' style={{ backgroundImage: `url(${reviewsTest[index%3].projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}>
              <h1>{review.proname}</h1>
              <img className='chatLogo' src={chatLogo} onClick={(event) => {event.stopPropagation(); handleLogChat(index)}}/>
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
          {(isChatLogOpen[index] || showAllComments) && (
              <div className='reviewLog'>
                <div className='userAndLog'>
                  <h3 className='userLogUser'>{review.member_account}:</h3>
                  <h3 className='userLog'>Commited</h3>
                </div>
                {review.userLogs.map((log, logIndex) => (
                  <div className='userAndLog' key={logIndex}>
                    <h3 className='userLogUser'>{log}:</h3>
                    <h3 className='userLog'>Comment added</h3>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
    } 

    {selectedOption === "submissions" && submissions &&
      <div className='reviewsContainer'>
      {totalPendingSubmissions !== 0 ? (<h5 className='invitationsNotice'>You have new comments in {totalPendingSubmissions} submissions! </h5>) : <></>}
      {submissions.map((submission, index) => (
        <div className='singleReviewContainer' key={index}>
          <div className='singleReview' id={submission.pending === 1 ? 'pending' : undefined} onClick={() => handleReviewInfo(submission)}>
            <div className='reviewProject' style={{ backgroundImage: `url(${reviewsTest[index%3].projectBackgroundPicture})`, borderRadius: '10px 10px 0 0' }}>
              <h1>{submission.proname}</h1>
              <img className='chatLogo' src={chatLogo} onClick={(event) => {event.stopPropagation(); handleLogChat(index)}}/>
            </div>
            <div className='reviewsAndTags'>
              <h2 className='reviewTitle'>{submission.reviewtitle}</h2>
              <ul className='tagList'>
                {submission.tags && submission.tags.map((tag, tagIndex) => (
                  <li className='tag' key={tagIndex}>{tag.tag}</li>
                ))}
              </ul>
            </div>
          </div>
          {(isChatLogOpen[index] || showAllComments) && (
              <div className='reviewLog'>
                <div className='userAndLog'>
                  <h3 className='userLogUser'>{submission.member_account}:</h3>
                  <h3 className='userLog'>Commited</h3>
                </div>
                {submission.userLogs.map((log, logIndex) => (
                  <div className='userAndLog' key={logIndex}>
                    <h3 className='userLogUser'>{log}:</h3>
                    <h3 className='userLog'>Comment added</h3>
                  </div>
                ))}
              </div>
            )}
        </div>
      ))}
    </div>
    } 

    {selectedOption === "new" &&
      <NewReview setSelectedOptionMenu={setSelectedOption}/>
    } 

    {reviewInfo && 
      <ReviewInfo review={reviewInfo} setReviewInfo={setReviewInfo} setSelectedOption={setSelectedOption}/>
    }

    </div>
  );
}

export default MyReviews;