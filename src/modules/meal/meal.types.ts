export interface MealFilter {
  category?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  search?: string | undefined;
}

export interface MealPublic {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  category?: string | null;
  providerId: string;
  providerName: string;
  createdAt: string;
  updatedAt: string;
}
