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

function FitBounds({ correctLocation, guessedLocation, allRounds }) {
    const map = useMap();
    useEffect(() => {
        let points = [];
        if (allRounds && allRounds.length > 0) {
            allRounds.forEach(r => {
                if (r.correct) points.push(r.correct);
                if (r.guess) points.push(r.guess);
            });
        } else if (correctLocation && guessedLocation) {
            points = [correctLocation, guessedLocation];
        }

        if (points.length > 0) {
            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds, { padding: [100, 100], animate: true });
        }
    }, [map, correctLocation, guessedLocation, allRounds]);
    return null;
}

const blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function SummaryMap({ correctLocation, guessedLocation, allRounds }) {
    const center = allRounds && allRounds[0]?.correct ? allRounds[0].correct : correctLocation || [0,0];

    return (
        <MapContainer 
            center={center} 
            zoom={13} 
            zoomControl={false}
            scrollWheelZoom={true} 
            style={{ height: "100%", width: "100%", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {!allRounds && correctLocation && <Marker position={correctLocation} icon={blackIcon} />}
            {!allRounds && guessedLocation && <Marker position={guessedLocation} />}
            {!allRounds && correctLocation && guessedLocation && (
                <Polyline 
                    positions={[correctLocation, guessedLocation]} 
                    pathOptions={{ color: 'black', weight: 3, dashArray: '5, 10' }} 
                />
            )}

            {allRounds && allRounds.map((round, i) => {
                if (!round.correct || !round.guess) return null;
                return (
                    <div key={i}>
                        <Marker position={round.correct} icon={blackIcon} />
                        <Marker position={round.guess} />
                        <Polyline 
                            positions={[round.correct, round.guess]} 
                            pathOptions={{ color: 'black', weight: 3, dashArray: '5, 10' }} 
                        />
                    </div>
                );
            })}

            <FitBounds correctLocation={correctLocation} guessedLocation={guessedLocation} allRounds={allRounds} />
        </MapContainer>
    );
}
