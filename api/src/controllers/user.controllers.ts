import type {
  Request,
  Response
} from "express";

import {
  User
} from "../models/user.models";

// Create a new user
export async function createUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const user =
      await User.create(
        request.body
      );

    response.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not create user"
    });
  }
}


export async function getUsers(
  _request: Request,
  response: Response
): Promise<void> {
  try {
    const users =
      await User
        .find()
        .sort({
          createdAt: -1
        });

    response.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Could not load users"
    });
  }
}


export async function getUserById(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const user =
      await User.findById(
        request.params.id
      );

    if (!user) {
      response.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    response.json({
      success: true,
      data: user
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Invalid user id"
    });
  }
}


export async function updateUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const user =
      await User.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!user) {
      response.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    response.json({
      success: true,
      data: user
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Could not update user"
    });
  }
}


export async function deleteUser(
  request: Request,
  response: Response
): Promise<void> {
  try {
    const user =
      await User.findByIdAndDelete(
        request.params.id
      );

    if (!user) {
      response.status(404).json({
        success: false,
        message: "User not found"
      });
      return;
    }

    response.json({
      success: true,
      message: "User deleted"
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      message: "Invalid user id"
    });
  }
}