import React from 'react';
import '../../assets/style/Card.css';

// Anasayfanin saginda bulunan reklam karti komponenti
const Card = ({ imgSrc, title }) => {
    return (
        <div className="card" style={{ backgroundImage: `url(${imgSrc})` }}>
            <div className="card-content">
                <h3>{title}</h3>
            </div>
        </div>
    );
};

export default Card;