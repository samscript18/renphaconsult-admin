export type AddReviewDto = {
  rating: number;
  comment: string;
};

export type UpdateReviewDto = Partial<AddReviewDto>;
