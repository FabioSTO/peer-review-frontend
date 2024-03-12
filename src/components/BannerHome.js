import anonymous from '../img/anonymous.jpg'
import capiLogo from '../img/capiLogo.jpeg'
import '../css/banner.css'


function Banner() {

  return (
    <div className="banner"> 
      <img className='capiLogo' src={capiLogo} alt='Logo de capibara'/>
      <div className='title'> CAPEER</div>
      
    </div>
  )
}

export default Banner;