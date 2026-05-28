import { useState } from 'react';
import './App.css'
import NavBar from './components/NavBar.jsx'
import MapFilterBar from './components/MapFilterBar.jsx';
import MapCard from './components/MapCard.jsx';
import mapData from './data/maps.json';

function App() {
    const [activeFilter, setActiveFilter] = useState("ALL");

    const filteredMaps = activeFilter === "ALL" 
        ? mapData 
        : mapData.filter(map => map.category === activeFilter);

    return (
        <div>
            <NavBar />
            <MapFilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="card-grid-container">
                {filteredMaps.map((mapInfo) => (
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
