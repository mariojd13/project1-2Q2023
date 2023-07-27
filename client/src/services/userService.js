import axios from "axios"

const URL = 'http://localhost:3001/';


export const createUser = async (data) => {
    //console.log("data:"+data)
    try {
        const result = await axios.post(`${URL}api/user`, data, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 201) {
            return { error: false, data: result.data, msg: 'Elemento creado' };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        
        console.log("error:")
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}



export const getUsers = async () => {
    try {
        const result = await axios.get(`${URL}api/user`, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            //console.log(result);
            return { error: false, data: result.data, msg: result.data.msg };
        }
        return { error: true, data: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.data && error.response.data.msg) {
            return { error: true, data: null, msg: error.response.data.msg };
        }
        console.log(error.response)
        return { error: true, data: null, msg: 'Error interno del servidor' };
    }
}

//SIN EL CHECK BOX

export const updateUsers = async (user) => {
    try {
      const updatedUser = {
        ...user,
        role: {
          _id: user.role_id,
          name: user.role_name
        }
      };
  
      const result = await axios.patch(`${URL}api/user?id=${user._id}`, updatedUser);
  
      if (result.status === 200) {
        return { error: false, user: result.data, msg: 'Elemento guardado' };
      }
  
      return { error: true, user: null, msg: 'Error interno del servidor' };
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.msg) {
        return { error: true, user: null, msg: error.response.data.msg };
      }
      console.log(error.response);
      return { error: true, user: null, msg: 'Error interno del servidor' };
    }
  };


  export const deleteUsers = async (userId) => {
    try {
      const response = await axios.delete(`${URL}api/user/${userId}`, { headers: { 'Content-Type': 'application/json' } });
      if (response.status === 204) {
        return { error: false, msg: `Usuario ${response.data.first_name} ${response.data.last_name} eliminado correctamente` };
      }
      return { error: true, msg: 'Error interno del servidor1' };
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.msg) {
        return { error: true, msg: error.response.data.msg };
      }
      console.log(error.response);
      return { error: true, msg: 'Error interno del servidor2' };
    }
  };
  

  export const loginUser = async (email, password) => {
    try {
      const result = await axios.post(`${URL}api/session`, { email, password });
      if (result.status === 201) {
        return { error: false, data: result.data.token };
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
  
  