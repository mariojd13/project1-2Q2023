import axios from "axios"

const URL = 'http://localhost:3001/';

export const getStatus = async () => {
    try {
        const result = await axios.get(`${URL}api/status`, { headers: { 'Content-Type': 'application/json' } });
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

export const updateStatus = async (status) => {
   
    try {
        const result = await axios.patch(`${URL}status?id=${status._id}`, status, { headers: { 'Content-Type': 'application/json' } });
        if (result.status === 200) {
            return { error: false, categstatusory: result.status, msg: 'Elemento guardado' };
        }
        return { error: true, status: null, msg: 'Error interno del servidor' };
    } catch (error) {
        if (error && error.response && error.response.status && error.response.status.msg) {
            return { error: true, status: null, msg: error.response.status.msg };
        }
        console.log(error.response)
        return { error: true, status: null, msg: 'Error interno del servidor' };
    }
}






