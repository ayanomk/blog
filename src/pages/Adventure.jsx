import './Adventure.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState } from 'react';
import { mockData } from '../data/mockData.js';

const tripYears = [...new Set(mockData.map((t) => t.year))].sort((a, b) => a - b);
const tripRegions = ["Asia", "Oceania", "Europe", "Africa", "North America"];

/**
 * 
 * @param {*} filterBy string of type of filter
 * @param {*} filterOptions array of filter options to create checkbox
 * @param {*} state useState state to store checked options
 * @param {*} setState useState setState to changed stored options
 * @returns HTML checkboxes
 */

const filterMaker = (filterBy, filterOptions, state, setState, expandState, setExpandState) => {

    return <div className="filter">
        <div className="filterBy" onClick={() => {
            setExpandState(!expandState);
        }}>
            <h4>{filterBy}</h4>
            <button><img src="/icon/arrow-down-01-stroke-rounded.svg" alt="" /></button>
        </div>
        {filterOptions.map((option) => expandState && (
            <div className="filterOption" key={option}>
                <label>{option}
                    <input type="checkbox" value={option} onChange={(e) => {
                        const value = Number(e.target.value);
                        if (state.includes(value)) {
                            setState(state.filter(y => y !== value));
                        } else {
                            setState([...state, value]);
                        }
                    }} />
                </label>
            </div>
        ))}
    </div>
}

/**
 * 
 * @returns JSX
 */
function Adventure() {

    // filter markers
    const [yearFilter, setYearFilter] = useState([]);
    const [regionFilter, setRegionFilter] = useState([]);
    const filteredTrips = mockData.filter( trip => {
        const yearMatch = yearFilter.length == 0 || yearFilter.includes(trip.year);
        const regionMatch = regionFilter.length == 0 || regionFilter.includes(trip.region);
        return yearMatch && regionMatch;
    });

    const [showFilters, setShowFilters] = useState(false);
    const [yearExpand, setYearExpand] = useState(false);
    const [regionExpand, setRegionExpand] = useState(false);
    const filterControls = () => (
        <>
            <div className="filterHeader">
                <div className="filterTitle">
                    <h2>Filter</h2>
                    <button className='filterClose' onClick={() => setShowFilters(false)}>
                        <img src="/icon/cancel-01-stroke-rounded.svg" alt="" />
                    </button>
                </div>
                <div className="filterAction">
                    <button className='filterActionClear'>Clear All</button>
                    <button className='filterActionApply'>Apply</button>
                </div>
            </div>
            <div className="filters">
                {filterMaker("Year", tripYears, yearFilter, setYearFilter, yearExpand, setYearExpand)}
                {filterMaker("Region", tripRegions, regionFilter, setRegionFilter, regionExpand, setRegionExpand)}
            </div>
        </>
    )

    // JSX
    return (
        <div className="adventures">
            <header>
                <h1>my adventures around the world</h1>
            </header>

            <main>
                <div className="desktopFilter">
                    {filterControls()}
                </div>

                <div className="settings">
                    <button className='filterToggle' onClick={() => {
                        setShowFilters(!showFilters);
                    }}>
                        <img src="/icon/filter-stroke-rounded.svg" alt="" />
                    </button>

                    <button className="viewToggle">
                        <img src="/icon/album-02-stroke-rounded.svg" alt="" />
                    </button>
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

                <div className={`mobileFilter ${showFilters ? 'openFilter' : ''}`}>
                    <div className="mobileFilterContent">
                        {filterControls()}
                    </div>
                </div>
            </main>
        </div>
    )
}


export default Adventure