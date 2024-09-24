import Reservation from '../models/ReservationModel.js';
import fs from 'fs';

// Ucus rezervasyonu olusturur
export const bookFlight = async (req, res) => {
    try {
        // Eger istek body'si bos ise hata dondur
        if (!req.body)
            return res.status(400).send({ success: false, error: 'Body is empty.' });

        // Eger ucus zamani gecmiste ise hata dondur
        if (new Date(req?.body?.scheduleDateTime) < new Date())
            return res.status(400).send({ success: false, error: 'Cannot book a flight that has already departed.' });

        const newReservation = new Reservation(req.body);
        const savedReservation = await newReservation.save();

        return res.status(201).send({ success: true, result: savedReservation });
    } catch (err) {
        console.log(err.message);
        return res
            .status(400)
            .send({
                success: false,
                error: 'Already booked the flight. Plase, check the My Flights page.', // Hata mesaji
                id: req.body.id
            });
    }
};

// Tum ucuslari getiren fonksiyon
export const getAllFlights = async (req, res) => {

    try {

        const {
            sortBy = 'scheduleDate',
            page = 1,
            limit = 10,
            order = 'DESC'
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        const sortObject = {};
        sortObject[sortBy] = order.toLowerCase();

        let flights = await Reservation
            .find({})
            .sort(sortObject)
            .skip(skip)
            .limit(limitNum)
            .lean();

        // Toplam rezervasyon sayisini al
        const totalReservations = await Reservation.countDocuments();

        if (!flights || flights.length === 0) {
            return res.status(400).json({
                success: false,
                error: "Flight not found.",
                totalReservations: totalReservations
            });
        }

        // Eger airlines.json dosyasi varsa, ucuslara havayolu adlarini ekle
        if (fs.existsSync('airlines.json')) {
            const fileData = fs.readFileSync('airlines.json', 'utf-8');
            const airlines = JSON.parse(fileData);

            flights.forEach(flight => {
                const airline = airlines.find(a => flight.prefixIATA === a.iata);
                flight.airlineName = airline ? airline.publicName : 'Unknown';
            });
        }

        return res.status(200).json({
            success: true,
            flights,
            totalPages: Math.ceil(totalReservations / limitNum),
            currentPage: pageNum,
            totalReservations: totalReservations
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            error: "Flight not found.",
            details: err.message
        });
    }
};

// Ortalama ucus fiyatini hesaplar
export const getAverageFarePrice = async (req, res) => {

    try {

        const flights = await Reservation.aggregate([
            {
                $group: {
                    _id: null,
                    averageFarePrice: { $avg: "$farePrice" }
                }
            }
        ]);

        const averageFarePrice = flights.length > 0 ? flights[0].averageFarePrice : 0;

        return res.status(200).json({
            success: true,
            averageFarePrice: averageFarePrice.toFixed(1)
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            error: "Unable to calculate average fare price.",
            averageFarePrice: 0
        });
    }
};
