import {
  Router
} from "express";

import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom
} from "../controllers/room.controllers";

const router = Router();

router.post(
  "/",
  createRoom
);

router.get(
  "/",
  getRooms
);

router.get(
  "/:id",
  getRoomById
);

router.patch(
  "/:id",
  updateRoom
);

router.delete(
  "/:id",
  deleteRoom
);

export default router;