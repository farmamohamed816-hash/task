import {
  Router
} from "express";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser
} from "../controllers/user.controllers";

const router = Router();

router.post(
  "/",
  createUser
);

router.get(
  "/",
  getUsers
);

router.get(
  "/:id",
  getUserById
);

router.patch(
  "/:id",
  updateUser
);

router.delete(
  "/:id",
  deleteUser
);

export default router;