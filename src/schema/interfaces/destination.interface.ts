import { DefaultModel } from ".";
import { Admin } from "./admin.interface";

export interface Review extends DefaultModel {
  user: Admin;
  destination: Destination;
  comment: string;
  rating: number;
}

export interface Destination extends DefaultModel {
  name: string;
  description: string;
  mainImage: string;
  gallery: string[];
  budget: number;
  location: number;
  reviews: Review[];
  totalReviews: number;
  totalRatings: number;
  averageRating: number;
}
