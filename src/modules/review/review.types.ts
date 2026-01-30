export interface CreateReviewInput {
  mealId: string;
  rating: number;
  comment?: string;
}

export interface ReviewPublic {
  id: string;
  mealId: string;
  userId: string;
  userName: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
}
