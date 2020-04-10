import { axiosInstance } from './api';

export const signin = (username, password) => {
	return axiosInstance.post('/signin', {username, password});
};


export const signup = (username, email, password, repeatPassword) => {
	return axiosInstance.post('/signup', {username, email, password, repeatPassword});

};