export interface CreateOrderItemInput {
  mealId: string;
  quantity: number;
}

export interface CreateOrderInput {
  items: CreateOrderItemInput[];
  deliveryAddress: string;
  paymentMethod?: string;
}

export interface OrderPublic {
  id: string;
  providerId: string;
  providerName: string;
  status: string;
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  items: {
    mealId: string;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
  }[];
}
