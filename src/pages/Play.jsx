import { useParams, useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'
import nycuLocations from '../data/nycu_locations.json'
import GuessMap from '../components/GuessMap.jsx'
import './Play.css'

export default function Play() {
    const { mapTitle } = useParams();
    const navigate = useNavigate();

    const [currentRound, setCurrentRound] = useState(1);
    const [timeLeft, setTimeleft] = useState(180);
    const [scores, setScores] = useState([
        {score: null, time: null},
        {score: null, time: null},
        {score: null, time: null},
        {score: null, time: null},
        {score: null, time: null}
    ]);
    const [pinPosition, setPinPosition] = useState(null);

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() =>setTimeleft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    const currentLocationData = nycuLocations[currentRound - 1];
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
            time: (180 - timeLeft) - totalTime
        };
        setScores(newScores);

        if (currentRound < 5){
            setCurrentRound(currentRound + 1);
            setPinPosition(null);
        }
        else {
            alert("Game Over!");
        }
    };

    return (
        <div className = "play-container">
            <div
                className = "play-background"
                style = {{ backgroundImage: `url(${currentLocationData.imageSrc})` }}
            ></div>

            <div className = "play-ui-layer">
                <div className = "play-timer">
                    {formatTime(timeLeft)}
                </div>
                <div className = "play-scoreboard">
                    {[1, 2, 3, 4, 5].map((roundNum) => {
                        const rData = scores[roundNum - 1];
                        return (
                            <div key = {roundNum} className = {`scoreboard-round ${currentRound === roundNum ? 'active' : ''}`}>
                                <span className = "round-label">R{roundNum}</span>
                                <span className = "round-score">{rData.score !== null ? rData.score : '-'}</span>
                                <span className = "round-time">{rData.time !== null ? formatTime(rData.time) : (currentRound === roundNum ? formatTime(180 - timeLeft) : '-')}</span>
                            </div>
                        );
                    })}
                    <div className = "scoreboard-round total">
                        <span className = "round-label" style = {{color: "white"}}>Total</span>
                        <span className = "round-score">{totalScore}</span>
                        <span className = "round-time">{formatTime(totalTime)}</span>
                    </div>
                </div>

                <div className = "play-controls">
                    <button className = "control-btn" onClick = {() => navigate(`/game/${mapTitle}`)}>
                        <i className = "fa-solid fa-arrow-left"></i>
                    </button>
                    <button className = "control-btn"><i className = "fa-solid fa-compass"></i></button>
                    <button className = "control-btn"><i className = "fa-solid fa-location-dot"></i></button>
                    <button className = "control-btn"><i className = "fa-solid fa-flag"></i></button>
                </div>

                <div className = "play-map-wrapper">
                    <div style = {{flex: 1, position: 'relative'}}>
                        <GuessMap pinPosition={pinPosition} onPinDropped={(latlng) => setPinPosition(latlng)}/>
                    </div>
                    <button
                        className = "map-guess-btn"
                        onClick = {handleGuess}
                        style = {{backgroundColor: pinPosition ? "#2bd85c" : "#9ca3af"}}
                    >
                        GUESS
                    </button>
                </div>
            </div>
        </div>
    );
}