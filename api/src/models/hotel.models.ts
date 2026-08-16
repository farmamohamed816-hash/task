import {
  model,
  Schema
} from "mongoose";

export interface HotelDocument {
  name: string;
  location: string;
  rating: number;
  description: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const hotelSchema =
  new Schema<HotelDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      location: {
        type: String,
        required: true,
        trim: true
      },

      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
        default: 0
      },

      description: {
        type: String,
        required: true,
        trim: true
      },

      isAvailable: {
        type: Boolean,
        default: true
      }
    },

    {
      timestamps: true
    }
  );

export const Hotel =
  model<HotelDocument>(
    "Hotel",
    hotelSchema
  );