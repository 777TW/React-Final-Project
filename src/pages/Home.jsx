import { useState } from 'react';
import '../App.css'
import NavBar from '../components/NavBar.jsx'
import MapFilterBar from '../components/MapFilterBar.jsx';
import MapCard from '../components/MapCard.jsx';
import mapData from '../data/maps.json';

function Home() {
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMaps = mapData.filter(map => {
        const matchesCategory = activeFilter === "ALL" || map.category === activeFilter;
        const matchesSearch = map.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div>
            <NavBar setSearchQuery={setSearchQuery} />
            <MapFilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            <div className="card-grid-container">
                {filteredMaps.map((mapInfo) => (
                    <MapCard 
                        key={mapInfo.id}
                        id={mapInfo.id}
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

export default Home;
