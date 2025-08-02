export interface PurchaseRequest {
  userId: number;
  productId: number;
}

export interface Transaction {
  id: number;
  userId: number;
  productId: number;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
  product?: {
    id: number;
    name: string;
    price: number;
  };
}

export interface PurchaseResponse {
  success: boolean;
  message: string;
  transaction?: Transaction;
} 