import express from "express";
import cors from "cors";

import hotelRouter 
  from "./routes/hotel.routes";
import bookingRouter 
  from "./routes/booking.routes";

const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:4200"
}));

app.get(
  "/api/health",
  (_request, response) => {
    response.json({
      success: true,
      message: "API is running"
    });
  }
);

app.use(
  "/api/hotels",
  hotelRouter
);

app.use(
  "/api/bookings",
  bookingRouter
);

export default app;



