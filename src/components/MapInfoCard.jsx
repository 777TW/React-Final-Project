import './MapInfoCard.css';

export default function MapInfoCard({ iconClass, value, label }) {
    return (
        <div className="map-info-card">
            <div className="map-info-icon">
                <i className={iconClass}></i>
            </div>
            <div className="map-info-text">
                <span className="map-info-value">{value}</span>
                <span className="map-info-label">{label}</span>
            </div>
        </div>
    );
}
