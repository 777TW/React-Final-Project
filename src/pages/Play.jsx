import { useParams, Link } from 'react-router-dom';

export default function Play() {
    const { mapTitle } = useParams();

    return (
        <div style={{ color: 'white', padding: '50px', textAlign: 'center' }}>
            <h1>Gameplay Screen</h1>
            <p>You are now playing the map: {decodeURIComponent(mapTitle)}</p>
            <br />
            <Link to={`/game/${mapTitle}`} style={{ color: '#c4b5fd', fontSize: '20px', textDecoration: 'underline' }}>
                Go back to lobby
            </Link>
        </div>
    );
}
