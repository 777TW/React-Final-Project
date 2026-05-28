import './App.css'
import NavBar from './components/NavBar.jsx'
import MapFilterBar from './components/MapFilterBar.jsx';
import MapCard from './components/MapCard.jsx';
import mapData from './data/maps.json';

function App() {
    return (
        <div>
            <NavBar />
            <MapFilterBar />

            <div className="card-grid-container">
                {mapData.map((mapInfo) => (
                    <MapCard 
                        key={mapInfo.id}
                        imageSrc={mapInfo.imageSrc}
                        title={mapInfo.title}
                        difficultyText={mapInfo.difficultyText}
                        activeBars={mapInfo.activeBars}
                    />
                ))}
            </div>
        </div>
    );
}

export default App
