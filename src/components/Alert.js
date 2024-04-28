import '../css/alert.css';
import blueCheck from '../img/blueCheck.png'

const Alert = ({ message }) => {
  return (
    <div className='alertContainer'>
      <div className="alert">
        <img id='blueCheck' src={blueCheck} alt='Blue check'/>
        <div className='alertText'>
          <h4 id='success'>Success</h4>
          <h4 id='successMessage'>{message}</h4>
        </div>
      </div>
      <div id="bottomLine"></div>
    </div>
  );
};

export default Alert;