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