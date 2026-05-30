import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function FitBounds({ correctLocation, guessedLocation }) {
    const map = useMap();
    useEffect(() => {
        if (correctLocation && guessedLocation) {
            const bounds = L.latLngBounds([correctLocation, guessedLocation]);
            map.fitBounds(bounds, { padding: [100, 100], animate: true });
        }
    }, [map, correctLocation, guessedLocation]);
    return null;
}

export default function SummaryMap({ correctLocation, guessedLocation }) {
    return (
        <MapContainer 
            center={correctLocation} 
            zoom={13} 
            zoomControl={false}
            scrollWheelZoom={true} 
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {correctLocation && <Marker position={correctLocation} />}
            {guessedLocation && <Marker position={guessedLocation} />}
            
            {correctLocation && guessedLocation && (
                <>
                    <Polyline 
                        positions={[correctLocation, guessedLocation]} 
                        pathOptions={{ color: 'black', weight: 3, dashArray: '5, 10' }} 
                    />
                    <FitBounds correctLocation={correctLocation} guessedLocation={guessedLocation} />
                </>
            )}
        </MapContainer>
    );
}
