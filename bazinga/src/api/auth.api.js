import { axiosInstance } from './api';

export const signin = (username, password) => {
	return axiosInstance.post('/auth/signin', {username, password});
};


export const signup = (username, email, password, repeatPassword) => {
	return axiosInstance.post('/auth/signup', {username, email, password, repeatPassword});

};