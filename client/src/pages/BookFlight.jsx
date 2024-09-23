import { useEffect, useState, useCallback } from 'react';
import '../assets/style/BookFlightPage.css';
import Card from '../components/booking/Card';
import LoadingScreen from '../components/shared/Loading';
import SearchFlight from '../components/booking/SearchFlight.jsx';
import FlightRecord from '../components/booking/FlightRecord.jsx';
import FlightFilters from '../components/booking/FlightFilters';

import LoadMore from '../components/flightHistory/LoadMore';
import FlightService from '../services/FlightService';
import { StopsOptions, FlightSortOptions, FlightArrivalTimes, Cards } from '../constants/constants.js'

const BookFlight = () => {
    const [newFlights, setFlights] = useState([]);
    const [airLines, setAirLines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        from: '',
        to: '',
        depart: '',
        arrival: '',
        airlineCode: '',
        flightTime: null,
        sortBy: 'scheduleTime',
        page: 0
    });

    const getAllFligths = useCallback(async () => {
        try {
            setLoading(true);
            const flightData = await FlightService.searchFlights({
                params: {
                    from: filters.from,
                    to: filters.to,
                    depart: filters.depart,
                    arrival: filters.arrival,
                    airlineCode: filters.airlineCode,
                    sortBy: filters.sortBy,
                    page: filters.page,
                    flightTime: filters.flightTime
                }
            });
            if (filters.page === 0) {
                setFlights(flightData);
            } else {
                setFlights((prevFlights) => [...prevFlights, ...flightData]);
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        if (filters) {
            getAllFligths();
        }
    }, [filters, getAllFligths]);

    useEffect(() => {
        const fetchAirlines = async () => {
            try {

                const airlineData = await FlightService.getAirlines({
                    page: page,
                    limit: 10,
                });
                setAirLines((prev) => [...prev, ...airlineData]);
            } catch (error) {
                console.error('Error fetching airlines:', error);
            }
        };

        fetchAirlines();
    }, [page]);

    const handleShowFlights = async (filter) => {
        setFilters(filter);
        getAllFligths();
    };

    const handleLoadMoreAirlines = () => {
        setPage((prev) => prev + 1);
    };

    const handleAirlineSelect = (airlineCode) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            airlineCode: airlineCode
        }));
    };

    const handleSort = (sortCode) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: sortCode
        }));
    };

    const handleFlightTime = (time) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            flightTime: time
        }));
    };

    const nextPage = () => {
        const previousPage = filters.page;
        setFilters({ page: previousPage + 1 })
    };

    return (
        <div className="book-flight-page">
            <div className="left-section">
                <SearchFlight onSearch={handleShowFlights} />
                <div className='flights-wrap'>
                    {loading && <LoadingScreen />}

                    <div className='flight-list-wrap'>
                        {!loading && newFlights.length > 0 && (
                            <>
                                {newFlights.map((flight, index) => (
                                    <FlightRecord key={index} flight={flight} />
                                ))}
                                <LoadMore onNextPage={nextPage} />
                            </>
                        )}

                        {!loading && newFlights.length === 0 && (
                            <div className="empty">No flights available</div>
                        )}
                    </div>

                    <FlightFilters
                        sortOptions={FlightSortOptions}
                        arrivalTimes={FlightArrivalTimes}
                        stopsOptions={StopsOptions}
                        airlines={airLines}
                        airlineLoadMore={handleLoadMoreAirlines}
                        onAirlineSelect={handleAirlineSelect}
                        onSortSelect={handleSort}
                        onTimeSelect={handleFlightTime}
                    />
                </div>

            </div>
            <div className="right-section">
                {Cards.map((card, index) => (
                    <Card key={index} imgSrc={card.imgSrc} title={card.title} />
                ))}
            </div>
        </div>
    );
};

export default BookFlight;