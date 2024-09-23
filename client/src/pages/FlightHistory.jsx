import React, { useEffect, useState } from 'react';
import '../assets/style/FlightHistoryPage.css';
import FilterSection from '../components/flightHistory/Filters.jsx';
import LoadingScreen from '../components/shared/Loading';
import SortSection from '../components/flightHistory/SortSection.jsx';
import FlightHistoryCard from '../components/flightHistory/FightHistoryCard';
import FlightService from '../services/FlightService';
import { HistorySortOptions } from '../constants/constants.js'
import LoadMore from '../components/flightHistory/LoadMore';

const FlightHistory = () => {
  const [newFlights, setFlights] = useState([]);
  const [averageFare, setAverageFare] = useState(0);
  const [reservationount, setReservationCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ sortBy: 'farePrice', order: 'ASC', page: 1, limit: 5 });

  useEffect(() => {
    const getFlightBookings = async () => {
      try {
        setLoading(true);
        const flightData = await FlightService.getFlights({
          params: {
            sortBy: filters.sortBy, order: filters.order, page: filters.page, limit: filters.limit
          }
        });

        if (filters.page === 1) {
          setFlights(flightData?.flights || []);
        } else {
          setFlights((prevFlights) => [...prevFlights, ...flightData?.flights || []]);
        }

        setReservationCount(flightData?.totalReservations || 0);

      } catch (error) {
        console.error('Error fetching flights:', error);
        setFlights([]);
      }
      finally {
        setLoading(false);
      }
    };
    getFlightBookings();
  }, [filters]);

  useEffect(() => {
    const getAveragePrice = async () => {
      try {
        const price = await FlightService.getAverageFarePrice();
        setAverageFare(price);
      } catch (error) {
        console.error('Error fetching fare price:', error);
        setAverageFare(0);
      }
    };
    getAveragePrice();
  }, [filters]);

  const handleSort = (sort) => {
    setFilters({ order: sort.order, sortBy: sort.value, page: 1, limit: 5 })
  };

  const nextPage = () => {
    const previousPage = filters.page;
    setFilters({ page: previousPage + 1 })
  };

  return (
    <div className="flight-history-page">
      <FilterSection />
      <div className='main-wrap'>
        <SortSection avgFare={averageFare} totalReservations={reservationount} sortOptions={HistorySortOptions} onSortSelect={handleSort} />
        <div className="history-list">
          {loading && <LoadingScreen />}
          {!loading && newFlights.length > 0 &&
            newFlights.map((flight, index) => (
              <FlightHistoryCard key={index} flight={flight} />
            ))
          }
          {!loading && newFlights.length === 0 && (
            <div className="empty">
              <p className="empty-message">No flight history available.</p>
            </div>
          )}
        </div>
        {!loading && <LoadMore onNextPage={nextPage} />}
      </div>
    </div>
  )
}

export default FlightHistory