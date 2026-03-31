import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import './Map.css';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel.jsx';

/**
 * 
 * @param {*} param0 trips: list of trips to display as markers
 * @returns JSX of map
 */
function Map({trips}) {

    const cityGroups = {};
    trips.forEach(trip => {
        const key = `${trip.city.trim().toLowerCase()}_${trip.country.trim().toLowerCase()}`;

        if (!cityGroups[key]) {
            cityGroups[key] = {
                city: trip.city.trim(),
                country: trip.country.trim(),
                lat: trip.lat,
                lng: trip.lng,
                blogs: []
            };
        }

        cityGroups[key].blogs.push(trip);
    })
    const cityGroupsArray = Object.values(cityGroups);

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
            {cityGroupsArray.map((group, idx) => (
                <Marker key={idx} position={[group.lat, group.lng]}>
                    <Popup>
                        <div className='markerPopup'>
                            <div className="popupBlog">
                                <Carousel data={group.blogs} />
                            </div>
                            <p className='popupCity'>{group.city}, {group.country}</p>
                        </div>
                    </Popup>
                </Marker>
            ))};
            </MapContainer>
        </div>
    )
}

export default Map