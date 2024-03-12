import overlayaddorg from '../css/overlayaddorg.css'

const Overlay = ({setShowOverlay}) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <p>Hola</p>
        <button onClick={() => setShowOverlay(false)}>Cerrar</button>
      </div>
    </div>
  );
};

export default Overlay;