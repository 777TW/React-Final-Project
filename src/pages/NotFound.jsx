import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <h1 className="notfound-title">404</h1>
                <h2 className="notfound-subtitle">Page Not Found</h2>
                <p className="notfound-text">Oops! It looks like you've wandered off the map.</p>
                <button className="notfound-btn" onClick={() => navigate('/')}>
                    BACK TO HOME
                </button>
            </div>
        </div>
    );
}
