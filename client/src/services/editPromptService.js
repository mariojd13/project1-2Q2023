import axios from "axios"

const URL = 'http://localhost:3001/';


export const createSimpleEdit = async (data) => {
    //console.log("data:"+data)
    try {
        const result = await axios.post(`${URL}api/editPrompt`, data, { headers: { 'Content-Type': 'application/json' } });
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



export const getPromptEdits = async () => {
    try {
        const result = await axios.get(`${URL}api/editPrompt`, { headers: { 'Content-Type': 'application/json' } });
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


export const updateEditPrompts = async (promptEdit) => {
    try {
      const response = await axios.patch(`${URL}api/editPrompt/${promptEdit._id}`, promptEdit);
  
      if (response.status === 200) {
        return { error: false, promptEdit: response.data, msg: 'Elemento guardado' };
      }
  
      return { error: true, promptEdite: null, msg: 'Error interno del servidor' };
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.msg) {
        return { error: true, promptEdit: null, msg: error.response.data.msg };
      }
      console.log(error.response);
      return { error: true, promptEdit: null, msg: 'Error interno del servidor' };
    }
  };
  

  export const deleteEditPrompts = async (userId) => {
    try {
      const response = await axios.delete(`${URL}api/editPrompt/${userId}`, { headers: { 'Content-Type': 'application/json' } });
      if (response.status === 204) {
        return { error: false, msg: `Usuario ${response.data.name} ${response.data.last_name} eliminado correctamente` };
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


  export const createEditPrompt = async (data) => {
    //console.log("data:"+data)
    try {
        const result = await axios.post(`${URL}api/simpleEditPrompt`, data, { headers: { 'Content-Type': 'application/json' } });
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