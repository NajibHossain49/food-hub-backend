export interface ProviderProfileInput {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
}

export interface MealInput {
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  categoryId: string;
}