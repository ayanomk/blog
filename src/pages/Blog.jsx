import './Blog.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

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
                    </MapContainer>
                </div>
            </main>
        </div>
    )
}


export default Blog