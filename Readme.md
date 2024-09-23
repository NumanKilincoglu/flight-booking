# Flight Booking Application

This project is a flight booking application that utilizes the Schiphol Airport API V4. It offers users the ability to search for flights based on various filters and provides flight booking features.

**Project is Live On Following URL**: (https://flight-booking-rqbo.onrender.com)

## Features

- **Flight Search**: Search for flights using multiple filters, including departure and arrival locations, dates, airlines, and more.
- **Flight Booking**: Users can book flights directly through the application.
- **Booking History**: Users able to view their bookings and filter the booking history.
- **Responsive Design**: The application is designed to be mobile-friendly.

## Technologies

-   **React.js**
-   **HTML-CSS**
-   **Node.js**
-   **Express.js**
-   **MongoDB**


## Project Structure

- **client/**: The front-end of the flight booking application built with React, HTML, CSS.
- **server/**: The back-end application that manages flight information and reservation processes using Node.js and Express.js.

## Installation

### Server Installation

1. Navigate to the `server` directory:

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
