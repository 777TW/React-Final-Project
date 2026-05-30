import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './GuessMap.css'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

function LocationMarker({ pinPosition, onPinDropped }) {
    useMapEvents({
        click(e) {
            if (onPinDropped) onPinDropped(e.latlng);
        },
    });
    return pinPosition === null ? null : (
        <Marker position={pinPosition}></Marker>
    )
}

export default function GuessMap({ pinPosition, onPinDropped }) {
    const center = [24.7868, 120.9974];
    return (
        <div className = "guess-map-container">
            <MapContainer
                center = {center}
                zoom = {15}
                scroolWheelZoom = {true}
                style = {{ height: "100%", width: "100%"}}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker pinPosition={pinPosition} onPinDropped={onPinDropped} />
            </MapContainer>
        </div>
    )
}