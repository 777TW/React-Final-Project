import { useParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import GuessMap from '../components/GuessMap.jsx'
import SummaryMap from '../components/SummaryMap.jsx'
import './Play.css'

function AnimatedNumber({ value, formatFn, duration = 1500, onComplete }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        let startTime;
        let isCompleted = false;
        let animationFrameId;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
            
            setDisplayValue(value * easeOut);

            if (percentage < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayValue(value);
                if (!isCompleted && onComplete) {
                    isCompleted = true;
                    onComplete();
                }
            }
        };
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [value, duration]);

    return <>{formatFn ? formatFn(displayValue) : Math.round(displayValue)}</>;
}

export default function Play() {
    const { mapTitle } = useParams();
    const navigate = useNavigate();

    const [currentRound, setCurrentRound] = useState(1);
    const [timeLeft, setTimeleft] = useState(180);
    const [scores, setScores] = useState([
        {score: null, time: null, guess: null, correct: null},
        {score: null, time: null, guess: null, correct: null},
        {score: null, time: null, guess: null, correct: null},
        {score: null, time: null, guess: null, correct: null},
        {score: null, time: null, guess: null, correct: null}
    ]);
    const [pinPosition, setPinPosition] = useState(null);
    
    const [showRoundSummary, setShowRoundSummary] = useState(false);
    const [lastDistance, setLastDistance] = useState(0);
    
    const [isGameOver, setIsGameOver] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !showRoundSummary && !isGameOver) {
            const timerId = setTimeout(() =>setTimeleft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft, showRoundSummary]);

    const decodedTitle = decodeURIComponent(mapTitle);
    const mapKey = `../data/${decodedTitle.toLowerCase()}_locations.json`;
    const allLocationMaps = import.meta.glob('../data/*_locations.json', { eager: true });
    const locationsData = allLocationMaps[mapKey]?.default || [];

    const [roundLocations, setRoundLocations] = useState(() => {
        if (locationsData.length === 0) return [];
        const shuffled = [...locationsData].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 5);
    });

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    const currentLocationData = roundLocations[currentRound - 1];
    const totalScore = scores.reduce((sum, r) => sum + (r.score || 0), 0);
    const totalTime = scores.reduce((sum, r) => sum + (r.time || 0), 0);

    const haversineDistance = (coords1, coords2) => {
        const toRad = (x) => x * Math.PI / 180;
        const R = 6371;
        const dLat = toRad(coords2.lat - coords1.lat);
        const dLon = toRad(coords2.lng - coords1.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
            Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const calculateScore = (distanceKm) => {
        if (distanceKm < 0.02) return 5000;
        const score = Math.floor(5000 * Math.exp(-distanceKm / 0.5));
        return Math.max(0, score);
    };

    const handleGuess = () => { 
        if (!pinPosition){
            return;
        }
        const correctCoords = {lat: currentLocationData.lat, lng: currentLocationData.lng};
        const distance = haversineDistance(pinPosition, correctCoords);
        const score = calculateScore(distance);

        const newScores = [...scores];
        newScores[currentRound - 1] = {
            score: score,
            time: 180 - timeLeft,
            guess: pinPosition,
            correct: correctCoords
        };
        setScores(newScores);
        setTimeleft(180);
        setLastDistance(distance);
        setShowRoundSummary(true); 
    };

    const handleNextRound = () => {
        if (currentRound < 5){
            setCurrentRound(currentRound + 1);
            setPinPosition(null);
            setShowRoundSummary(false); 
        }
        else {
            setShowRoundSummary(false);
            setIsGameOver(true);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && showRoundSummary) {
                e.preventDefault();
                handleNextRound();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showRoundSummary, currentRound]);

    return (
        <div className="play-container">
            {isGameOver && (
                <div className="game-over-container">
                    <div className="summary-map-bg">
                        <SummaryMap allRounds={scores} />
                    </div>
                    <div className="game-over-overlay">
                        <div className="game-over-content">
                            <h2 className="game-over-title">YOUR SCORE</h2>
                            <div className="game-over-score">
                                <AnimatedNumber 
                                    value={totalScore} 
                                    duration={2500} 
                                    onComplete={() => setIsAnimationDone(true)} 
                                />
                            </div>
                            
                            {isAnimationDone && (
                                <button className="home-btn" onClick={() => navigate('/')}>
                                    PLAY AGAIN
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!isGameOver && !showRoundSummary && (
                <div
                    className="play-background"
                    style={{ backgroundImage: `url(${currentLocationData.imageSrc})` }}
                ></div>
            )}
            
            {!isGameOver && showRoundSummary && (
                <div className="summary-map-bg">
                    <SummaryMap 
                        correctLocation={{ lat: currentLocationData.lat, lng: currentLocationData.lng }}
                        guessedLocation={pinPosition}
                    />
                </div>
            )}

            {!isGameOver && (
                <div className="play-ui-layer">
                {!showRoundSummary && (
                    <div className="play-timer">
                        {formatTime(timeLeft)}
                    </div>
                )}
                
                <div className="play-scoreboard">
                    {[1, 2, 3, 4, 5].map((roundNum) => {
                        const rData = scores[roundNum - 1];
                        return (
                            <div key={roundNum} className={`scoreboard-round ${currentRound === roundNum ? 'active' : ''}`}>
                                <span className="round-label">R{roundNum}</span>
                                <span className="round-score">{rData.score !== null ? rData.score : '-'}</span>
                                <span className="round-time">{rData.time !== null ? formatTime(rData.time) : (currentRound === roundNum ? formatTime(180 - timeLeft) : '-')}</span>
                            </div>
                        );
                    })}
                    <div className="scoreboard-round total">
                        <span className="round-label" style={{color: "white"}}>Total</span>
                        <span className="round-score">{totalScore}</span>
                        <span className="round-time">{formatTime(totalTime)}</span>
                    </div>
                </div>

                {!showRoundSummary ? (
                    <>
                        <div className="play-controls">
                            <button className="control-btn" onClick={() => navigate(`/game/${mapTitle}`)}>
                                <i className="fa-solid fa-arrow-left"></i>
                            </button>
                            <button className="control-btn"><i className="fa-solid fa-compass"></i></button>
                            <button className="control-btn"><i className="fa-solid fa-location-dot"></i></button>
                            <button className="control-btn"><i className="fa-solid fa-flag"></i></button>
                        </div>

                        <div className="play-map-wrapper">
                            <div style={{flex: 1, position: 'relative'}}>
                                <GuessMap pinPosition={pinPosition} onPinDropped={(latlng) => setPinPosition(latlng)}/>
                            </div>
                            <button
                                className="map-guess-btn"
                                onClick={handleGuess}
                                style={{backgroundColor: pinPosition ? "#2bd85c" : "#9ca3af"}}
                            >
                                GUESS
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="summary-ui-layer">
                        <div className="summary-info-card">
                            <img src={currentLocationData.imageSrc} alt="Location" className="summary-info-img" />
                            <div className="summary-info-text">
                                <div className="summary-info-label">Hint</div>
                                <div className="summary-info-hint">{currentLocationData.hint}</div>
                            </div>
                        </div>

                        <div className="summary-bottom-panel">
                            <div className="summary-stat">
                                <span className="stat-value">
                                    <AnimatedNumber 
                                        value={lastDistance} 
                                        formatFn={(val) => val < 1 ? Math.round(val * 1000) + ' m' : val.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' km'} 
                                    />
                                </span>
                                <span className="stat-label">From Location</span>
                            </div>
                            
                            <div className="summary-next-container">
                                <button className="summary-next-btn" onClick={handleNextRound}>
                                    {currentRound === 5 ? "VIEW SUMMARY" : "NEXT"}
                                </button>
                                <span className="hit-space">HIT SPACE TO CONTINUE</span>
                            </div>

                            <div className="summary-stat">
                                <span className="stat-value score">
                                    <AnimatedNumber value={scores[currentRound - 1]?.score || 0} />
                                </span>
                                <span className="stat-label">Of 5,000 Points</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            )}
        </div>
    );
}