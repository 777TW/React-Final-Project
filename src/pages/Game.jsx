import { useParams, Link } from 'react-router-dom';
import './Game.css';

function Game() {
    const { mapTitle } = useParams();

    return (
        <div className="game-container">
            <h1>Test</h1>
            <p>You are about to play map: {mapTitle}</p>
            <br />
            <Link to="/" style={{ color: '#c4b5fd', fontSize: '20px', textDecoration: 'underline' }}>
                Go back to home
            </Link>
        </div>
    );
}

export default Game;
