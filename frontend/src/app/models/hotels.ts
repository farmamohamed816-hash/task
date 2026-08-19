export type HotelStarRating = 1 | 2 | 3 | 4 | 5;

export interface Hotels {
  _id: string;
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  rating: HotelStarRating;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateHotelsInput {
  name: string;
  description: string;
  location: string;
  pricePerNight: number;
  rating: HotelStarRating;
  active: boolean;
}

export type UpdateHotelsInput = Partial<CreateHotelsInput>;