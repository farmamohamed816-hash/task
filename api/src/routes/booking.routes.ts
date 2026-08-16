import {
  Router
} from "express";

import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookings,
  updateBooking
} from "../controllers/booking.controllers";

const router = Router();

router.post(
  "/",
  createBooking
);

router.get(
  "/",
  getBookings
);

router.get(
  "/:id",
  getBookingById
);

router.patch(
  "/:id",
  updateBooking
);

router.delete(
  "/:id",
  deleteBooking
);

export default router;