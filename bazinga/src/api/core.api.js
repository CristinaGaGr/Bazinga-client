import { axiosInstance } from './api.constants';


export const getUser = () => {
	return axiosInstance.get('/me');
};