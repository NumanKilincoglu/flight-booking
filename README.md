# Flight Booking Application

This project is a flight booking application that utilizes the Schiphol Airport API V4. It allows users to search for flights based on various filters and provides flight booking features.

**Project is Live On the Following URL**: (https://flight-booking-rqbo.onrender.com)

## Project Screenshots
- #### Searching flights with advanced filters.


![Search Flights](https://i.imgur.com/lhZcRv6.jpeg)


- #### Flight details.


![Search Flights](https://i.imgur.com/5AMBtUs.jpeg)


- #### Booking the selected flight.

  
![Booking Flight](https://i.imgur.com/1WH9dIY.jpeg)


- #### Flight history of the user.


![Flight History](https://i.imgur.com/HjlS4zi.jpeg)

## Features

- **Flight Search**: Search for flights using multiple filters, including departure and arrival locations, dates, airlines, and more.
- **Flight Booking**: Users can book flights directly through the application.
- **Flight History**: Users can view their bookings and filter the booking history.
- **Responsive Design**: The application is designed to be mobile-friendly.

## Technologies

-   **React.js**
-   **HTML-CSS**
-   **Node.js**
-   **Express.js**
-   **MongoDB**


## Project Structure

- **client/**: The front-end of the flight booking application built with React, HTML, and CSS.
- **server/**: The back-end application that manages flight information and reservation processes using Node.js and Express.js.

## Installation

### Server Installation

1. Navigate to the `server` directory:
   ```bash
    cd server
    ```
2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Fill required fields in the `.env` file:
    ```bash
    APP_ID=your_app_id
    KEY=your_app_key
    MONGO_URL=your_mongo_connection_url
    ```
    
4. Start the server:
     ```bash
    node index.js
    ```

### Client Installation
1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```
3. Start the application:
   ```bash
    npm start
    ```

   
