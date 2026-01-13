import './Blog.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState } from 'react';

// mock data
const trips = [
    { id: 1, city: "Adelaide - Darwin", title: "The Ghan", year: 2025, region: "Oceania", lat: -34.9285, lng: 138.6007,  },
    { id: 2, city: "Dimboola", title: "Pink Lake", year: 2025, region: "Oceania", lat: -36.4555, lng: 142.0275 },
    { id: 3, city: "Tokyo", title: "Home", year: 2026, region: "Asia", lat: 35.68, lng: 139.77 },
    { id: 4, city: "Den Haag", title: "The Netherlands", region: "Europe", year: 2022, lat: 52.0705, lng: 4.3007 }
];

const tripYears = [...new Set(trips.map((t) => t.year))].sort((a, b) => a - b);
const tripRegions = ["Asia", "Oceania", "Europe", "Africa", "North America"];


function Blog() {

    // filter markers
    const [yearFilter, setYearFilter] = useState([]);
    const [regionFilter, setRegionFilter] = useState([]);
    const filteredTrips = trips.filter( trip => {
        const yearMatch = yearFilter.length == 0 || yearFilter.includes(trip.year);
        const regionMatch = regionFilter.length == 0 || regionFilter.includes(trip.region);
        return yearMatch && regionMatch;
    });

    return (
        <div className="adventures">
            <header>my adventures around the world</header>

            <main>
                <div className="filters">
                    <div className="filter">
                        <h4>Year</h4>
                        {tripYears.map((year) => (
                            <div className="filterOption" key={year}>
                                <label htmlFor={year}>{year}</label>
                                <input type="checkbox" name={year} id={year} value={year} onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (yearFilter.includes(value)) {
                                        setYearFilter(yearFilter.filter(y => y !== value));
                                    } else {
                                        setYearFilter([...yearFilter, value]);
                                    }
                                }} />
                            </div>
                        ))}
                    </div>
                    <div className="filter">
                        <h4>Region</h4>
                        {tripRegions.map((region) => (
                            <div className="filterOption" key={region}>
                                <label htmlFor={region}>{region}</label>
                                <input type="checkbox" name={region} id={region} value={region} onChange={(e) => {
                                    const value = e.target.value;
                                    if (regionFilter.includes(region)) {
                                        setRegionFilter(regionFilter.filter(r => r !== value));
                                    } else {
                                        setRegionFilter([...regionFilter, value]);
                                    }
                                }} />
                            </div>
                        ))}
                    </div>
                </div>

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
                    {filteredTrips.map(trip => (
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