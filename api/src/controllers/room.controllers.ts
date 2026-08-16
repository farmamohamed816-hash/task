import type {
  Request,
  Response
} from "express";

import {
  Room
} from "../models/room.models";

// Create a new room
export async function createRoom(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const room =
      await Room.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: room
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create room"
    });
  }
}

// Get all rooms
export async function getRooms(
  _request: Request,
  response: Response
): Promise<void> {
  try {
    const rooms =
      await Room
        .find()
        .populate("hotelId")
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Could not load rooms"
    });
  }
}

// Get a single room by id
export async function getRoomById(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const room =
      await Room
        .findById(
          request.params.id
        )
        .populate("hotelId");

    if (!room) {
      response.status(404).json({
        success: false,
        message: "Room not found"
      });
      return;
    }

    response.json({
      success: true,
      data: room
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Invalid room id"
    });
  }
}

// Update a room by id
export async function updateRoom(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const room =
      await Room.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!room) {
      response.status(404).json({
        success: false,
        message: "Room not found"
      });
      return;
    }

    response.json({
      success: true,
      data: room
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update room"
    });
  }
}

// Delete a room by id
export async function deleteRoom(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const room =
      await Room.findByIdAndDelete(
        request.params.id
      );

    if (!room) {
      response.status(404).json({
        success: false,
        message: "Room not found"
      });
      return;
    }

    response.json({
      success: true,
      message: "Room deleted"
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Invalid room id"
    });
  }
}