import './Blog.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

// mock data
const trips = [
    { id: 1, city: "Adelaide - Darwin", title: "The Ghan", year: "2025", lat: -34.9285, lng: 138.6007,  },
    { id: 2, city: "Dimboola", title: "Pink Lake", year: "2025", lat: -36.4555, lng: 142.0275 },
    { id: 3, city: "Tokyo", title: "Home", year: "2026", lat: 35.68, lng: 139.77 }
];


function Blog() {
    return (
        <div className="adventures">
            <header>my adventures around the world</header>

            <main>
                <div className='map-wrapper'>
                    <MapContainer
                        center={[35.68, 139.77]}    // tokyo
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
                                    <a href={`/adventure/${trip.id}`}>
                                        <h3>{trip.title}</h3>
                                    </a>
                                        <p>{trip.city}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    </MapContainer>
                </div>
            </main>
        </div>
    )
}


export default Blog