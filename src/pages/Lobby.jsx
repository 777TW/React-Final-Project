import { useParams, Link, useNavigate } from 'react-router-dom';
import './Lobby.css';
import MapCard from '../components/MapCard.jsx';
import MapInfoCard from '../components/MapInfoCard.jsx';
import mapData from '../data/maps.json';
import NavBar from '../components/NavBar.jsx'

export default function Lobby() {
    const { mapTitle } = useParams();
    const navigate = useNavigate();

    const decodedTitle = decodeURIComponent(mapTitle);
    const mapInfo = mapData.find(m => m.title === decodedTitle);

    if (!mapInfo) {
        return <div className="lobby-container"><h2>Map not found!</h2></div>;
    }

    const seed = decodedTitle.length;
    const plays = (seed * 113421).toLocaleString();
    const locations = (seed * 12) + "K+";
    const likes = (seed * 987).toLocaleString();
    const avgScore = 10000 + (seed * 311);

    return (
        <div className="lobby-container">
            <NavBar />
            <div className="lobby-inner">
                <div className="lobby-header">
                <button className="back-button" onClick={() => navigate('/')}>
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <div className="lobby-title-container">
                    <img 
                        src="https://www.geoguessr.com/_next/static/media/maps.4f8b2837.webp" 
                        alt="logo" 
                        className="lobby-logo" 
                    />
                    <h1>CLASSIC MAPS</h1>
                </div>
            </div>

            <div className="lobby-content">
                <div className="lobby-left-col">
                    <div className="lobby-silhouette-bg">
                        <i className="fa-solid fa-earth-americas silhouette-icon"></i>
                    </div>
                    <div className="lobby-card-wrapper">
                        <div className="map-card" style={{ backgroundImage: `url(${mapInfo.imageSrc})` }}>
                            <div className="map-card-overlay">
                                <div className="map-card-content">
                                    <h2 className="map-card-title">{mapInfo.title}</h2>
                                    <div className="map-card-difficulty">
                                        <div className={`difficulty-bars bars-${mapInfo.activeBars}`}>
                                            {[...Array(4)].map((_, index) => {
                                                const isActive = index < mapInfo.activeBars;
                                                return (
                                                    <div 
                                                        key={index} 
                                                        className={`bar bar-${index + 1} ${isActive ? 'active' : 'inactive'}`}
                                                    ></div>
                                                );
                                            })}
                                        </div>
                                        <span className="difficulty-text">{mapInfo.difficultyText}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lobby-right-col">
                    <div className="lobby-info-panel">
                        <div className="stats-grid">
                            <MapInfoCard iconClass="fa-solid fa-users" value={plays} label="plays" />
                            <MapInfoCard iconClass="fa-solid fa-earth-africa" value={locations} label="locations" />
                            <MapInfoCard iconClass="fa-regular fa-heart" value={likes} label="liked this map" />
                            <MapInfoCard iconClass="fa-solid fa-bullseye" value={avgScore.toLocaleString()} label="average score" />
                        </div>
                        
                        <div className="lobby-description">
                            <p>{mapInfo.description}</p>
                        </div>
                    </div>

                    <button className="lobby-play-button" onClick={() => navigate(`/play/${encodeURIComponent(mapInfo.title)}`)}>
                        PLAY
                    </button>
                </div>
            </div>
            </div>
        </div>
    );
}
