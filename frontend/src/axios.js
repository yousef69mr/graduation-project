import axios from "axios";




export const backendBaseURL = "https://tourisco.onrender.com";
// export const backendBaseURL = "http://127.0.0.1:8000";
export const backendAPI = backendBaseURL.concat("/api/");


export const authTokens = JSON.parse(localStorage.getItem('authTokens'))
export const token = authTokens ? authTokens['access'] : null;
// alert(token)


const apiToken = axios.create({
    baseURL: backendAPI,
});

apiToken.defaults.headers.post['Access-Control-Allow-Origin'] = "*"
apiToken.defaults.headers.post['Access-Control-Allow-Credentials'] = "true"
apiToken.defaults.headers.post['Access-Control-Allow-Headers'] = "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
apiToken.defaults.headers.post['Access-Control-Allow-Methods'] = "GET,POST,PUT,DELETE,OPTIONS"
// apiToken.defaults.headers.post['Content-Type'] = 'multipart/form-data,application/json'
if (token) {
    apiToken.defaults.headers.post['Authorization'] = `Bearer ` + token;
    apiToken.defaults.headers.get['Authorization'] = `Bearer ` + token;
    apiToken.defaults.headers.put['Authorization'] = `Bearer ` + token;
    apiToken.defaults.headers.patch['Authorization'] = `Bearer ` + token;
    apiToken.defaults.headers.delete['Authorization'] = `Bearer` + token;
}

const api = axios.create({
    baseURL: backendAPI,
});

const baseURLApi = axios.create({
    baseURL: backendBaseURL,
});

const api_root = { api, apiToken, baseURLApi };
export default api_root

