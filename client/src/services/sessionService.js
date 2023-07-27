import axios from "axios";

const URL = 'http://localhost:3001/';

// Configurar el token en el encabezado de autorización por defecto
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// Crear un interceptor para actualizar el token en el encabezado de autorización cada vez que se actualice
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getSession = async () => {
    const token = localStorage.getItem('token');
    console.log("Token stored in localStorage:", token);
    const expiration = localStorage.getItem('expiration');
    const dateObject = new Date(expiration);
    const now = new Date();

  if (!token || dateObject.getTime() < now.getTime()) {
    window.location.href = "/";
  } else {
    try {
      // Verificar que el token sea una cadena válida
      if (typeof token !== 'string') {
        throw new Error('Token is not a valid string');
      }

      const result = await axios.get(`${URL}/session`, {
        headers: {
          //'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Agregar el token en el encabezado de autorización
        }
      });

      if (result.status === 200) {
        return { error: false, data: result.data, msg: result.data.msg };
      }

      return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.msg) {
        return { error: true, data: null, msg: error.response.data.msg };
      }
      console.log(error.response);
      return { error: true, data: null, msg: 'Error interno del servidor' };
    }
  }
}

export const saveSession = async (data) => {
  try {
    const result = await axios.post(`${URL}api/session`, data, { headers: { 'Content-Type': 'application/json' } });
    if (result.status === 201) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('expiration', result.data.expire);

      return { error: false, data: result.data, msg: 'Elemento creado' };
    }
    return { error: true, data: null, msg: 'Error interno del servidor' };
  } catch (error) {
    if (error && error.response && error.response.data && error.response.data.msg) {
      return { error: true, data: null, msg: error.response.data.msg };
    }
    console.log(error.response);
    return { error: true, data: null, msg: 'Error interno del servidor' };
  }
}
