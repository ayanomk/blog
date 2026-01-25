import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

/**
 * 
 * @param {*} param0 trips: list of trips to display as markers
 * @returns JSX of map
 */
function Map({trips}) {
    return (
        <div className='map-wrapper'>
            <MapContainer
                center={[27.07, 139.77]}    // tokyo
                zoom={2}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'/>

            {/* markers */}
            {trips.map(trip => (
                <Marker key = {trip.id} position={[trip.lat, trip.lng]}>
                    <Popup>
                        <div className="markerPopup">
                            <a href={`/blog/${trip.id}`}>
                                <h3>{trip.title}</h3>
                            </a>
                                <p>{trip.city}</p>
                        </div>
                    </Popup>
                </Marker>
            ))}
            </MapContainer>
        </div>
    )
}

export default Map