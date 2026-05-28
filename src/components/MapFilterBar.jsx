import './MapFilterBar.css'
import Button from './Button.jsx'

export default function MapFilterBar ({ activeFilter, setActiveFilter }){
    const filters = [
        "ALL",
        "NORTH AMERICA",
        "SOUTH AMERICA",
        "AFRICA",
        "ASIA",
        "EUROPE",
        "OCEANIA",
        "CUSTOM"
    ];

    return (
        <div className="map-filter-wrapper">
            <div className="map-filter-container">
                <div className="filter-header">
                    <img 
                        src="https://www.geoguessr.com/_next/static/media/maps.4f8b2837.webp" 
                        alt="Map Image"
                        id="MapImage"
                    />
                    <p className="filter-title">CLASSIC MAPS</p>
                    <div className="separator"></div>
                </div>
                <div className="filter">
                    {filters.map((filter) => (
                        <Button 
                            key={filter}
                            content={filter}
                            color={activeFilter === filter ? "dark" : ""}
                            onClick={() => setActiveFilter(filter)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}