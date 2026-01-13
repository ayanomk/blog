import './Blog.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

const trips = [
    { id: 1, city: "Adelaide - Darwin", title: "The Ghan", lat: -34.9285, lng: 138.6007,  },
    { id: 2, city: "Dimboola", title: "Pink Lake", lat: -36.4555, lng: 142.0275 }
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
                            <Popup className='markerPopup'>
                                <h3>{trip.title}</h3>
                                <p style={{ margin: "0px" }}>{trip.city}</p>
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