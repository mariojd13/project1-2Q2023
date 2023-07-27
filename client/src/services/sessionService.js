import axios from "axios";

const URL = 'http://localhost:3001/';

// Función para obtener el token del localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Función para configurar el token en los headers de la solicitud
const setAuthorizationHeader = () => {
  const token = getToken();
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Llamar a la función para configurar el token en los headers iniciales
setAuthorizationHeader();

// Interceptor para actualizar el token antes de cada solicitud
axios.interceptors.request.use(
  (config) => {
    setAuthorizationHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getSession = async () => {
  try {
    // Aquí ya no es necesario obtener el token, ya que está configurado en los headers por defecto
    const result = await axios.get(`${URL}/session`);
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
};

export const saveSession = async (data) => {
  try {
    const result = await axios.post(`${URL}api/session`, data, { headers: { 'Content-Type': 'application/json' } });
    if (result.status === 201) {
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('expiration', result.data.expire);
      setAuthorizationHeader(); // Configurar el token en los headers después de obtenerlo

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
};
