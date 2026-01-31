export interface FeaturedMeal {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  category?: string | null;
  providerName: string;
}

export interface ProviderSummary {
  id: string;
  name: string;
  totalMeals: number;
}

export interface HomeStats {
  totalMeals: number;
  totalProviders: number;
  totalUsers: number;
  totalReviews: number;
}
