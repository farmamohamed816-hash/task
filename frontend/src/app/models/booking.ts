export type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "Completed";

export interface Booking {
  _id: string;
  hotelId: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status: BookingStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBookingInput {
  hotelId: string;
  customerName: string;
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  status?: BookingStatus;
}

export type UpdateBookingInput = Partial<CreateBookingInput>;