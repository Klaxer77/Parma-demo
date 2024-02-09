import axios from 'axios';

export const $profile = axios.create({
  baseURL: 'http://localhost:8000/api/v1/user/',
  headers: {
    Authorization: `JWT ${localStorage.getItem('access')}`
  }
});

export const $login = axios.create({
  baseURL: 'http://localhost:8000/auth/jwt/create/',
  withCredentials: true,
  headers: {
    Authorization: `JWT ${localStorage.getItem('access')}`
  }
});

 export const config = {
  headers: {
    Authorization: `JWT ${localStorage.getItem('access')}`
  }
};
