import { axiosInstance } from './api';


export const getUser = () => {
	return axiosInstance.get('/me');
};

export const getSummary = () => {
	return axiosInstance.get('/history');
};