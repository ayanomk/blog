import './Filter.css';

/**
 * 
 * @param {*} filterBy string of type of filter
 * @param {*} filterOptions array of filter options to create checkbox
 * @param {*} state useState state to store checked options
 * @param {*} setState useState setState to changed stored options
 * @returns HTML checkboxes
 */
const filterMaker = (filterBy, filterOptions, state, setState, expandState, setExpandState, key) => {

    return <div className="filter" key={key}>
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

function FilterControls(filterConfig, setShowFilters) {
    return (
        <>
            <div className="filterHeader">
                <div className="filterTitle">
                    <h3>Filter</h3>
                    <button className='filterClose' onClick={() => setShowFilters(false)}>
                        <img src="/icon/cancel-01-stroke-rounded.svg" alt="" />
                    </button>
                </div>
                <div className="filterAction">
                    <button className='filterActionClear' onClick={(e) => {
                        filterConfig.forEach((filter) => {
                            filter.setState([]);
                        })
                    }}>Clear All</button>
                    {/* <button className='filterActionApply'>Apply</button> */}
                </div>
            </div>
            <div className="filters">
                {filterConfig.map((item, idx) => {
                    return filterMaker(item.filterBy, item.filterOptions, item.state, item.setState, item.expandState, item.setExpandState, idx);
                })}
            </div>
        </>
    )
}

export default FilterControls