import './Adventure.css';
import Map from '../components/Map.jsx';
import Recommendation from '../components/Recommendation.jsx';
import { useContext, useEffect, useState } from 'react';
import { getAllBlogs, getBlogsByFilter } from '../services/blogService.js';
import FilterControls from '../components/Filter.jsx';

import { AuthContext } from "../context/AuthContext";

/**
 * 
 * @returns JSX
 */
function Adventure() {
    const {user} = useContext(AuthContext);

    const [draftPublishFilter, setDraftPublishFilter] = useState([]);

    // get all blog data from backend
    const [allBlogs, setAllBlogs] = useState([]);
    useEffect(() => {
        if (user !== null) {
            getAllBlogs()
            .then((data) => {
                setAllBlogs(data);
            })
            .catch(err => {
                if (import.meta.env.MODE === 'development') console.log(err);
            });
        } else {
            setDraftPublishFilter(["Publish"])
            getBlogsByFilter({ state: "Publish" })
            .then((data) => {
                setAllBlogs(data);
            })
            .catch(err => {
                if (import.meta.env.MODE === 'development') console.log(err);
            });
        }
    }, []);
    
    // filter option lists
    const tripYears = [...new Set(allBlogs.map((t) => t.year))].sort((a, b) => a - b);
    const tripRegions = ["Asia", "Oceania", "Europe", "Africa", "North America"];
    const draftPublish = ["Draft", "Publish"];
    
    // filter out blogs
    const [yearFilter, setYearFilter] = useState([]);
    const [regionFilter, setRegionFilter] = useState([]);
    
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    useEffect(() => {
        getBlogsByFilter({ years: yearFilter, regions: regionFilter, state: draftPublishFilter })
            .then((data) => {
                setFilteredBlogs(data);
            })
            .catch(err => {
                if (import.meta.env.MODE === 'development') console.log(err);
                setFilteredBlogs([]);
            });
    }, [yearFilter, regionFilter, draftPublishFilter]);

    // filter options display
    const [showFilters, setShowFilters] = useState(false);
    const [yearExpand, setYearExpand] = useState(false);
    const [regionExpand, setRegionExpand] = useState(false);
    const [draftPublishExpand, setDraftPublishExpand] = useState(false);

    const filterConfig = [
        {
            filterBy: "Year",
            filterOptions: tripYears,
            state: yearFilter,
            setState: setYearFilter,
            expandState: yearExpand,
            setExpandState: setYearExpand
        },
        {
            filterBy: "Region",
            filterOptions: tripRegions,
            state: regionFilter,
            setState: setRegionFilter,
            expandState: regionExpand,
            setExpandState: setRegionExpand
        }
    ];
    if (user !== null) {
        filterConfig.push(
            {
                filterBy: "Publish",
                filterOptions: draftPublish,
                state: draftPublishFilter,
                setState: setDraftPublishFilter,
                expandState: draftPublishExpand,
                setExpandState: setDraftPublishExpand
            }
        )
    }

    // filter by region to display cards
    const regionFiltered = [];
    regionFiltered.push(filteredBlogs.filter((t) => t.region == "Asia"));
    regionFiltered.push(filteredBlogs.filter((t) => t.region == "Oceania"));
    regionFiltered.push(filteredBlogs.filter((t) => t.region == "Europe"));
    regionFiltered.push(filteredBlogs.filter((t) => t.region == "Africa"));
    regionFiltered.push(filteredBlogs.filter((t) => t.region == "North America"));

    // display option: map or card (true = map, false = card)
    const [viewState, setViewState] = useState(true);

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
                        setDraftPublishExpand(false);
                    }}>
                        <img src="/icon/filter-stroke-rounded.svg" alt="" />
                    </button>

                    <button className="viewToggle" onClick={() => setViewState(!viewState)}>
                        <img src={viewState ? "/icon/album-02-stroke-rounded.svg" : "/icon/maps-location-01-stroke-rounded.svg"} alt="" />
                    </button>
                </div>

                <div className="desktopFilter">
                    {FilterControls(filterConfig, setShowFilters)}
                </div>

                <div className="mapCard" style={{display: viewState ? 'block' : 'none'}}>
                    <Map trips={filteredBlogs} />
                </div>
                <div className="mapCard" style={{display: viewState ? 'none' : 'block'}}>
                    {regionFiltered.map((regionBlogs, idx) => {
                        return <Recommendation blogs={regionBlogs} type={"map"} key={idx} />
                    })}
                </div>

                <div className={`mobileFilter ${showFilters ? 'openFilter' : ''}`}>
                    <div className="mobileFilterContent">
                        {FilterControls(filterConfig, setShowFilters)}
                    </div>
                </div>
            </main>
        </div>
    )
}


export default Adventure