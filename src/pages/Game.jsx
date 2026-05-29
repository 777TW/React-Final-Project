import { useParams, Link } from 'react-router-dom';

function Game() {
    // This grabs the dynamic part of the URL (e.g. /game/France -> mapTitle = "France")
    const { mapTitle } = useParams();

    return (
        <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>
            <h1>Game Scene</h1>
            <p>You are about to play map: {mapTitle}</p>
            <br />
            <Link to="/" style={{ color: '#c4b5fd', fontSize: '20px', textDecoration: 'underline' }}>
                Go back to home
            </Link>
        </div>
    );
}

export default Game;
