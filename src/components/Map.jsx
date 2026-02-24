import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { Link } from 'react-router-dom';

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
                <Marker key = {trip._id} position={[trip.lat, trip.lng]}>
                    <Popup>
                        <div className="markerPopup">
                            <Link to={`/blogs/${trip._id}`}>
                                <h4>{trip.title}</h4>
                                <p>{trip.city}</p>
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
            </MapContainer>
        </div>
    )
}

export default Map