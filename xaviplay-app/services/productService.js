// Servicio para productos (recompensas)
import { api } from "../utils/api";

export async function getAllProducts() {
  try {
    const res = await api.get('products/get-all');
    return res.data.products || [];
  } catch (err) {
    throw new Error('Error al cargar productos');
  }
}

export async function createProduct(product) {
  try {
    const res = await api.post('products/create', product);
    return res.data; // Retorna el producto creado
  } catch (error) {
    throw new Error('Error al crear producto');
  }
}

export async function deleteProduct(id) {
  try {
    await api.delete(`products/delete/${id}`);
    return true;
  } catch (error) {
    throw new Error('Error al eliminar producto');
  }
}
