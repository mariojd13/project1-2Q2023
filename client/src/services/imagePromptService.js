import axios from "axios"

const URL = 'http://localhost:3001/';


export const createSimpleImages = async (data) => {
    //console.log("data:"+data)
    try {
        const result = await axios.post(`${URL}api/imagePrompt`, data, { headers: { 'Content-Type': 'application/json' } });
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



export const getPromptImages = async () => {
    try {
        const result = await axios.get(`${URL}api/imagePrompt`, { headers: { 'Content-Type': 'application/json' } });
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

// export const updateImagePrompts = async (promptImage) => {
//     try {
//       const updatedImagePrompt = {
//         ...promptImage,
        
//       };
  
//       const result = await axios.patch(`${URL}api/imagePrompt?id=${promptImage._id}`, updatedImagePrompt);
  
//       if (result.status === 200) {
//         return { error: false, promptImage: result.data, msg: 'Elemento guardado' };
//       }
  
//       return { error: true, promptImage: null, msg: 'Error interno del servidor' };
//     } catch (error) {
//       if (error && error.response && error.response.data && error.response.data.msg) {
//         return { error: true, promptImage: null, msg: error.response.data.msg };
//       }
//       console.log(error.response);
//       return { error: true, promptImage: null, msg: 'Error interno del servidor' };
//     }
//   };

export const updateImagePrompts = async (promptImage) => {
    try {
      const response = await axios.patch(`${URL}api/imagePrompt/${promptImage._id}`, promptImage);
  
      if (response.status === 200) {
        return { error: false, promptImage: response.data, msg: 'Elemento guardado' };
      }
  
      return { error: true, promptImage: null, msg: 'Error interno del servidor' };
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.msg) {
        return { error: true, promptImage: null, msg: error.response.data.msg };
      }
      console.log(error.response);
      return { error: true, promptImage: null, msg: 'Error interno del servidor' };
    }
  };
  

  export const deleteImagePrompts = async (userId) => {
    try {
      const response = await axios.delete(`${URL}api/imagePrompt/${userId}`, { headers: { 'Content-Type': 'application/json' } });
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


  export const createImagePrompt = async (data) => {
    //console.log("data:"+data)
    try {
        const result = await axios.post(`${URL}api/simpleImagePrompt`, data, { headers: { 'Content-Type': 'application/json' } });
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