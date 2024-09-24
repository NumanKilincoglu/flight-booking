import React, { useEffect, useState } from 'react';
import '../assets/style/FlightHistoryPage.css';
import FilterSection from '../components/flightHistory/Filters.jsx';
import LoadingScreen from '../components/shared/Loading';
import SortSection from '../components/flightHistory/SortSection.jsx';
import FlightHistoryCard from '../components/flightHistory/FightHistoryCard';
import FlightService from '../services/FlightService';
import { HistorySortOptions } from '../constants/constants.js'
import LoadMore from '../components/flightHistory/LoadMore';

/* Ucuslarim Sayfasi */

const FlightHistory = () => {
  const [newFlights, setFlights] = useState([]); // Yeni ucuslari saklar
  const [averageFare, setAverageFare] = useState(0); // Ortalama bilet fiyatini saklar
  const [reservationount, setReservationCount] = useState(0); // Toplam rezervasyon sayisini saklar
  const [loading, setLoading] = useState(true); // Yuklenme durumunu takip eder
  const [filters, setFilters] = useState({ sortBy: 'farePrice', order: 'ASC', page: 1, limit: 5 }); // Filtreleme ve siralama seceneklerini saklar

  useEffect(() => {
    // Ucus rezervasyonlarini getirir
    const getFlightBookings = async () => {
      try {
        setLoading(true);
        const flightData = await FlightService.getFlights({
          params: {
            sortBy: filters.sortBy, order: filters.order, page: filters.page, limit: filters.limit
          }
        });

        // Eger sayfa 1 ise yeni ucuslari set eder, degilse onceki ucuslara yenilerini ekler
        if (filters.page === 1) {
          setFlights(flightData?.flights || []);
        } else {
          setFlights((prevFlights) => [...prevFlights, ...flightData?.flights || []]);
        }

        // Toplam rezervasyon sayısını gunceller
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
    // Ortalama bilet fiyatını getirir
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

  // Sorting islemi
  const handleSort = (sort) => {
    setFilters({ order: sort.order, sortBy: sort.value, page: 1, limit: 5 })
  };

  // Sayfalama mantigi
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