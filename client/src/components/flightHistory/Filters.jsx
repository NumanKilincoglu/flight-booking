import React from 'react';
import '../../assets/style/HistoryFilters.css';

const FilterSection = () => {
    const starOptions = [2, 3, 4, 5, 6];

    return (
        <div className="history-filter-section">
            <div className="filter-buttons">
                <button className="filter-button">Times</button>
                <button className="filter-button">Stops</button>
                <button className="filter-button">Airlines</button>
                <button className="filter-button">Airports</button>
                <button className="filter-button">Amenities</button>
                <button className="edit-search-button">
                    Edit Search
                    <div className='dropdown-arrow'></div>
                </button>
            </div>
            <div className="star-rating-section">
                {starOptions.map((starCount, index) => (
                    <React.Fragment key={index}>
                        <div className="star-group">
                            <div className="star-rating">
                                {[...Array(6)].map((_, i) => (
                                    <span key={i} className={`star ${i < starCount ? 'filled' : 'star-empty'}`}>
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                        {index < starOptions.length - 1 && (
                            <div className="divider"></div>
                        )}
                    </React.Fragment>
                ))}
            </div>

        </div>
    );
};

export default FilterSection;
