import {
  model,
  Schema
} from "mongoose";

export interface UserDocument {
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

const userSchema =
  new Schema<UserDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },

      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },

      phone: {
        type: String,
        required: true,
        trim: true
      },

      role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
      }
    },

    {
      timestamps: true
    }
  );

export const User =
  model<UserDocument>(
    "User",
    userSchema
  );