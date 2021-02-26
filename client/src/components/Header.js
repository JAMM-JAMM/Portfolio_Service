import axios from "axios";

export default async function makeRequestWithJWT() {
    const url = "http://localhost:5000";
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
    };
    const response = await axios.get(url+'/protected', options);
    const result = JSON.stringify(response);
    return result;
}