import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import logo from '../../photos/MapLogo.png';
import MountainCardList from "./MountainCardList";
import '../../style/MapStyles.css';

// Create costum icon
const customIcon = new L.icon({
    iconUrl: logo,
    iconSize: [30,30],
    iconAnchor: [19, 38], // Anchor the icon at the bottom center
    popupAnchor: [0, -38], // Position the popup above the icon
});

export default function ResortsMap( { regions } ) {

    const mapRef = useRef(null);
    const latitude = 41.505;
    const longitude = -80.09;

    return ( 
      // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[latitude, longitude]} zoom={2.5} ref={mapRef} className="map-container">
          <TileLayer
            attribution='Tiles &copy; Esri &mdash; Source: USGS, Esri, TANA, DeLorme, and NPS'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
          />
          {regions.map((region) => (
            region.region.length > 0 ? (
              <Marker key={region.name} position={region.coordinates} icon={customIcon}>
              <Popup className="popup">
                <div className="popup-content">
                  <p className="region-name">{region.name}</p>
                  <MountainCardList mountains={region.region} />
                </div>
              </Popup>
            </Marker>
            ) : ''
          ))}
        </MapContainer>
    );
}