import api from './api';
import { PurchaseRequest, PurchaseResponse } from '@/types/transaction';

class TransactionService {
  // Realizar compra de producto
  async purchaseProduct(userId: number, productId: number): Promise<PurchaseResponse> {
    try {
      const purchaseData: PurchaseRequest = {
        userId,
        productId,
      };

      const response = await api.post('/transactions/purchase', purchaseData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al realizar la compra');
    }
  }
}

export default new TransactionService(); 