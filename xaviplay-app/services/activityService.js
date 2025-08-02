import axios from 'axios';

const BASE_URL = 'https://academia-nho8.onrender.com';

export async function getActivitiesByProfessor(professorId, page = 1, pageSize = 10, section = null) {
  try {
    let url = `${BASE_URL}/activities/professor/${professorId}?page=${page}&pageSize=${pageSize}`;
    if (section) {
      url += `&section=${section}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al obtener actividades';
    throw new Error(message);
  }
}

export async function getAvailableActivitiesForStudent(studentId, page = 1, limit = 10, section = null) {
  try {
    let url = `${BASE_URL}/activities/available/${studentId}?page=${page}&limit=${limit}`;
    if (section) {
      url += `&section=${section}`;
    }
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al obtener actividades disponibles';
    throw new Error(message);
  }
}

export async function getActivityById(activityId) {
  try {
    const response = await axios.get(`${BASE_URL}/activities/${activityId}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al obtener la actividad';
    throw new Error(message);
  }
}

export async function getAllActivities() {
  try {
    const response = await axios.get(`${BASE_URL}/activities`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Error al obtener todas las actividades';
    throw new Error(message);
  }
} 