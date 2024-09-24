import fs from 'fs';
import axios from 'axios';
import dotenv from 'dotenv';
import { sleep } from '../utils/util.js';
dotenv.config();

// Arama sorgusuna göre destinasyonlari almak icin fonksiyon
export const getDestinations = async (req, res) => {
    try {

        const search = req.query.search?.toLowerCase();

        if (!search) {
            return res.status(400).json({ success: false, error: 'Arama sorgusu gereklidir.' });
        }

        if (!fs.existsSync('all_destinations.json')) {
            return res.status(404).json({ success: false, error: 'Destinasyon verisi bulunamadı.' });
        }

        const fileData = fs.readFileSync('all_destinations.json', 'utf-8');
        const parsed = JSON.parse(fileData);

        // Arama sorgusuna göre destinasyonlari filtrele
        const filteredDestinations = parsed.filter(destination => {
            const city = destination?.city?.toLowerCase() || '';
            const country = destination?.country?.toLowerCase() || '';
            return city.includes(search) || country.includes(search);
        });

        return res.status(200).json({
            success: true,
            destinations: filteredDestinations.slice(0, 10)
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: "Destinasyon bulunamadı.", details: err });
    }
}

// Havayollarini almak icin fonksiyon
export const getAirlines = async (req, res) => {

    try {

        const { page = 1, limit = 10 } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);

        if (!fs.existsSync('airlines.json')) {
            return res.status(404).send({ success: false, error: "Havayolları dosyası bulunamadı." });
        }

        const fileData = fs.readFileSync('airlines.json', 'utf-8');
        const parsed = JSON.parse(fileData);

        // Gecerli havayollarini filtrele
        const validAirlines = parsed.filter(airline => airline.iata && airline.publicName);
        const sortedAirlines = validAirlines.sort((a, b) => a.publicName.localeCompare(b.publicName));

        const startIndex = (parsedPage - 1) * parsedLimit;
        const paginatedAirlines = sortedAirlines.slice(startIndex, startIndex + parsedLimit);

        const paginatedAirlinesWithPrice = paginatedAirlines.map(airline => ({
            ...airline,
            price: Math.floor(Math.random() * (230 - 100 + 1)) + 100
        }));

        if (paginatedAirlines.length === 0) {
            return res.status(200).send({
                success: true,
                airlines: [],
                message: "Geçerli sayfa için havayolu bulunamadı."
            });
        }

        return res.status(200).send({
            success: true,
            airlines: paginatedAirlinesWithPrice,
            currentPage: parsedPage,
            totalPages: Math.ceil(validAirlines.length / parsedLimit),
            totalAirlines: validAirlines.length
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, error: "Havayolları alınırken hata oluştu.", details: err });
    }
}

// Tüm ucuslari almak icin fonksiyon
export const getAllFlights = async (req, res) => {
    try {

        const { from, to, depart, arrival, flightTime, airlineCode, sortBy, page } = req.query;

        let baseURL = 'https://api.schiphol.nl/public-flights/flights';

        const params = {
            flightDirection: 'D',
            includedelays: false,
            page: page,
        };

        // Parametreleri kontrol et ve ekle
        if (to) params.route = to;
        if (sortBy) params.sort = `-${sortBy}`;
        if (depart) params.fromScheduleDate = depart;
        if (arrival) params.toScheduleDate = arrival;
        if (flightTime) params.scheduleTime = flightTime;
        if (airlineCode) params.airline = airlineCode;
        
        const response = await axios.get(baseURL, {
            headers: {
                'Accept': 'application/json',
                'app_id': process.env.APP_ID,
                'app_key': process.env.KEY,
                'ResourceVersion': process.env.RESOURCE_VERSION
            },
            params: params
        });

        const flights = response?.data?.flights || [];

        if (flights.length === 0) {
            return res.status(200).send({ success: true, flights: [] });
        }

        // Paket ve yolculuk türü isimleri
        const packageNames = ['Light', 'Flex', 'Comfort', 'Plus', 'Premium+'];
        const tripTypes = ['One Way', 'Round Trip'];

        let destinations = [];

        // Tüm destinasyon verilerini dosyadan oku
        if (fs.existsSync('all_destinations.json')) {
            const fileData = fs.readFileSync('all_destinations.json', 'utf-8');
            destinations = JSON.parse(fileData);
        }

        // Yeni ucuslari olustur
        const newFlights = response.data.flights.map(flight => {
            const farePrice = Math.floor(Math.random() * 201) + 100;

            // Rastgele paket ve yolculuk türü sec
            const randomPackageIndex = Math.floor(Math.random() * packageNames.length);
            const selectedPackage = {
                packageName: packageNames[randomPackageIndex],
                price: farePrice
            };

            const randomTripTypeIndex = Math.floor(Math.random() * tripTypes.length);
            const selectedTripType = tripTypes[randomTripTypeIndex];

            const flightDestination = flight?.route?.destinations[0];
            let destinationCity = '';

            if (destinations.length > 0 && flightDestination) {
                const destination = destinations.find(a => flightDestination === a.iata);
                destinationCity = destination ? destination.city : '';
            }

            return {
                ...flight,
                farePrice,
                departureCode: params.flightDirection == 'D' ? 'AMS' : to,
                tripType: selectedTripType,
                farePackage: [selectedPackage],
                destinationCity: destinationCity,
                departureCity: params.flightDirection == 'D' ? 'Amsterdam' : destinationCity
            };
        });

        res.status(201).send({ success: true, flights: newFlights });
    } catch (err) {
        console.log(err.response.data.status);
        res.status(400).json({ success: false, error: "Uçuş bulunamadı.", details: err?.details?.message });
    }
}

// Tüm destinasyonlari almak icin fonksiyon
const fetchAllDestinations = async () => {
    let page = 480

    const allDestinations = [];

    try {
        while (page > 0) {

            const url = `https://api.schiphol.nl/public-flights/destinations?page=${page}`;
            const response = await axios.get(url, {
                headers: {
                    'Accept': 'application/json',
                    'app_id': process.env.APP_ID,
                    'app_key': process.env.KEY,
                    'ResourceVersion': process.env.RESOURCE_VERSION
                }
            });

            if (!response?.data?.destinations || response.data.destinations.length === 0) {
                break;
            }

            allDestinations.push(...response.data.destinations);

            page--;
            await sleep(1000);
        }

        fs.writeFileSync('all_destinations.json', JSON.stringify(allDestinations, null, 2), 'utf-8');

        console.log('Tüm destinasyonlar basariyla alindi ve kaydedildi.');
    } catch (error) {
        console.error('Destinasyonlari alirken hata olustu:', error);
    }
};
