import { axiosInstance } from './api.constants';


export const getUser = () => {

	return new Promise((resolve => setTimeout(() => {
		resolve('cris')
	}, 200)))

	// return axiosInstance.get('/me');
};

export const getSummary = () => {
	return axiosInstance.get('/history');
};