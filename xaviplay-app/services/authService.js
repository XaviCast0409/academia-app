import axios from 'axios';

export async function loginService({ email, password }) {
  try {
    const response = await axios.post('https://academia-nho8.onrender.com/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al iniciar sesión';
    throw new Error(message);
  }
}
