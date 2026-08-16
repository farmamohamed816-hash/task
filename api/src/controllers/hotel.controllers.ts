import type {
  Request,
  Response
} from "express";

import {
  Hotel
} from "../models/hotel.models";

// Create a new hotel
export async function createHotel(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const hotel =
      await Hotel.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: hotel
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create hotel"
    });

  }
}


export async function getHotels(
  _request: Request,
  response: Response
): Promise<void> {

  try {

    const hotels =
      await Hotel
        .find()
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: hotels.length,
      data: hotels
    });

  } catch (error) {

    response.status(500).json({
      success: false,
      message: "Could not load hotels"
    });

  }
}


export async function getHotelById(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const hotel =
      await Hotel.findById(
        request.params.id
      );

    if (!hotel) {

      response.status(404).json({
        success: false,
        message: "Hotel not found"
      });

      return;
    }

    response.json({
      success: true,
      data: hotel
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid hotel id"
    });

  }
}


export async function updateHotel(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const hotel =
      await Hotel.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!hotel) {

      response.status(404).json({
        success: false,
        message: "Hotel not found"
      });

      return;
    }

    response.json({
      success: true,
      data: hotel
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update hotel"
    });

  }
}


export async function deleteHotel(
  request: Request,
  response: Response
): Promise<void> {

  try {

    const hotel =
      await Hotel.findByIdAndDelete(
        request.params.id
      );

    if (!hotel) {

      response.status(404).json({
        success: false,
        message: "Hotel not found"
      });

      return;
    }

    response.json({
      success: true,
      message: "Hotel deleted"
    });

  } catch (error) {

    response.status(400).json({
      success: false,
      message: "Invalid hotel id"
    });

  }
}