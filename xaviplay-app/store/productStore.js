import { create } from 'zustand';
import { getAllProducts, createProduct, deleteProduct as apiDeleteProduct } from '../services/productService';

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  // Fetch products
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const productsData = await getAllProducts();
      set({ products: productsData, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Add product
  addProduct: async (product) => {
    set({ loading: true });
    try {
      const newProduct = await createProduct(product);
      set({ 
        products: [...get().products, newProduct],
        loading: false,
        error: null 
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await apiDeleteProduct(productId);
      const currentProducts = get().products;
      set({ 
        products: currentProducts.filter(p => p.id !== productId),
        loading: false,
        error: null 
      });
      return true;
    } catch (error) {
      set({ error: error.message, loading: false });
      return false;
    }
  },
}));
