export interface ProviderProfileInput {
  name: string;
  description?: string;
  address?: string;
  phone?: string;
}

export interface MealInput {
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
}
