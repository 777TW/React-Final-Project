import { useState, useEffect } from 'react';
import { getLeaderboard } from '../utils/leaderboard';
import './Leaderboard.css';

export default function Leaderboard({ mapTitle }) {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        if (mapTitle) {
            setScores(getLeaderboard(mapTitle));
        }
    }, [mapTitle]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m} min, ${s} sec`;
    };

    const formatDate = (dateString) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    };

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <div className="col-rank">#</div>
                <div className="col-player">PLAYER</div>
                <div className="col-time">TIME</div>
                <div className="col-date">DATE</div>
                <div className="col-points">POINTS</div>
            </div>
            
            <div className="leaderboard-body">
                {scores.length === 0 ? (
                    <div className="leaderboard-empty">No scores yet. Be the first!</div>
                ) : (
                    scores.map((entry, idx) => (
                        <div className="leaderboard-row" key={idx}>
                            <div className="col-rank">
                                <div className="rank-circle">{idx + 1}</div>
                            </div>
                            <div className="col-player">
                                <div className="player-avatar">
                                    {entry.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="player-name">{entry.username}</span>
                            </div>
                            <div className="col-time">{formatTime(entry.time)}</div>
                            <div className="col-date">{formatDate(entry.date)}</div>
                            <div className="col-points">{entry.score.toLocaleString()}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
