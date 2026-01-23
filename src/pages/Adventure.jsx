import './Adventure.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import { mockData } from '../data/mockData.js';

const tripYears = [...new Set(mockData.map((t) => t.year))].sort((a, b) => a - b);
const tripRegions = ["Asia", "Oceania", "Europe", "Africa", "North America"];

const filterMaker = (filterBy, filterOptions, state, setState) => {
    return <div className="filter">
        <h4>{filterBy}</h4>
        {filterOptions.map((option) => (
            <div className="filterOption" key={option}>
                <label htmlFor={option}>{option}</label>
                <input type="checkbox" name={option} id={option} value={option} onChange={(e) => {
                    const value = Number(e.target.value);
                    if (state.includes(value)) {
                        setState(state.filter(y => y !== value));
                    } else {
                        setState([...state, value]);
                    }
                }} />
            </div>
        ))}
    </div>
}

function Adventure() {

    // filter markers
    const [yearFilter, setYearFilter] = useState([]);
    const [regionFilter, setRegionFilter] = useState([]);
    const filteredTrips = mockData.filter( trip => {
        const yearMatch = yearFilter.length == 0 || yearFilter.includes(trip.year);
        const regionMatch = regionFilter.length == 0 || regionFilter.includes(trip.region);
        return yearMatch && regionMatch;
    });

    return (
        <div className="adventures">
            <header>
                <h1>my adventures around the world</h1>
            </header>

            <main>
                <div className="filters">
                    <h2>Filter</h2>
                    {filterMaker("Year", tripYears, yearFilter, setYearFilter)}
                    {filterMaker("Region", tripRegions, regionFilter, setRegionFilter)}
                </div>

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
                    {filteredTrips.map(trip => (
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
            </main>
        </div>
    )
}


export default Adventure