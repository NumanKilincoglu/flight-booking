import Rental from '../assets/images/car.jpg'
import Hotel from '../assets/images/hotel.jpg'
import Travel from '../assets/images/travel.jpg';

const HistorySortOptions = [
    { value: 'farePrice', label: 'Lowest Price', order: 'ASC' },
    { value: 'farePrice', label: 'Highest Price', order: 'DESC' },
    { value: 'scheduleDate', label: 'Earliest Flight', order: 'ASC' },
    { value: 'scheduleDate', label: 'Latest Flight', order: 'DESC' },
    { value: 'flightName', label: 'Flight Name', order: 'ASC' },
    { value: 'airlineCode', label: 'Airline', order: 'ASC' },
];

const StopsOptions = [
    { value: 'nonstop', label: 'Nonstop' },
    { value: '1-stop', label: '1 Stop' },
    { value: '2-stops', label: '2 Stops' }
];

const FlightSortOptions = [
    { value: 'airlineCode', label: 'Airline' },
    { value: 'scheduleDate', label: 'Flight Date' },
    { value: 'scheduleTime', label: 'Flight Time' },
    { value: 'flightName', label: 'Flight Name' }
];

const FlightArrivalTimes = [
    { value: '05:00', label: '5:00 AM - 6:00 AM' },
    { value: '07:00', label: '7:00 AM - 8:00 AM' },
    { value: '12:00', label: '12:00 PM - 3:00 PM' },
    { value: '14:00', label: '02:00 PM - 4:00 PM' },
    { value: '16:00', label: '04:00 PM - 5:00 PM' },
    { value: '18:00', label: '06:00 PM - 7:00 PM' },
    { value: '20:00', label: '08:00 PM - 10:00 PM' }
];

const Cards = [
    { imgSrc: Rental, title: 'CAR RENTALS' },
    { imgSrc: Hotel, title: 'HOTELS' },
    { imgSrc: Travel, title: 'TRAVEL PACKAGES' },
];

export { HistorySortOptions, StopsOptions, FlightSortOptions, FlightArrivalTimes, Cards };