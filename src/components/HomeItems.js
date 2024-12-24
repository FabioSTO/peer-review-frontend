import '../css/homeitems.css';
import logoOrganizacion from '../img/logoOrganizacion.jpeg'
import logoProyecto from '../img/LogoProyecto.jpeg'
import logoRevision from '../img/logoRevision.jpeg'
import { useNavigate } from 'react-router-dom'; 

function HomeItems() {

  const navigate = useNavigate();

  const handleJoinCapeer = () => {
    
    navigate('/login');

  }

  return (
    <div>
      <div className='register'>
        <h1 className='botonRegister' onClick={handleJoinCapeer}>
          JOIN CAPEER
        </h1>
      </div>
      <section className='Tutoriales'>
          <div className='tuto-container'>
          
            <article  className='tuto' id='tuto1'>
              <h1 className='TutoTextTitle'>CREATE AND JOIN ORGANIZATIONS</h1>
                <div className='textContainer'>
                  <img className='logosTuto' src={logoOrganizacion}/>
                  <p className='TutoText'>Link your GitHub account and create your organizations.</p>
                  <p className='TutoText'>You can do this by linking an already created existent in GitHub or by creating one yourself in the app. You will be able to manage members and moderators.</p>
                </div>
                
            </article >
            <article  className='tuto' id='tuto2'>
              <div className='textContainer'>
                <h1 className='TutoTextTitle'>CREATE AND MANAGE PROJECTS</h1>
                <img className='logosTuto' src={logoProyecto}/>
                <p className='TutoText'>Access the projects under your organization or link independent projects.</p>
                <p className='TutoText'>You will be able to manage the members of the organization and add them or remove them from the projects.</p>
              </div>
            </article >
            <article  className='tuto' id='tuto3'>
              <div className='textContainer'>
                <h1 className='TutoTextTitle'>REVIEW YOUR PARTNERS CODE</h1>
                <img className='logosTuto' src={logoRevision}/>
                <p className='TutoText'>You will be able to post code revisions, images and design submissions.</p>
                <p className='TutoText'>Your partners will review and correct your submissions.</p>
              </div>
            </article >
          </div>
      </section>
    </div>
    );
}

export default HomeItems;