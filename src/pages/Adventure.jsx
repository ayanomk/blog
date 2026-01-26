import './Adventure.css';
import Map from '../components/Map.jsx';
import Recommendation from '../components/Recommendation.jsx';
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
                    <input type="checkbox" value={option} checked={state.includes(option)} onChange={(e) => {
                        const value = Number(e.target.value) ? Number(e.target.value) : e.target.value;
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
                    <button className='filterActionClear' onClick={(e) => {
                        setYearFilter([]);
                        setRegionFilter([]);
                    }}>Clear All</button>
                    {/* <button className='filterActionApply'>Apply</button> */}
                </div>
            </div>
            <div className="filters">
                {filterMaker("Year", tripYears, yearFilter, setYearFilter, yearExpand, setYearExpand)}
                {filterMaker("Region", tripRegions, regionFilter, setRegionFilter, regionExpand, setRegionExpand)}
            </div>
        </>
    )

    // filter by region to display cards
    const regionFiltered = [];
    regionFiltered.push(filteredTrips.filter((t) => t.region == "Asia"));
    regionFiltered.push(filteredTrips.filter((t) => t.region == "Oceania"));
    regionFiltered.push(filteredTrips.filter((t) => t.region == "Europe"));
    regionFiltered.push(filteredTrips.filter((t) => t.region == "Africa"));
    regionFiltered.push(filteredTrips.filter((t) => t.region == "North America"));

    // JSX
    return (
        <div className="adventures">
            <header>
                <h1>my adventures around the world</h1>
            </header>

            <main>
                <div className="settings">
                    <button className='filterToggle' onClick={() => {
                        setShowFilters(!showFilters);
                        setYearExpand(false);
                        setRegionExpand(false);
                    }}>
                        <img src="/icon/filter-stroke-rounded.svg" alt="" />
                    </button>

                    <button className="viewToggle">
                        <img src="/icon/album-02-stroke-rounded.svg" alt="" />
                    </button>
                </div>

                <div className="desktopFilter">
                    {filterControls()}
                </div>

                <div className="mapCard">
                    {/* <Map trips={filteredTrips} /> */}
                    <div className="regionalCards">
                        {regionFiltered.map((region, idx) => {
                            return <Recommendation data={region} type={"map"} key={idx} />
                        })}
                    </div>
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