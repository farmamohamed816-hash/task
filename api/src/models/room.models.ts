import {
  model,
  Schema,
  Types
} from "mongoose";

export interface RoomDocument {
  hotelId: Types.ObjectId;
  roomNumber: string;
  type: string;
  priceNight: number;
  maxCapacity: number;
  isBooked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema =
  new Schema<RoomDocument>(
    {
      hotelId: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
      },

      roomNumber: {
        type: String,
        required: true,
        trim: true
      },

      type: {
        type: String,
        required: true,
        trim: true
      },

      priceNight: {
        type: Number,
        required: true,
        min: 0
      },

      maxCapacity: {
        type: Number,
        required: true,
        min: 1
      },

      isBooked: {
        type: Boolean,
        default: false
      }
    },

    {
      timestamps: true
    }
  );

export const Room =
  model<RoomDocument>(
    "Room",
    roomSchema
  );