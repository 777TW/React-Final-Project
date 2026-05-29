import { Link } from 'react-router-dom';
import './MapCard.css';

export default function MapCard({ id, imageSrc, title, difficultyText, activeBars = 3 }) {
    const totalBars = 4;
    
    return (
        <Link to={`/game/${encodeURIComponent(title)}`} style={{ textDecoration: 'none' }}>
            <div className="map-card" style={{ backgroundImage: `url(${imageSrc})` }}>
            <div className="map-card-overlay">
                <div className="map-card-content">
                    <h2 className="map-card-title">{title}</h2>
                    <div className="map-card-difficulty">
                        <div className={`difficulty-bars bars-${activeBars}`}>
                            {[...Array(totalBars)].map((_, index) => {
                                const isActive = index < activeBars;
                                return (
                                    <div 
                                        key={index} 
                                        className={`bar bar-${index + 1} ${isActive ? 'active' : 'inactive'}`}
                                    ></div>
                                );
                            })}
                        </div>
                        <span className="difficulty-text">{difficultyText}</span>
                    </div>
                </div>
            </div>
            </div>
        </Link>
    );
}