import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../../assets/style/SearchFlight.css';
import Plane from '../../assets/images/plane.png';
import FlightService from '../../services/FlightService';
import Departure from '../../assets/images/departures.png';
import Arrival from '../../assets/images/arrivals.png';

const SearchFlight = ({ onSearch }) => {
  const [filter, setFilter] = useState({
    from: 'AMS', // Kalkis noktasi (varsayilan olarak 'AMS')
    to: '', // Varis noktasi
    depart: '', // Kalkis tarihi
    arrival: '', // Varis tarihi
    iataCode: '', // IATA kodu
    page: 0 // Sayfa numarasi
  });

  const [destinations, setDestinations] = useState([]); // Varis noktasi onerilerini saklar
  const [showToDropdown, setShowToDropdown] = useState(false); // Varis noktasi dropdown'u toggle
  const previousToValue = useRef(filter.to); // Onceki 'to' degerini saklamak icin ref

  // 'to' degeri degistiginde varis noktasi onerilerini getiren hook
  useEffect(() => {
    const fetchDestinations = debounce(async () => {
      if (filter.to && filter.to !== previousToValue.current) {
        try {
          const data = await FlightService.getDestinations({ search: filter.to });
          setDestinations(data);
          setShowToDropdown(data.length > 0);
        } catch (error) {
          console.error('Error fetching to destinations:', error);
        }
      }
    }, 800);

    fetchDestinations();

    return () => {
      clearTimeout(fetchDestinations);
    };
  }, [filter.to]);

  useEffect(() => {
    previousToValue.current = filter.to;
  }, [filter.to]);

  const resetSearch = useCallback(() => {
    setDestinations([]);
    setShowToDropdown(false);
  }, []);

  // Secilen varis noktasini isleyen fonksiyon
  const handleDestination = (selectedDestination, event) => {
    if (filter.to !== selectedDestination.iata) {
      setFilter(prev => ({ ...prev, to: selectedDestination.iata, iataCode: selectedDestination.iata }));
      setShowToDropdown(false);
      resetSearch();
    }
  };

  // Debounce fonksiyonu (fazla request atilmasini engeller)
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleShowFlights = () => {
    onSearch(filter);
    resetSearch();
  };

  return (
    <div className="book-your-flights">
      <div className='search-top'>
        <div className='title'>
          <img alt="airplane" className='flight-icon' src={Plane}></img>
          <h2>BOOK YOUR FLIGHT</h2>
        </div>
        <div className='trip-type'>
          <button className='left'>Round Trip</button>
          <button className='right'>One Way</button>
        </div>
      </div>
      <div className='search-wrap'>
        <div className='location-wrap'>
          <div className='w100'>
            <label>From</label>
            <div className='input-container left-radius'>
              <img alt='arrival' src={Departure} />
              <input
                className='left-radius'
                type="text"
                value={'AMS'}
                onChange={(e) => setFilter(prev => ({ ...prev, from: e.target.value }))}
                disabled
              />
            </div>
          </div>
          <div className='w100'>
            <label>To</label>
            <div className="input-container right-radius">
              <img alt='arrival' src={Arrival} />
              <input
                className="right-radius"
                type="text"
                value={filter.to}
                onChange={(e) => setFilter(prev => ({ ...prev, to: e.target.value }))}
              />
            </div>
            {showToDropdown && (
              <ul className="dropdown-menu">
                {destinations.map((dest, index) => (
                  <li
                    key={index}
                    onClick={(e) => handleDestination(dest, e)}
                    className="dropdown-item"
                  ><p> {`${dest?.publicName?.english} (${dest?.iata || ''})`}</p>
                    <p className='country'>
                      {dest?.city ? `${dest.city}, ${dest.country}` : `${dest?.country || ''}`}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className='date-wrap'>
          <div className='w100'>
            <label>Depart</label>
            <div className='input-container left-radius'>
              <input
                type="date"
                value={filter.depart}
                onChange={(e) => setFilter(prev => ({ ...prev, depart: e.target.value }))}
              />
            </div>
          </div>
          <div className='w100'>
            <label>Return</label>
            <div className='input-container right-radius'>
              <input
                type="date"
                value={filter.arrival}
                onChange={(e) => setFilter(prev => ({ ...prev, arrival: e.target.value }))}
              />
            </div>
          </div>
        </div>
      </div>

      <button className='show-flight' onClick={handleShowFlights}>Show Flights</button>
    </div>
  );
};

export default SearchFlight;
