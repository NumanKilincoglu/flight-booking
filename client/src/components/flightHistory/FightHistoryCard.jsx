import { React, useState } from 'react';
import '../../assets/style/FlightHistoryCard.css';
import { calculateDuration, formatDateGeneral } from '../../utils/util.js';

const FlightHistoryCard = ({ flight }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const {
        flightName,
        tripType,
        flightNumber,
        scheduleDateTime,
        actualOffBlockTime,
        expectedTimeGateOpen,
        airlineName,
        expectedTimeGateClosing,
        expectedTimeBoarding,
        estimatedLandingTime,
        actualLandingTime,
        prefixIATA,
        aircraftRegistration,
        departureCode,
        route: { destinations },
        aircraftType,
    } = flight;

    /* Ilgili bilgiler kullaniciya gosterilmek uzere duzenlenir */

    const [arrivalCode] = destinations;

    const flightDuration = calculateDuration(estimatedLandingTime || estimatedLandingTime || actualLandingTime || expectedTimeBoarding || actualOffBlockTime, scheduleDateTime);

    const departureTime = scheduleDateTime || actualOffBlockTime || expectedTimeGateClosing
        ? new Date(scheduleDateTime || actualOffBlockTime || expectedTimeGateClosing).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'To be announced';

    const arrivalTime = estimatedLandingTime || actualLandingTime
        ? new Date(estimatedLandingTime || actualLandingTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : 'TBA';

    const boardingTime = expectedTimeBoarding
        ? new Date(expectedTimeBoarding).toLocaleTimeString()
        : 'TBA';

    const gateOpens = expectedTimeGateOpen
        ? new Date(expectedTimeGateOpen).toLocaleTimeString()
        : 'TBA';

    const landingTime = estimatedLandingTime || actualLandingTime
        ? new Date(estimatedLandingTime || actualLandingTime).toLocaleTimeString()
        : 'TBA';

    const operatingTime = formatDateGeneral(scheduleDateTime);

    const totalSlots = 5;
    const filledPackages = flight.farePackage?.length || 0;
    const emptySlots = totalSlots - filledPackages;

    const emptyPackages = Array(emptySlots).fill({ packageName: '', price: '' });
    const allPackages = [...flight.farePackage || [], ...emptyPackages];

    const toggleDetails = () => {
        setDetailsVisible(!detailsVisible);
    };

    return (
        <div className="flight-history-card">
            <div className='history-card-content'>
                <div className="history-left-section">
                    <div className='airline-detail'>
                        <div className='logo-wrap'>
                            <img src={`https://pics.avs.io/200/50/${prefixIATA}.png`} alt={prefixIATA} className="airline-logo" />
                        </div>
                        <div className="airline-info">
                            <div className='time-info'>
                                <p>{departureTime}</p>
                                <p>&nbsp;-&nbsp;</p>
                                <p>{arrivalTime}</p>
                            </div>
                            <div>
                                <div className="airline-sub-info">
                                    <div className="gray-bold">{airlineName || prefixIATA}</div>
                                    <button onClick={toggleDetails} className="flight-details-btn">Flight Details
                                        <span className='dropdown-arrow'></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="middle-section">
                    <div className="stop-info">
                        <div className="gray-bold">{destinations?.length + ' Stop' || 'nonstop'}</div>
                        <div className="gray-light-bold">{flightDuration}</div>
                    </div>
                    <div className="location-info">
                        <div className="airport-codes">
                            <span className='gray-bold'>{departureCode}</span>
                            <span className='gray-bold'>&nbsp;to&nbsp;</span>
                            <span className='gray-bold'>{arrivalCode}</span>
                        </div>
                        <div className="gray-light-bold">{flightName}</div>
                    </div>
                </div>

                <div className="history-right-section">
                    {allPackages.map((pkg, index) => (
                        <div key={index} className={`flight-package ${pkg.packageName ? '' : 'package-empty'}`}>
                            {pkg.packageName ? (
                                <>
                                    <div className="price">${pkg.price}</div>
                                    <div className="package-name">{pkg.packageName}</div>
                                </>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>

            {detailsVisible && (
                <div className="flight-details-section">
                    <div className='flight-details'>
                        <h5 className='bold-text'>Boarding</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Boarding Time: </strong> {boardingTime}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Gate Opens: </strong> {gateOpens}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Scheduled: </strong> {operatingTime}</p>
                        <p className='gray bold-text'>
                            <strong className='gray-light-bold'>Landing: </strong>
                            {landingTime}
                        </p>
                    </div>
                    <div className='flight-details'>
                        <h5 className='bold-text'>Aircraft</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Registration: </strong> {aircraftRegistration}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Type: </strong> {aircraftType?.iataMain}</p>
                    </div>
                    <div className='flight-details'>
                        <h5 className='bold-text'>Flight</h5>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Number: </strong> {flightNumber}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Name: </strong> {flightName}</p>
                        <p className='gray bold-text'><strong className='gray-light-bold'>Type: </strong> {tripType}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlightHistoryCard;
