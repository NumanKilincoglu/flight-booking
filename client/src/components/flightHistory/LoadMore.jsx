import React from 'react';
import '../../assets/style/HandleMore.css';

/* Pagination komponenti */

const LoadMore = ({ onNextPage }) => {

    const handleLoadMore = () => {
        onNextPage();
    };

    return (
        <div className="load-more-pagination">
            <button onClick={handleLoadMore} className='load-more-btn'>Load More</button>
        </div>
    );
};

export default LoadMore;