
import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173/api', 
    withCredentials: true
});

http.interceptors.response.use(
    (res) => res.data,
    (err) => {
        const { status, data } = err?.response || {};
        
        if (status === 400) {
            console.error('API Error:', data || err.message);
        }

        return Promise.reject({
            message: data?.message || 'Bad Request',
            status: status
        });
    }
);

export const signup = (userData) =>
    http.post('/auth/signup', userData);

export const login = (email, password) =>
    http.post('/auth/login', { email, password });

export const logout = () => 
    http.delete('/auth/logout');

export const verify = () => 
    http.get('/auth/verify');

export const getSuggestions = () => 
    http.get('/suggestions');

export const likedUsers = (userId) => 
    http.post(`/likes/${ userId }`);

export const passedUsers = (userId) => 
    http.post(`/pass/${ userId }`);

//
//   Profile:
//     getProfile()            → GET /profile
//     updateProfile(data)     → PATCH /profile
//
//   Matches:
//     getMatches()            → GET /matches
//
//   Messages:
//     getMessages(matchId)    → GET /messages/:matchId
//     sendMessage(matchId, content) → POST /messages/:matchId
