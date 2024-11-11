import { Review } from "../interfaces/destination.interface";

export type CreateDestinationDto = {
  name: string;
  description: string;
  mainImage: string;
  gallery: string[];
  budget: number;
  location: string;
  reviews?: Review[];
  totalReviews?: number;
  totalRatings?: number;
  averageRating?: number;
};

export type EditDestinationDto = {
  name?: string;
  description?: string;
  mainImage?: string;
  gallery?: string[];
  budget?: number;
  location?: string;
};
