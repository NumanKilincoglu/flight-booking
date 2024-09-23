import React from 'react';
import '../../assets/style/FlightFilters.css';

const FlightFilters = ({ sortOptions, arrivalTimes, stopsOptions, airlines, airlineLoadMore, onAirlineSelect, onSortSelect, onTimeSelect }) => {

    const handleLoadMoreAirlines = () => {
        airlineLoadMore();
    };

    const handleAirlineChange = (event) => {
        const selectedIata = event.target.value;
        onAirlineSelect(selectedIata);
    };

    const handleSortChange = (event) => {
        const selectedSort = event.target.value;
        onSortSelect(selectedSort);
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        onTimeSelect(selectedTime);
    };

    return (
        <div className="flight-filters">
            <div className="filter-section">
                <h4>Sort By</h4>
                <select className="flight-sort-dropdown" onChange={handleSortChange}>
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter-section">
                <h4>Arrival Times</h4>
                {arrivalTimes.map(time => (
                    <label key={time.value} className="radio-label" onChange={handleTimeChange}>
                        <input type="radio" name="arrival-time" value={time.value} />
                        {time.label}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h4>Stops</h4>
                {stopsOptions.map(stop => (
                    <label key={stop.value} className="radio-label">
                        <input type="radio" name="stops" value={stop.value} />
                        {stop.label}
                    </label>
                ))}
            </div>
            <div className="filter-section">
                <h4>Airlines</h4>
                <div className='filter-section-scroll'>
                    {airlines.length > 0 ? (
                        airlines.map((airline, index) => (
                            <label key={`${airline.iata}-${index}`} className="radio-label">
                                <input
                                    type="radio"
                                    name="airlines"
                                    value={airline.iata}
                                    onChange={handleAirlineChange}
                                />
                                {airline.publicName}
                            </label>
                        ))
                    ) : (
                        <div>No airlines available</div>
                    )}
                </div>

                <button className='load-more' onClick={handleLoadMoreAirlines}>
                    Load More
                </button>
            </div>
        </div>
    );
};

export default FlightFilters;
