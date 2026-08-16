import {
  model,
  Schema,
  Types
} from "mongoose";

export interface BookingDocument {
  hotelId: Types.ObjectId;
  roomId: Types.ObjectId;
  userId: Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema =
  new Schema<BookingDocument>(
    {
      hotelId: {
        type: Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
      },

      roomId: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true
      },

      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      checkInDate: {
        type: Date,
        required: true
      },

      checkOutDate: {
        type: Date,
        required: true
      },

      totalPrice: {
        type: Number,
        required: true,
        min: 0
      },

      status: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "cancelled"
        ],
        default: "pending"
      }
    },

    {
      timestamps: true
    }
  );

export const Booking =
  model<BookingDocument>(
    "Booking",
    bookingSchema
  );