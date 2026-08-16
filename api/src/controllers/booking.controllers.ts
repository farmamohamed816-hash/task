import type {
  Request,
  Response
} from "express";

import {
  Booking
} from "../models/booking.models";

// Create a new booking
export async function createBooking(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const booking =
      await Booking.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create booking"
    });
  }
}

// Get all bookings
export async function getBookings(
  _request: Request,
  response: Response
): Promise<void> {
  try {
    const bookings =
      await Booking
        .find()
        .populate("hotelId")
        .populate("roomId")
        .populate("userId")
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Could not load bookings"
    });
  }
}

// Get booking by id
export async function getBookingById(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const booking =
      await Booking
        .findById(
          request.params.id
        )
        .populate("hotelId")
        .populate("roomId")
        .populate("userId");

    if (!booking) {
      response.status(404).json({
        success: false,
        message: "Booking not found"
      });
      return;
    }

    response.json({
      success: true,
      data: booking
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Invalid booking id"
    });
  }
}

// Update booking
export async function updateBooking(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const booking =
      await Booking.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!booking) {
      response.status(404).json({
        success: false,
        message: "Booking not found"
      });
      return;
    }

    response.json({
      success: true,
      data: booking
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update booking"
    });
  }
}

// Delete booking
export async function deleteBooking(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const booking =
      await Booking.findByIdAndDelete(
        request.params.id
      );

    if (!booking) {
      response.status(404).json({
        success: false,
        message: "Booking not found"
      });
      return;
    }

    response.json({
      success: true,
      message: "Booking deleted"
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Invalid booking id"
    });
  }
}