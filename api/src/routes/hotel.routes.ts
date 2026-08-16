import {
  Router
} from "express";

import {
  createHotel,
  deleteHotel,
  getHotelById,
  getHotels,
  updateHotel
} from "../controllers/hotel.controllers";

const router = Router();

router.post(
  "/",
  createHotel
);

router.get(
  "/",
  getHotels
);

router.get(
  "/:id",
  getHotelById
);

router.patch(
  "/:id",
  updateHotel
);

router.delete(
  "/:id",
  deleteHotel
);

export default router;