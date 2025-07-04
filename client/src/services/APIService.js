import axios from  "axios";

const apiUrl = import.meta.env.VITE_API_URL

export async function getFunction(){
    const response = await axios.get(`${apiUrl}/api`);
    return response.data;
}